import type {
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse
} from 'axios'
import type { IResponseWrapper } from '@/shared/api/types/Base.interface'

export class Base {
    protected api: AxiosInstance

    constructor(api: AxiosInstance) {
        this.api = api
    }

    protected async makeRequest<T>(config: AxiosRequestConfig): Promise<T> {
        try {
            const response: AxiosResponse<IResponseWrapper<T>> = await this.api.request(config)

            return response.data.data
        } catch (error: any) {
            return Promise.reject(error.response.data.error || error)
        }
    }
}
