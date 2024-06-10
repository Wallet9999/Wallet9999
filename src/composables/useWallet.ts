import type {
    IRequestWalletHistory,
    IResponseWalletHistory,
    IRequestWalletWithdraw,
    IResponseWalletBalances,
    IRequestWalletWithdrawCrypto,
    IRequestWalletConvert
} from '@/shared/api/types/Wallet.interface'

import { useNuxtApp } from '#imports'

export const useWallet = () => {
    const { $client } = useNuxtApp()

    const getWalletHistory = async (data: IRequestWalletHistory): Promise<IResponseWalletHistory> => {
        return await $client.wallet.getWalletHistory(data)
    }

    const getBalances = async (): Promise<IResponseWalletBalances> => {
        return await $client.wallet.getBalances()
    }

    const convertCryptoToFiat = async (data: IRequestWalletConvert): Promise<void> => {
        return await $client.wallet.convertCryptoToFiat(data)
    }

    const withdrawFiat = async (data: IRequestWalletWithdraw): Promise<void> => {
        return await $client.wallet.withdrawFiat(data)
    }

    const withdrawCrypto = async (data: IRequestWalletWithdrawCrypto): Promise<void> => {
        return await $client.wallet.withdrawCrypto(data)
    }

    return {
        getBalances,
        getWalletHistory,
        convertCryptoToFiat,
        withdrawFiat,
        withdrawCrypto
    }
}
