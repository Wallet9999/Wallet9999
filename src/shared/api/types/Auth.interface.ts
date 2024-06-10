interface IRequestAuthSendEmail {
    email: string
}

interface IRequestAuthConfirmEmail extends IRequestAuthSendEmail {
    token: string
}

interface IRequestAuthLogin {
    username: string
    password: string
}

interface IResponseAuthTokens {
    access_token: string
    refresh_token: string
}

interface ILink {
    link: string
}

export type {
    IRequestAuthSendEmail,
    IRequestAuthConfirmEmail,
    IRequestAuthLogin,
    IResponseAuthTokens,
    ILink
}
