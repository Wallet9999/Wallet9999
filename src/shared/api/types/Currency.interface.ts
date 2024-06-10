interface IResponseCurrencyRatesItem {
    [key: string]: number
}

interface IResponseCurrencyRates {
    base: 'USD'
    rates: IResponseCurrencyRatesItem
    date: string
}

interface IResponseCurrency {
    id: number
    short_code: string
    symbol: string
}

export type {
    IResponseCurrencyRatesItem,
    IResponseCurrencyRates,
    IResponseCurrency,
}
