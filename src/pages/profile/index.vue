<template>
    <div class="profile">
        <div class="profile__inner">
            <pages-profile-header
                class="profile__inner-header"
                @on-logout="onLogout"
            />
            <pages-profile-form class="profile__inner-form"/>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { useAuth } from '@/composables/useAuth'

    const auth = useAuth()

    const onLogout = async () => {
        await auth.logout()
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/scss/variables';
    @import '@/assets/scss/utils';

    .profile {
        position: relative;
        display: flex;
        flex-direction: column;
        flex-grow: 1;

        &__inner {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            gap: px-to-rem(30);
        }

        &__inner-header {
            margin-top: px-to-rem(20);
            width: 100%;
        }

        &__inner-form {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
        }
    }
</style>
