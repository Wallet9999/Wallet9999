import type { IResponseError } from '@/shared/api/types/Base.interface'

export const APIErrors: IResponseError[] = [
    // auth 1xxx
    { code: 1001, message: 'Missing or malformed JWT token' },
    { code: 1002, message: 'Invalid or expired JWT' },
    { code: 1003, message: 'No auth token provided' },
    { code: 1004, message: 'Invalid auth token or email' },
    { code: 1005, message: 'Auth token expired' },
    { code: 1006, message: 'Invalid refresh token' },
    { code: 1007, message: 'Expired refresh token' },
    { code: 1008, message: 'User does not exist' },
    { code: 1009, message: 'Invalid password' },

    // auth.registration 11xx
    { code: 1101, message: 'This user is already registered' },
    { code: 1102, message: 'This username is already taken' },

    // validation 5xxx
    { code: 5001, message: 'Invalid email' },
]
