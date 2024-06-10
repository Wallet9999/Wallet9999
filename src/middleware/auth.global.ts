import { defineNuxtRouteMiddleware } from '#app'

import { useAuthStore } from '@/stores/auth'

import { ALLOWED_ROUTES } from '@/data/constants'

export default defineNuxtRouteMiddleware((to, from) => {
    if (process.server) return undefined

    const auth = useAuthStore()
    auth.initialize()

    if (ALLOWED_ROUTES.some(el => from.path.includes(el) || to.path.includes(el))) {
        return undefined
    }

    const token = auth.getAccessToken()

    if (!token && !ALLOWED_ROUTES.includes(from.path)) {
        return navigateTo('/login')
    }
})
