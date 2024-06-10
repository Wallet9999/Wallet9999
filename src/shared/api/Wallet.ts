import type {
    AxiosRequestConfig,
    AxiosInstance,
} from 'axios'
import type {
    IRequestWalletHistory,
    IResponseWalletHistory,
    IRequestWalletWithdraw,
    IResponseWalletBalances,
    IRequestWalletWithdrawCrypto,
    IRequestWalletConvert,
} from '@/shared/api/types/Wallet.interface'

import { Base } from '@/shared/api/Base'

export class Wallet extends Base {
    constructor(api: AxiosInstance) {
        super(api)
    }

    async getWalletHistory(data: IRequestWalletHistory): Promise<IResponseWalletHistory> {
        const config: AxiosRequestConfig = {
            method: 'POST',
            url: '/private/wallet.history',
            data,
        }

        return this.makeRequest<IResponseWalletHistory>(config)
    }

    async withdrawFiat(data: IRequestWalletWithdraw): Promise<void> {
        const config: AxiosRequestConfig = {
            method: 'POST',
            url: '/private/wallet.withdraw.fiat',
            data,
        }

        return this.makeRequest<void>(config)
    }

    async getBalances(): Promise<IResponseWalletBalances> {
        const config: AxiosRequestConfig = {
            method: 'POST',
            url: '/private/wallet.balances',
        }

        return this.makeRequest<IResponseWalletBalances>(config)
    }

    async withdrawCrypto(data: IRequestWalletWithdrawCrypto): Promise<void> {
        const config: AxiosRequestConfig = {
            method: 'POST',
            url: '/private/wallet.withdraw.crypto',
            data,
        }

        return this.makeRequest<void>(config)
    }

    async convertCryptoToFiat(data: any): Promise<void> {
        const config: AxiosRequestConfig = {
            method: 'POST',
            url: '/private/wallet.convert.crypto_to_fiat',
            data,
        }

        return this.makeRequest<void>(config)
    }
}
