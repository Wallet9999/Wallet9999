interface IResponseBlockchainNetwork {
    id: string
    is_testnet: boolean
    name: string
}

interface IResponseBlockchain {
    name: string
    native_currency: string
    native_currency_decimals: number
    network_symbol: string
    networks: IResponseBlockchainNetwork[]
    image_url: string
    rpc_link: string
    explorer_link: string
}

interface IResponseBlockchains {
    blockchains: IResponseBlockchain[]
}

interface IResponseToken {
    id: string
    blockchain_id: string
    name: string
    symbol: string
    decimals: number
    is_token: boolean
    is_stable: boolean
    contract_address: string
}

interface IResponseTokens {
    tokens: IResponseToken[]
}

interface IRequestTokens {
    network_id: string
}

interface IResponseAddress {
    id: string
    address: string
    network: string
    network_id: string
    blockchain_name: string
    expires_at: string
}

interface IRequestAddress extends IRequestTokens {}

interface IRequestTokenBlockchains {
    token: string
}

interface IRequestCreateFiatDeposit {
    amount: number
    currency: string
    card_digits: string
}

interface IResponseFiat {
    [key: string]: string
}

export type {
    IResponseBlockchainNetwork,
    IResponseBlockchain,
    IResponseBlockchains,
    IResponseToken,
    IResponseTokens,
    IRequestTokens,
    IResponseAddress,
    IRequestAddress,
    IRequestTokenBlockchains,
    IResponseFiat,
    IRequestCreateFiatDeposit
}
