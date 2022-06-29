import { ethers } from 'ethers';
import log from 'loglevel';
import { ObservableStore } from '@metamask/obs-store';
import bridgeAbi from '../../../ui/pages/birdge/abi.json';
import { NETWORK_EVENTS } from './network';
import { hexlify } from "@ethersproject/bytes";
import { toUtf8Bytes } from "@ethersproject/strings";
import fetchWithCache from '../../../ui/helpers/utils/fetch-with-cache';
import getFetchWithTimeout from '../../../shared/modules/fetch-with-timeout';


const fetchWithTimeout = getFetchWithTimeout(100 * 30);

const initialState = {
    bridgeState: {
        bridgeApi: 'http://3.120.193.165:8080',
        signaturePhrase: '',
        apiToken: '',
        internalAddress: '',
        preloadedChainOptions: [],
        formData: {
            actionType: 'deposit',
            wallet: '',
            amount: '0',
            chain: '',
            contract: undefined,
            symbol: '',
        },
        token: {
            address: "",
            decimals: '',
            image: null,
            isERC721: false,
            symbol: "",
        }
    },
};

export default class BridgeController {
    constructor({
        networkController,
        provider,
        getProviderConfig,
        getCurrentChainId,
    }) {
        this.store = new ObservableStore({
            bridgeState: { ...initialState.bridgeState },
        });
        this._getCurrentChainId = getCurrentChainId;
        this.getProviderConfig = getProviderConfig;
        this.provider = provider;
        this.ethersProvider = new ethers.providers.Web3Provider(provider);
        this._currentNetwork = networkController.store.getState().network;
        networkController.on(NETWORK_EVENTS.NETWORK_DID_CHANGE, (network) => {
            if (network !== 'loading' && network !== this._currentNetwork) {
                this._currentNetwork = network;
                this.ethersProvider = new ethers.providers.Web3Provider(provider);
            }
        });
        this.signature = '';
    }

    async getSignature(address) {
        const { bridgeState } = this.store.getState();
        const { bridgeApi } = bridgeState;
        const response = await fetchWithCache(
            `${bridgeApi}/auth/getSignaturePhrase`,
            { method: 'GET' },
            { cacheRefreshTime: 600000 },
        );
        this.store.updateState({ bridgeState: { ...bridgeState, signaturePhrase: response.data.signaturePhrase } });
        let signaturePhrase = response.data.signaturePhrase;
        signaturePhrase = hexlify(toUtf8Bytes(signaturePhrase));
        const params = {
            data: signaturePhrase,
            from: address,
            origin: bridgeApi,
        }
        return params;
    }

    async connectWallet(address, signature) {
        const { bridgeState } = this.store.getState();
        const { bridgeApi } = bridgeState;
        const response = await fetchWithTimeout(`${bridgeApi}/auth/connectWallet`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                address: address,
                signature: signature,
            }),
        });
        const responseJson = await response.json();
        const apiToken = responseJson.data.token;
        const internalAddress = responseJson.data.user.internalAddress;
        this.store.updateState({
            bridgeState: {
                ...bridgeState,
                apiToken,
                internalAddress
            }
        });
    }

    getInternalAddress() {
        const { bridgeState } = this.store.getState();
        const { internalAddress } = bridgeState;
        return internalAddress;
    }

    async getSourceChain() {
        const { bridgeState } = this.store.getState();
        const { bridgeApi, apiToken } = bridgeState;
        const response = await fetchWithCache(
            `${bridgeApi}/public/tokens`,
            {
                method: 'GET',
                headers: {
                    'Authorization': apiToken
                },
            },
            { cacheRefreshTime: 600000 },
        );
        const result = response.data.tokenConfig;
        let preloadedChainOptions = {};
        preloadedChainOptions = Object.values(result).reduce(
            (acc, tokenConfigs) => [
                ...acc,
                ...Object.values(tokenConfigs).map((item) => ({
                    label: `${item.chainConfig.chainName} (${item.tokenCode})`,
                    value: `${item.chainId}|${item.tokenCode}`,
                    meta: item,
                })),
            ], []
        );
        preloadedChainOptions.sort((a, b) =>
            a.label.localeCompare(b.label),
        );
        this.store.updateState({
            bridgeState: {
                ...bridgeState,
                preloadedChainOptions: [...preloadedChainOptions]
            }
        });
    }

    getPreloadChainOption() {
        const { bridgeState } = this.store.getState();
        const { preloadedChainOptions } = bridgeState;
        return preloadedChainOptions
    }

    async getChainConfig() {
        const { bridgeState } = this.store.getState();
        const { preloadedChainOptions, formData, token } = bridgeState;
        const chainId = parseInt(this._getCurrentChainId(), 16);
        const chainConfig = preloadedChainOptions.find(
            (item) => item.value === `${chainId}|${formData.symbol}`,
        );
        if (!chainConfig) {
            return;
        }
        try {
            const contract = new ethers.Contract(
                chainConfig.meta.tokenContractAddress,
                bridgeAbi,
                this.ethersProvider,
            );
            const symbol = await contract.symbol();
            const decimals = await contract.decimals();
            this.store.updateState({
                bridgeState: {
                    ...bridgeState,
                    formData: {
                        ...formData,
                        contract: {
                            contract,
                            meta: { decimals, symbol },
                        }
                    },
                    token: {
                        ...token,
                        address: chainConfig.meta.tokenContractAddress,
                        decimals: chainConfig.meta.decimals,
                        symbol: chainConfig.meta.tokenCode,
                    }
                }
            });
        } catch (e) {
            //
            log.info(e, 'getChainConfig catch')
        }
    }

    configFormData(data) {
        const { bridgeState } = this.store.getState();
        const { formData } = bridgeState;
        this.store.updateState({
            bridgeState: {
                ...bridgeState,
                formData: {
                    ...formData,
                    ...data,
                }
            }
        });
        return formData;
    }

    async getTargetChain() {
        const { bridgeState } = this.store.getState();
        const { bridgeApi, apiToken } = bridgeState;
        const response = await fetchWithCache(
            `${bridgeApi}/public/chains`,
            {
                method: 'GET',
                headers: {
                    'Authorization': apiToken
                },
            },
            { cacheRefreshTime: 600000 },
        );
        const result = response.data.chainConfig;
        let preloadedTargetChainOptions = Object.values(result).map((item) => ({
            chainId: item.chainId,
            value: item.chainName,
            meta: item,
        }));
        return [...preloadedTargetChainOptions];
    }

    async resetDepositData() {
        this.store.updateState({
            bridgeState: {
                formData: {
                    actionType: 'deposit',
                    wallet: '',
                    amount: '0',
                    chain: '',
                    contract: undefined,
                    symbol: '',
                },
                token: {
                    address: "",
                    decimals: '',
                    image: null,
                    isERC721: false,
                    symbol: "",
                }
            }
        });
    }

    getToken() {
        const { bridgeState } = this.store.getState();
        const { token } = bridgeState;
        return token;
    }

}
