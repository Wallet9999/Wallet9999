import type { AxiosInstance } from 'axios'

import { Auth } from '@/shared/api/Auth'
import { User } from '@/shared/api/User'
import { Currency } from '@/shared/api/Currency'
import { Deposit } from '@/shared/api/Deposit'
import { Wallet } from '@/shared/api/Wallet'

export class Client {
    auth: Auth
    user: User
    currency: Currency
    deposit: Deposit
    wallet: Wallet

    constructor(api: AxiosInstance) {
        this.auth = new Auth(api)
        this.user = new User(api)
        this.currency = new Currency(api)
        this.deposit = new Deposit(api)
        this.wallet = new Wallet(api)
    }
}
