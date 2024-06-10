<template>
    <div class="signup">
        <div class="signup__inner">
            <div class="signup__header">
                <h1 class="signup__header-title">
                    Create
                </h1>
                <nuxt-link
                    to="/login"
                    class="signup__header-link"
                >
                    Enter
                </nuxt-link>
            </div>
            <div class="signup__form">
                <app-input
                    v-model="email"
                    type="text"
                    placeholder="Email"
                    class="signup__form-input"
                />
            </div>
        </div>
        <app-button
            wide
            class="signup__button"
            :disabled="!valid"
            :loading="loading"
            @on-click="handleClick"
        >
            Continue
        </app-button>
    </div>
</template>

<script setup lang="ts">
    import { definePageMeta } from '#imports'

    import { useAuth } from '@/composables/useAuth'
    import { EMAIL_REGEX } from '@/data/constants'

    const auth = useAuth()
    const loading = ref(false)
    const email = ref('')

    const valid = computed(() => email.value.match(EMAIL_REGEX))

    const handleClick = async () => {
        if (!valid.value) return undefined

        loading.value = true

        try {
            await auth.sendEmail(email.value)
        } catch (err) {
            console.error(err)
        } finally {
            loading.value = false
        }
    }

    definePageMeta({ layout: 'login' })
</script>

<style lang="scss" scoped>
    @import '@/assets/scss/variables';
    @import '@/assets/scss/utils';

    .signup {
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
