<template>
    <div class="login">
        <div class="login__inner">
            <div class="login__header">
                <h1 class="login__header-title">
                    Log In
                </h1>
                
            </div>
            <div class="login__form">
                <app-input
                    v-model="form.username"
                    type="text"
                    placeholder="Username or email"
                    class="login__form-input"
                />
                <app-input
                    v-model="form.password.value"
                    type="password"
                    placeholder="Password"
                    class="login__form-input"
                    :errors="form.password.errors"
                />
            </div>
            <app-button
                wide
                class="login__button"
                :loading="loading"
                :disabled="!valid"
                @on-click="handleClick"
            >
                Log In
            </app-button>
        </div>
        <nuxt-link
            wide
            to="/signup"
            class="login__signup-button"
        >
            Sign Up
        </nuxt-link>
    </div>
</template>

<script setup lang="ts">
    import { definePageMeta } from '#imports'

    import { useAuth } from '@/composables/useAuth'

    const auth = useAuth()
    const loading = ref(false)
    const form = reactive({
        username: '',
        password: {
            value: '',
            errors: [] as string []
        }
    })

    const valid = computed(() => {
        return form.username.length >= 4
            && form.password.value.length >= 8
    })

    const handleClick = async () => {
        if (!valid.value) return undefined

        loading.value = true

        try {
            return await auth.login({
                username: form.username,
                password: form.password.value
            })
        } catch (err: any) {
            console.error(err)
            handleError(err.code)
        } finally {
            loading.value = false
        }
    }

    const handleError = (code: number | undefined) => {
        if (!code) return undefined

        switch (code) {
            case 1008:
                return navigateTo('/signup')
            case 1009:
                form.password.errors = [ 'Invalid password' ]
                return undefined
        }
    }

    watch(() => form.password.value, () => {
        if (!form.password.errors.length) return undefined

        form.password.errors = []
    })

    definePageMeta({ layout: 'login' })
</script>

<style lang="scss" scoped>
    @import '@/assets/scss/variables';
    @import '@/assets/scss/utils';

    .login {
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

        &__header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
        }

        &__header-title {
            color: $color-black;
            font-size: px-to-rem(24);
            font-weight: 700;
        }

        &__header-link {
            color: $color-blue-light;
            font-size: px-to-rem(18);
            font-weight: 700;
        }

        &__form {
            display: flex;
            flex-direction: column;
            gap: px-to-rem(8);
            width: 100%;
        }

        &__form-input {
            //...
        }

        &__signup-button {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            color: $color-white;
            background: #F0AB26;
            font-size: px-to-rem(18);
            font-weight: 700;
            padding: 9px;
        }

        &__button {
            width: 100%;
        }
    }
</style>
