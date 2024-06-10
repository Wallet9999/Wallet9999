import type {
    AxiosRequestConfig,
    AxiosInstance,
} from 'axios'
import type {
    IRequestAuthSendEmail,
    IRequestAuthConfirmEmail,
    IRequestAuthLogin,
    IResponseAuthTokens,
    ILink,
} from '@/shared/api/types/Auth.interface'

import { Base } from '@/shared/api/Base'
  
export class Auth extends Base {
    constructor(api: AxiosInstance) {
        super(api)
    }

    async sendEmailLink(data: IRequestAuthSendEmail): Promise<ILink> {
        const config: AxiosRequestConfig = {
            method: 'POST',
            url: '/public/auth.email.send_link',
            data,
        }

        return this.makeRequest<ILink>(config)
    }
    async confirmEmail(data: IRequestAuthConfirmEmail): Promise<IResponseAuthTokens> {
        const config: AxiosRequestConfig = {
            method: 'POST',
            url: '/public/auth.email.confirm',
            data,
        }

        return this.makeRequest<IResponseAuthTokens>(config)
    }

    async register(data: IRequestAuthLogin): Promise<void> {
        const config: AxiosRequestConfig = {
            method: 'POST',
            url: '/private/auth.email.register',
            data,
        }

        return this.makeRequest<void>(config)
    }

    async login(data: IRequestAuthLogin): Promise<IResponseAuthTokens> {
        const config: AxiosRequestConfig = {
            method: 'POST',
            url: '/public/auth.login',
            data,
        }

        return this.makeRequest<IResponseAuthTokens>(config)
    }

    async logout(): Promise<void> {
        const config: AxiosRequestConfig = {
            method: 'POST',
            url: '/private/auth.logout',
        }

        return this.makeRequest<void>(config)
    }
}
