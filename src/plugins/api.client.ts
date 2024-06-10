import type {
    AxiosError,
    AxiosInstance,
    AxiosResponse,
} from 'axios'
import type { IResponseWrapper } from '@/shared/api/types/Base.interface'

import { defineNuxtPlugin } from '#app'
import {
    useNuxtApp,
    useRuntimeConfig
} from '#imports'

import axios from 'axios'

import { Client } from '@/shared/api/Client'
import { APIErrors } from '@/shared/api/errors'
import { useAuthStore } from '@/stores/auth'

declare module '#app' {
    interface NuxtApp {
        $client: Client
    }
}

export default defineNuxtPlugin((app) => {
    const { public: { apiURL } } = useRuntimeConfig()
    const nuxtApp = useNuxtApp()
    const auth = useAuthStore()

    const api: AxiosInstance = axios.create({
        baseURL: apiURL,
        headers: {
            common: {
                'Content-Type': 'application/json'
            }
        }
    })
    const client = new Client(api)

    const notifyError = (description?: string): void => {
        nuxtApp.$toast.error(description || 'Something went wrong', { duration: 3000 })
    }

    api.interceptors.response.use((response: AxiosResponse<IResponseWrapper<any>, any>) => {
        if (response.data.error !== null) {
            const description = APIErrors.find(el => el.code === response.data.error.code)?.message

            notifyError(description)
        }

        return response
    })

    api.interceptors.response.use((response) => response, async (error: AxiosError) => {
        if (error.response?.status === 401) {
            notifyError('Unauthorized')

            auth.setTokens(null)
            navigateTo('/login', { redirectCode: 301 })

            return Promise.reject(error)
        }

        if (error.response?.data) {
            const data = error.response.data as IResponseWrapper<any>
            const description = APIErrors.find(el => el.code === data.error.code)?.message

            notifyError(description)

            return Promise.reject(error)
        }

        notifyError()

        return Promise.reject(error)
    })

    api.interceptors.request.use((request) => {
        const token = auth.getAccessToken()
        const headers = request.headers || {}

        if (!token) {
            return request
        }

        request.headers = Object.assign(headers, { Authorization: `Bearer ${token}` })

        return request
    })

    app.provide('client', client)
})
