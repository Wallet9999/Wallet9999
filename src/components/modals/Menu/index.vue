<template>
    <teleport to="body">
        <app-modal-sheet v-model="visible">
            <div class="modal__body">
                <div
                    :class="{
                    'modal__body-profile': true,
                    'modal__body-profile--active': auth.isAuthenticated
                }"
                    @click="handleClick('/profile', true)"
                >
                    <div class="modal__body-profile__avatar">
                        <icon-user class="modal__body-profile__avatar-icon" />
                    </div>
                    <div class="modal__body-profile__inner">
                        <h6 class="modal__body-profile__inner-title">
                            {{ auth.isAuthenticated && user.data !== null ? user.data?.username : 'You' }}
                        </h6>
                        <p class="modal__body-profile__inner-description">
                            {{ auth.isAuthenticated ? 'Edit profile' : 'To edit your profile, please sign in.' }}
                        </p>
                    </div>
                    <icon-chevron
                        v-if="auth.isAuthenticated"
                        class="modal__body-profile__chevron"
                    />
                </div>
                <div class="modal__body-menu">
                    <div
                        v-for="item in menuList"
                        class="modal__body-menu__item"
                        :key="item.id"
                        @click="handleClick(item.path, item.protected, item.target)"
                    >
                        <p class="modal__body-menu__item-text">
                            {{ item.text }}
                        </p>
                        <icon-chevron class="modal__body-menu__item-icon" />
                    </div>
                </div>
            </div>
            <template #footer>
                <div class="modal__footer">
                    <app-button
                        wide
                        color="black"
                        class="modal__footer-button"
                    >
                        <icon-support class="modal__footer-button-icon" />
                        Support
                    </app-button>
                </div>
            </template>
        </app-modal-sheet>
    </teleport>
</template>

<script lang="ts">
    import type { RouteLocationRaw } from 'vue-router'
    import { defineComponent } from '#imports'

    import { useAuthStore } from '@/stores/auth'
    import { useUserStore } from '@/stores/user'

    import { menu } from '@/data/menu'

    import IconUser from '@/assets/icons/user.svg?component'
    import IconChevron from '@/assets/icons/chevron.svg?component'
    import IconSupport from '@/assets/icons/support.svg?component'

    export default defineComponent({
        components: {
            IconUser,
            IconChevron,
            IconSupport
        },
        setup (_props, { expose }) {
            const auth = useAuthStore()
            const user = useUserStore()
            const visible = ref(false)

            const menuList = computed(() => {
                return auth.isAuthenticated
                    ? menu
                    : menu.filter(el => !el.protected)
            })

            const open = (): void => {
                visible.value = true
            }

            const close = (): void => {
                visible.value = false
            }

            const handleClick = (path: string | RouteLocationRaw, routeProtected: boolean, target?: '_blank') => {
                if (routeProtected && !auth.isAuthenticated) return undefined

                close()

                return target === '_blank'
                    ? window.open(path as string, '_blank')
                    : navigateTo(path)
            }

            expose({ open, close })

            return {
                auth,
                user,
                visible,
                menuList,
                open,
                close,
                handleClick
            }
        }
    })
</script>

<style lang="scss" scoped>
    @import '@/assets/scss/variables';
    @import '@/assets/scss/utils';

    .modal {
        //...

        &__body {
            display: flex;
            flex-direction: column;
            gap: px-to-rem(24);
            width: 100%;
            height: 100%;
            min-height: 60vh;
        }

        &__body-profile {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: px-to-rem(18);
            width: 100%;
            height: px-to-rem(82);
            padding: 0 px-to-rem(12);
            background-color: $color-grey;
            border-radius: px-to-rem(22);

            &--active {
                transition: background-color .2s ease-in-out;
                cursor: pointer;

                &:hover {
                    background-color: $color-grey-light;
                }
            }

            &__avatar {
                display: flex;
                align-items: center;
                justify-content: center;
                width: px-to-rem(66);
                height: px-to-rem(66);
                background-color: $color-white;
                border-radius: px-to-rem(18);
            }

            &__avatar-icon {
                width: px-to-rem(36);
                height: auto;
            }

            &__inner {
                display: flex;
                flex-direction: column;
                justify-content: center;
                flex-grow: 1;
                gap: px-to-rem(8);
            }

            &__inner-title {
                color: $color-black;
                font-size: px-to-rem(16);
                font-weight: 700;
            }

            &__inner-description {
                color: $color-black-light;
                font-size: px-to-rem(12);
                font-weight: 600;
            }

            &__chevron {
                width: px-to-rem(24);
                height: auto;
                stroke: $color-black-light;
            }
        }

        &__body-menu {
            display: flex;
            flex-direction: column;
            gap: px-to-rem(6);

            &__item {
                display: flex;
                align-items: center;
                justify-content: space-between;
                width: 100%;
                height: px-to-rem(64);
                padding: 0 px-to-rem(12) 0 px-to-rem(20);
                background-color: rgba(237, 239, 242, .5);
                border-radius: px-to-rem(16);
                transition: background-color .2s ease-in-out;
                cursor: pointer;

                &:hover {
                    background-color: rgba(237, 239, 242, .9);
                }
            }

            &__item-text {
                color: $color-black-light;
                font-size: px-to-rem(16);
                font-weight: 800;
            }

            &__item-icon {
                width: px-to-rem(24);
                height: auto;
                stroke: $color-black-light;
            }
        }

        &__footer {
            width: 100%;
        }

        &__footer-button {
            display: flex;
            align-items: center;
            gap: px-to-rem(8);
            width: 100%;
            background-color: #212327;
            color: #F0AB26;
        }

        &__footer-button-icon {
            width: px-to-rem(24);
            height: auto;
        }
    }

    .modal__body-menu__item {
        background-color: #212327;
    }
</style>
