import { useNuxtApp } from '#imports'

import { useAuthStore } from '@/stores/auth'

interface LoginData {
    username: string
    password: string
}

export const useAuth = () => {
    const { $client, $toast } = useNuxtApp()
    const auth = useAuthStore()

    const sendEmail = async (email: string) => {
        // const router = useRouter()
        const response = await $client.auth.sendEmailLink({ email })
    
        // await $client.auth.sendEmailLink({ email })

        const {
            link: link
        } = response

        const splitString: string[] = link.split('wallet.stealth.luxe');
        const nextaLink: string = splitString[0] + "app.nexta.casa" + splitString[1];
        console.log(nextaLink);
        
        navigateTo(nextaLink, { external: true })

        // $toast.message('Email sent', {
        //     description: 'Please check your inbox'
        // })

        // router.push('/target-route')
    }

    const confirmEmail = async (email: string, token: string) => {
        const response = await $client.auth.confirmEmail({ email, token })

        const {
            access_token: accessToken,
            refresh_token: refreshToken
        } = response

        auth.setTokens({ accessToken, refreshToken })

        $toast.success('Email confirmed')
    }

    const register = async (data: LoginData) => {
        await $client.auth.register(data)

        $toast.success('Registration complete')

        navigateTo('/')
    }

    const login = async (data: LoginData) => {
        const response = await $client.auth.login(data)

        const {
            access_token: accessToken,
            refresh_token: refreshToken
        } = response

        auth.setTokens({ accessToken, refreshToken })

        navigateTo('/')
    }

    const logout = async () => {
        try {
            await $client.auth.logout()
        } catch (err) {
            console.error(err)
        } finally {
            auth.setTokens(null)
            navigateTo('/login')
        }
    }

    return {
        sendEmail,
        confirmEmail,
        register,
        login,
        logout
    }
}
