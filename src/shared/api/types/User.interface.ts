interface IResponseUser {
    id: string
    username: string
    email: string
    usd_balance: number
    phone: string | null
    country_code: string
    currency: string
}

interface IRequestUserChange {
    country: string
    currency: string
    phone_number: string
    username: string
}

interface IRequestUserChangePassword {
    password_old: string
    password_new: string
}

export type {
    IResponseUser,
    IRequestUserChange,
    IRequestUserChangePassword
}
