<template>
     <header
        :class="{
            'header': true,
            'header--active': menuScrolled
        }"
    >
        <div class="header__inner">
            <nuxt-link to="/" class="header__inner-link">
                <home-icon class="header__inner-link-icon" />
            </nuxt-link>
            <nuxt-link to="/" class="header__inner-logo">
                <logo-stealth class="header__inner-logo-icon" />
            </nuxt-link>
            <div class="header__inner-toggler" @click="onOpenMenu">
                <icon-burger class="header__inner-toggler-icon" />
            </div>
        </div>
    </header>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { throttle } from 'lodash-es';

import LogoStealth from '@/assets/logos/logo.svg?component';
import IconBurger from '@/assets/logos/menu.svg?component';
import HomeIcon from '@/assets/icons/notfication.svg?component';

export default defineComponent({
    components: {
        LogoStealth,
        IconBurger,
        HomeIcon // Зарегистрируйте компонент иконки
    },
    emits: ['on-open-menu'],
    setup (_props, { emit }) {
        const menuScrolled = ref(false);

        const setMenuScrolled = () => {
            menuScrolled.value = window.scrollY >= 64;
        };

        const onOpenMenu = () => {
            emit('on-open-menu');
        };

        onMounted(() => {
            window.addEventListener('scroll', throttle(setMenuScrolled, 200, { trailing: true }));
            setMenuScrolled();
        });

        return {
            menuScrolled,
            onOpenMenu
        };
    }
});
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables';
@import '@/assets/scss/utils';

.header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: px-to-rem(64);
    background-color: transparent;
    z-index: 9;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(224, 227, 231, .25);
        backdrop-filter: blur(px-to-rem(16));
        opacity: 0;
        transition: opacity .3s ease-in-out;
        z-index: -1;
    }

    &--active {
        &::before {
            opacity: 1;
        }
    }

    &__inner {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 100%;
        padding: 0 px-to-rem(16);
    }

    &__inner-logo {
        display: flex;
        align-items: center;
    }

    &__inner-logo-icon {
        width: 40px;
        height: px-to-rem(24);
    }

    &__inner-toggler {
        display: flex;
        align-items: center;
        justify-content: center;
        height: px-to-rem(30);
        padding: 0 px-to-rem(6);
        background-color: transparent;
        border-radius: px-to-rem(6);
        transition: background-color .15s ease-in-out;
        cursor: pointer;

        &:hover {
            background-color: rgba(0, 0, 0, 0.15);
        }
    }

    &__inner-toggler-icon {
        width: px-to-rem(24);
        height: auto;
    }
}
</style>