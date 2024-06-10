import type {
    IResponseCurrency,
    IResponseCurrencyRatesItem
} from '@/shared/api/types/Currency.interface'

import {
    acceptHMRUpdate,
    defineStore
} from 'pinia'

import { useNuxtApp } from '#imports'

export const useCurrencyStore = defineStore('currency', () => {
    const { $client } = useNuxtApp()
    const currencies = ref<IResponseCurrency[]>([])
    const rates = ref<IResponseCurrencyRatesItem | null>(null)
    const initialized = ref(false)

    const getCurrencies = async () => {
        currencies.value = await $client.currency.getAllCurrencies()
    }

    const getRates = async () => {
        const response = await $client.currency.getCurrencyRates()

        rates.value = response.rates
    }

    const initialize = async () => {
        await Promise.all([ getCurrencies(), getRates() ])

        initialized.value = true
    }

    const getCurrencySymbol = (currency: string) => {
        if (!currencies.value.length) return undefined

        return currencies.value.find(el => el.short_code === currency.toUpperCase())?.symbol
    }

    const getCurrencyRate = (currency: string) => {
        const formattedCurrency = currency.toUpperCase()

        if (rates.value === null || !rates.value[formattedCurrency]) return undefined

        return rates.value[formattedCurrency]
    }

    const convertCurrency = (value: number, currency: string, baseCurrency?: string) => {
        const formattedCurrency = currency.toUpperCase()
        const formattedBaseCurrency = baseCurrency?.toUpperCase()

        if (rates.value === null || !rates.value[formattedCurrency]) return undefined

        if (formattedCurrency === 'USD' && formattedBaseCurrency !== undefined) {
            return value * (rates.value[formattedCurrency] / rates.value[formattedBaseCurrency])
        }

        return value * rates.value[formattedCurrency]
    }

    return {
        currencies,
        rates,
        initialized,
        getCurrencies,
        getRates,
        initialize,
        getCurrencySymbol,
        getCurrencyRate,
        convertCurrency
    }
})

// Hot Module Reloading
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useCurrencyStore, import.meta.hot))
}
