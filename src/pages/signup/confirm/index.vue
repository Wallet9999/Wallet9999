<template>
    <div class="signup-confirmation">
        <div class="signup-confirmation__inner">
            <h2 class="signup-confirmation__title">
                Sign Up, {{ credentials.email }}
            </h2>
            <div class="signup-confirmation__form">
                <app-form-input
                    label="Username"
                    :hint="CREDENTIAL_HINTS.username"
                    :errors="form.username.errors"
                >
                    <app-input
                        v-model="form.username.value"
                        type="text"
                        placeholder="Enter username"
                        class="signup-confirmation__form-input"
                        :errors="form.username.errors"
                    />
                </app-form-input>
                <div class="signup-confirmation__form-inner">
                    <app-form-input
                        label="Password"
                        :hint="CREDENTIAL_HINTS.password"
                        :errors="form.password.errors"
                    >
                        <app-input
                            v-model="form.password.value"
                            type="password"
                            placeholder="Enter password"
                            class="signup-confirmation__form-input"
                            :errors="form.password.errors"
                        />
                    </app-form-input>
                    <app-form-input
                        label="Confirm password"
                        :errors="form.confirmPassword.errors"
                    >
                        <app-input
                            v-model="form.confirmPassword.value"
                            type="password"
                            placeholder="Confirm password"
                            class="signup-confirmation__form-input"
                            :errors="form.confirmPassword.errors"
                        />
                    </app-form-input>
                </div>
            </div>
        </div>
        <app-button
            wide
            class="signup-confirmation__button"
            :disabled="!formValid"
            :loading="loading"
            @on-click="handleClick"
        >
            Create account
        </app-button>
    </div>
</template>

<script setup lang="ts">
    import {
        definePageMeta,
        useRoute
    } from '#imports'

    import { useAuth } from '@/composables/useAuth'
    import {
        EMAIL_REGEX,
        PASSWORD_REGEX,
        USERNAME_REGEX,
        CREDENTIAL_HINTS
    } from '@/data/constants'

    interface Credentials {
        token: string | null
        email: string | null
    }

    const auth = useAuth()
    const route = useRoute()
    const loading = ref(false)
    const credentials = reactive<Credentials>({
        token: '',
        email: ''
    })
    const form = reactive({
        username: {
            value: '',
            errors: [] as string[]
        },
        password: {
            value: '',
            errors: [] as string[]
        },
        confirmPassword: {
            value: '',
            errors: [] as string[]
        }
    })

    const formValid = computed(() => {
        return (form.username.value.length >= 4 && form.username.value.length <= 32)
            && form.password.value.length >= 8
            && form.confirmPassword.value === form.password.value
    })

    const validateForm = () => {
        return form.username.value.match(USERNAME_REGEX)
            && form.password.value.match(PASSWORD_REGEX)
            && form.confirmPassword.value === form.confirmPassword.value
    }

    const handleInvalidForm = () => {
        if (!form.password.value.match(PASSWORD_REGEX)) {
            form.password.errors = [ 'Invalid password format' ]
        }

        if (!form.username.value.match(USERNAME_REGEX)) {
            form.username.errors = [ 'Invalid username format' ]
        }

        if (form.confirmPassword.value !== form.password.value) {
            form.confirmPassword.errors = [ 'Passwords doesn\'t\ match' ]
        }
    }

    const redirect = () => {
        return navigateTo('/signup', { redirectCode: 302 })
    }

    const checkCredentials = async () => {
        try {
            await auth.confirmEmail(String(credentials.email), String(credentials.token))
        } catch (err) {
            console.error(err)
            redirect()
        }
    }

    const handleClick = async () => {
        const valid = validateForm()

        if (!valid) {
            handleInvalidForm()

            return undefined
        }

        loading.value = true

        try {
            await auth.register({
                username: form.username.value,
                password: form.password.value
            })

            navigateTo('/')
        } catch (err) {
            console.error(err)
        } finally {
            loading.value = false
        }
    }

    watch(() => form.username.value, () => {
        if (!form.username.errors.length) return undefined

        form.username.errors = []
    })

    watch(() => form.password.value, () => {
        if (!form.password.errors.length) return undefined

        form.password.errors = []
    })

    watch([() => form.password.value, () => form.confirmPassword.value], () => {
        if (!form.password.errors.length && !form.confirmPassword.errors.length) return undefined

        form.confirmPassword.errors = []
    })

    onMounted(async () => {
        credentials.token = String(route.query.token) || null
        credentials.email = EMAIL_REGEX.test(route.query.email as string)
            ? String(route.query.email)
            : null

        if (credentials.token === null || credentials.email === null) {
            return redirect()
        }

        await checkCredentials()
    })

    definePageMeta({ layout: 'login' })
</script>

<style lang="scss" scoped>
    @import '@/assets/scss/variables';
    @import '@/assets/scss/utils';

    .signup-confirmation {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex-grow: 1;
        width: 100%;
        padding: px-to-rem(30) px-to-rem(20) px-to-rem(20);

        &__inner {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: px-to-rem(24);
            width: 100%;
        }

        &__title {
            color: $color-black;
            font-size: px-to-rem(20);
            font-weight: 700;
        }

        &__form {
            display: flex;
            flex-direction: column;
            gap: px-to-rem(32);
            width: 100%;
        }

        &__form-inner {
            display: flex;
            flex-direction: column;
            gap: px-to-rem(12);
            width: 100%;
        }

        &__form-input {
            //...
        }

        &__button {
            width: 100%;
        }
    }
</style>
