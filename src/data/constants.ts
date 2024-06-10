const ALLOWED_ROUTES = ['/login', 'signup', 'test', 'buy']

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const USERNAME_REGEX = /^[a-zA-Z0-9_.@]{4,32}$/
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/

const CREDENTIAL_HINTS = {
    username: [
        'At least 4 characters long',
        'No special symbols allowed'
    ],
    password: [
        'At least 8 characters long',
        'At least one uppercase letter',
        'At least one lowercase letter',
        'At least one number'
    ]
}

export {
    ALLOWED_ROUTES,
    EMAIL_REGEX,
    USERNAME_REGEX,
    PASSWORD_REGEX,
    CREDENTIAL_HINTS
}
