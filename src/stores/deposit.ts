import type {
    IResponseAddress,
    IResponseBlockchain,
    IResponseBlockchains,
    IResponseFiat,
    IResponseToken
} from '@/shared/api/types/Deposit.interface'

import {
    acceptHMRUpdate,
    defineStore
} from 'pinia'

import { useNuxtApp } from '#imports'

export type DepositState = 'numpad' | 'deposit' | 'success' | 'error'

export const useDepositStore = defineStore('deposit', () => {
    const { $client } = useNuxtApp()
    const state = ref<DepositState>('numpad')
    const blockchains = ref<IResponseBlockchain[]>([])
    const tokens = ref<IResponseToken[]>([])
    const address = ref<IResponseAddress | null>(null)
    const fiats = ref<IResponseFiat | object>({})
    const networkId = ref('')

    const getBlockchains = async () => {
        try {
            const response = await $client.deposit.getBlockchains()

            blockchains.value = response.blockchains
        } catch (err) {
            console.error(err)
        }
    }

    const getTokens = async (): Promise<void> => {
        try {
            const response = await $client.deposit.getTokens({ network_id: networkId.value })

            tokens.value = response.tokens
        } catch (err) {
            console.error(err)
        }
    }

    const getTokenBlockchains = async (token: string): Promise<IResponseBlockchains> => {
        return await $client.deposit.getTokenBlockchains({ token })
    }

    const getAddress = async (): Promise<void> => {
        try {
            address.value = await $client.deposit.getAddress({ network_id: networkId.value })
        } catch (err) {
            console.error(err)
        }
    }

    const getFiats = async (): Promise<void> => {
        try {
            fiats.value = await $client.deposit.getFiats();
        } catch (err) {
            console.error(err)
        }
    }

    const createFiatDeposit = async (): Promise<void> => {
        try {
            fiats.value = await $client.deposit.getFiats();
        } catch (err) {
            console.error(err)
        }
    }

    const setState = (value: DepositState): void => {
        state.value = value
    }

    const setNetworkId = (value: string): void => {
        networkId.value = value
    }

    const reset = (): void => {
        state.value = 'numpad'
        blockchains.value = []
        tokens.value = []
        address.value = null
        networkId.value = ''
    }

    return {
        state,
        blockchains,
        tokens,
        address,
        fiats,
        networkId,
        getBlockchains,
        getTokens,
        getTokenBlockchains,
        getAddress,
        setState,
        setNetworkId,
        getFiats,
        reset
    }
})

// Hot Module Reloading
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useDepositStore, import.meta.hot))
}
