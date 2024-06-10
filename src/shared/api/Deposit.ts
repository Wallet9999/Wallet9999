import type {
    AxiosRequestConfig,
    AxiosInstance,
} from 'axios'
import type {
    IResponseBlockchains,
    IResponseTokens,
    IRequestTokens,
    IResponseAddress,
    IRequestAddress,
    IRequestTokenBlockchains,
    IResponseFiat,
    IRequestCreateFiatDeposit,
} from '@/shared/api/types/Deposit.interface'

import { Base } from '@/shared/api/Base'

export class Deposit extends Base {
    constructor(api: AxiosInstance) {
        super(api)
    }

    async getBlockchains(): Promise<IResponseBlockchains> {
        const config: AxiosRequestConfig = {
            method: 'POST',
            url: '/private/deposit.blockchains.get',
        }

        return this.makeRequest<IResponseBlockchains>(config)
    }

    async getTokens(data: IRequestTokens): Promise<IResponseTokens> {
        const config: AxiosRequestConfig = {
            method: 'POST',
            url: '/private/deposit.blockchains.tokens',
            data,
        }

        return this.makeRequest<IResponseTokens>(config)
    }

    async getAddress(data: IRequestAddress): Promise<IResponseAddress> {
        const config: AxiosRequestConfig = {
            method: 'POST',
            url: '/private/deposit.address.get',
            data,
        }

        return this.makeRequest<IResponseAddress>(config)
    }

    async getTokenBlockchains(data: IRequestTokenBlockchains): Promise<IResponseBlockchains> {
        const config: AxiosRequestConfig = {
            method: 'POST',
            url: '/private/deposit.token.blockchains',
            data,
        }

        return this.makeRequest<IResponseBlockchains>(config)
    }

    async getFiats(): Promise<IResponseFiat> {
        const config: AxiosRequestConfig = {
            method: 'POST',
            url: '/private/deposit.fiat.cards',
        }

        return this.makeRequest<IResponseFiat>(config)
    }

    async createFiatDeposit(data: IRequestCreateFiatDeposit): Promise<void> {
        const config: AxiosRequestConfig = {
            method: 'POST',
            url: '/private/deposit.fiat.create',
            data,
        }

        return this.makeRequest<void>(config)
    }
}
