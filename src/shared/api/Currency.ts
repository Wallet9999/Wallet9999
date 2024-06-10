import type {
    AxiosRequestConfig,
    AxiosInstance,
} from 'axios'
import type {
    IResponseCurrencyRates,
    IResponseCurrency,
} from '@/shared/api/types/Currency.interface'

import { Base } from '@/shared/api/Base'

export class Currency extends Base {
    constructor(api: AxiosInstance) {
        super(api)
    }

    async getAllCurrencies(): Promise<IResponseCurrency[]> {
        const config: AxiosRequestConfig = {
            method: 'POST',
            url: '/public/currency.list',
        }

        return this.makeRequest<IResponseCurrency[]>(config)
    }

    async getCurrencyRates(): Promise<IResponseCurrencyRates> {
        const config: AxiosRequestConfig = {
            method: 'POST',
            url: '/public/currency.rates',
        }

        return this.makeRequest<IResponseCurrencyRates>(config)
    }
}
