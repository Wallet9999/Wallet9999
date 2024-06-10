<template>
    <div class="profile-header">
        <div class="profile-header__wrapper">
            <p class="profile-header__title">
                My account
            </p>
            <div class="profile-header__inner">
                <div
                    v-if="user.data !== null"
                    class="profile-header__inner-data"
                >
                    <p class="profile-header__inner-data-text">
                        Account ID:
                    </p>
                    <p
                        class="profile-header__inner-data-text profile-header__inner-data-text--dark"
                        @click="copy.copy(user.data.id)"
                    >
                        {{ truncateString(user.data.id) }}
                    </p>
                </div>
                <div
                    class="profile-header__inner-logout"
                    @click="onLogout"
                >
                    <icon-logout class="profile-header__inner-logout-icon" />
                    <p class="profile-header__inner-logout-text">
                        Logout
                    </p>
                </div>
            </div>
        </div>
        <div class="profile-header__underscore" />
    </div>
</template>

<script lang="ts">
    import { defineComponent } from '#imports'

    import { useUserStore } from '@/stores/user'
    import { useCopyText } from '@/composables/useCopyText'

    import IconLogout from '@/assets/icons/logout.svg?component'

    export default defineComponent({
        components: { IconLogout },
        emits: [ 'on-logout' ],
        setup (_props, { emit }) {
            const user = useUserStore()
            const copy = useCopyText()

            const onLogout = () => {
                emit('on-logout')
            }

            return {
                user,
                copy,
                onLogout
            }
        }
    })
</script>

<style lang="scss" scoped>
    @import '@/assets/scss/variables';
    @import '@/assets/scss/utils';

    .profile-header {
        display: flex;
        flex-direction: column;
        gap: px-to-rem(16);
        width: 100%;

        &__wrapper {
            display: flex;
            flex-direction: column;
            gap: px-to-rem(12);
            width: 100%;
            padding: 0 px-to-rem(20);
        }

        &__title {
            color: $color-black-light;
            font-size: px-to-rem(24);
            font-weight: 700;
        }

        &__inner {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        &__inner-data {
            display: flex;
            align-items: center;
            gap: px-to-rem(4);
        }

        &__inner-data-text {
            color: #F0AB26;
            font-size: px-to-rem(15);
            font-weight: 700;

            &--dark {
                color: $color-black-light;
            }
        }

        &__inner-logout {
            display: flex;
            align-items: center;
            gap: px-to-rem(8);
            padding: px-to-rem(6) px-to-rem(8);
            color: rgba(54, 56, 83, .5);
            background-color: transparent;
            border-radius: px-to-rem(8);
            transition: background-color .2s ease-in-out;
            cursor: pointer;

            &:hover {
                background-color: $color-grey;
            }
        }

        &__inner-logout-icon {
            width: px-to-rem(24);
            height: auto;
        }

        &__inner-logout-text {
            color: #F0AB26;
            font-size: px-to-rem(15);
            font-weight: 700;
        }

        &__underscore {
            width: 100%;
            height: px-to-rem(2);
            background-color: $color-grey;
        }
    }
</style>
