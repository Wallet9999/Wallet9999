class PropValidationError<T> extends Error {
    constructor(name: string, value: T, allowed: T[]) {
        const message = `[Vue warn]: prop "${name}" must be any of following: "${allowed.join(', ')}", got "${value}".`

        super(message)

        Object.setPrototypeOf(this, PropValidationError.prototype)
    }
}

const propTypeValidator = <T>(name: string, value: T, allowed: T[]): boolean => {
    if (allowed.includes(value)) return true

    const error = new PropValidationError<T>(name, value, allowed)

    console.warn(error.message)

    return false
}

export { propTypeValidator }
