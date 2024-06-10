import type {
    AxiosRequestConfig,
    AxiosInstance,
} from 'axios'
import type {
    IResponseUser,
    IRequestUserChange,
    IRequestUserChangePassword,
} from '@/shared/api/types/User.interface'

import { Base } from '@/shared/api/Base'

export class User extends Base {
    constructor(api: AxiosInstance) {
        super(api)
    }

    async getUser(): Promise<IResponseUser> {
        const config: AxiosRequestConfig = {
            method: 'POST',
            url: '/private/user.me',
        }

        return this.makeRequest<IResponseUser>(config)
    }

    async changeUser(data: IRequestUserChange): Promise<IResponseUser> {
        const config: AxiosRequestConfig = {
            method: 'POST',
            url: '/private/user.change',
            data
        }

        return this.makeRequest<IResponseUser>(config)
    }

    async changePassword(data: IRequestUserChangePassword): Promise<string> {
        const config: AxiosRequestConfig = {
            method: 'POST',
            url: '/private/user.password.change',
            data,
        }

        return this.makeRequest<string>(config)
    }
}
