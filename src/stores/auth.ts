import {
    acceptHMRUpdate,
    defineStore
} from 'pinia'

import { useLocalStorage } from '@/composables/useLocalStorage'

import jwtDecode from 'jwt-decode'

interface Tokens {
    refreshToken: string
    accessToken: string
}

interface AuthStore {
    tokens: Tokens | null
}

const storage = useLocalStorage()

const getAuthTokens = (): Tokens | null => {
    const tokens = storage.getItem('auth')

    try {
        return tokens ? JSON.parse(tokens) : null
    } catch (err) {
        return null
    }
}

export const useAuthStore = defineStore('auth', {
    state: (): AuthStore => ({
        tokens: null
    }),
    getters: {
        isAuthenticated (state): boolean {
            return state.tokens !== null
        },
        isExpired (state): boolean {
            if (!state.tokens) return true

            const now = Math.floor(new Date().getTime() / 1000)
            const decoded = jwtDecode(state.tokens.accessToken) as any

            return now > decoded.exp
        }
    },
    actions: {
        setTokens (tokens: Tokens | null): void {
            if (this.tokens === null && tokens === null) return undefined

            this.tokens = tokens

            if (this.tokens !== null) {
                storage.setItem('auth', JSON.stringify(this.tokens))

                return undefined
            }

            storage.removeItem('auth')
        },
        getAccessToken (): string | null {
            if (!this.tokens) return null

            return this.tokens.accessToken
        },
        getRefreshToken (): string | null {
            if (!this.tokens) return null

            return this.tokens.refreshToken
        },
        initialize (): void {
            this.tokens = getAuthTokens()
        }
    }
})

// Hot Module Reloading
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
