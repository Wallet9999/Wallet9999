import type {
    IResponseUser,
    IRequestUserChange
} from '@/shared/api/types/User.interface'
import type { IResponseWalletBalances } from '@/shared/api/types/Wallet.interface'

import {
    acceptHMRUpdate,
    defineStore
} from 'pinia'

import { useNuxtApp } from '#imports'

export const useUserStore = defineStore('user', () => {
    const { $client, $toast } = useNuxtApp()
    const data = ref<IResponseUser | null>(null)
    const balances = ref<IResponseWalletBalances | null>(null)

    const getUser = async (): Promise<void> => {
        data.value = await $client.user.getUser()
    }

    const changeUser = async (reqData: IRequestUserChange): Promise<void> => {
        if (!data.value) return undefined

        const response = await $client.user.changeUser(reqData)

        data.value = {
            ...response,
            usd_balance: data.value.usd_balance
        }

        $toast.success('Profile successfully edited')
    }

    const getBalances = async (): Promise<void> => {
        balances.value = await $client.wallet.getBalances()
    }

    return {
        data,
        balances,
        getUser,
        changeUser,
        getBalances
    }
})

// Hot Module Reloading
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
