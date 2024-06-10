interface IResponseError {
    code: number
    message: string
}

interface IResponseWrapper<T> {
    data: T
    status: boolean
    msg: string
    error: IResponseError
}

interface IPagination {
    page: number
    limit: number
}

export type {
    IResponseError,
    IResponseWrapper,
    IPagination,
}
