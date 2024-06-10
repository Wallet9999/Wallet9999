import type { IPagination } from '@/shared/api/types/Base.interface'

type TWalletHistoryOperationType =
    | 'deposit_fiat'
    | 'deposit_crypto'
    | 'withdraw_fiat'
    | 'withdraw_crypto'
    | 'convert'

type TWalletHistoryOperationStatus =
    | 'pending'
    | 'processing'
    | 'completed'
    | 'expired'
    | 'failed'
    | 'canceled'

type TWalletBalanceType = 'crypto' | 'fiat'

interface IWalletHistoryToken {
    id: string
    amount: string
    name: string
    image: string
}

interface IWalletHistoryBlockchainNetwork {
    id: string
    name: string
    is_testnet: boolean
}

interface IWalletHistoryBlockchain {
    id: string
    name: string
    short_name: string
    image: string
    network: IWalletHistoryBlockchainNetwork
}

interface IWalletHistoryTransaction {
    id: string
    receiver_address: string
    sender_address: string
    explorer_link: string | null
}

interface IWalletHistoryFiat {
    currency: string
    amount: string
    iban: string
    person: string
}

interface IWalletHistoryOperation {
    id: string
    operation_type: TWalletHistoryOperationType
    status: TWalletHistoryOperationStatus
    token: IWalletHistoryToken | null
    blockchain: IWalletHistoryBlockchain | null
    transaction: IWalletHistoryTransaction | null
    fiat: IWalletHistoryFiat | null
    explorer_link: string | null
    usd_amount: number
    updated_at: string
    created_at: string
}

interface IRequestWalletHistory extends IPagination {}

interface IResponseWalletHistory {
    operations: IWalletHistoryOperation[]
    total: number
}

interface IRequestWalletWithdraw {
    fiat_currency: string
    person_name: string
    iban: string
    amount: number
}

interface IWalletBalance {
    id: string
    type: TWalletBalanceType
    amount: string
    image: string
    name: string
    symbol: string
    usd_rate: number
}

interface IResponseWalletBalances {
    balances: IWalletBalance[]
}

interface IRequestWalletWithdrawCrypto {
    currency_symbol: string
    amount: number
    address: string
}

interface IRequestWalletConvert {
    crypto_symbol: string
    fiat_symbol: string
    amount: number
}

export type {
    TWalletHistoryOperationType,
    TWalletHistoryOperationStatus,
    IWalletHistoryToken,
    IWalletHistoryBlockchainNetwork,
    IWalletHistoryBlockchain,
    IWalletHistoryTransaction,
    IWalletHistoryFiat,
    IWalletHistoryOperation,
    IRequestWalletHistory,
    IResponseWalletHistory,
    IRequestWalletWithdraw,
    IWalletBalance,
    IResponseWalletBalances,
    IRequestWalletWithdrawCrypto,
    IRequestWalletConvert,
}
