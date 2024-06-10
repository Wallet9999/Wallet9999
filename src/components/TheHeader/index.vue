<template>
    <header
        :class="{
            'header': true,
            'header--active': menuScrolled
        }"
    >
        <div class="header__inner">
            <nuxt-link
                to="/"
                class="header__inner-logo"
            >
        <!--<logo-next class="header__inner-logo-icon" />-->
                <logo-stealth class="header__inner-logo-icon" />
            </nuxt-link>
            <div
                class="header__inner-toggler"
                @click="onOpenMenu"
            >
                <icon-burger class="header__inner-toggler-icon" />
            </div>
        </div>
    </header>
    <div style="position:absolute;bottom:0;height:30px;width:100%;backgroung:#23823850;">
        <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 16px;">
            <nuxt-link to="/" style="">
                <icon-trade style="width:14px;height:14px;" />
            </nuxt-link>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from '#imports'

    import { throttle } from 'lodash-es'

    import LogoNext from '@/assets/logos/next.svg?component'
    import LogoStealth from '@/assets/logos/stealth.svg?component'
    import IconBurger from '@/assets/icons/burger.svg?component'
    // import IconTrade from '@/assets/icons/trade.svg?component'
    // import IconWallet from '@/assets/icons/wallet.svg?component'
    // import IconNft from '@/assets/icons/nft.svg?component'
    // import IconAccount from '@/assets/icons/account.svg?component'


    export default defineComponent({
        components: {
            LogoNext,
            LogoStealth,
            IconBurger
        },
        emits: [ 'on-open-menu' ],
        setup (_props, { emit }) {
            const menuScrolled = ref(false)

            const setMenuScrolled = () => {
                menuScrolled.value = window.scrollY >= 64
            }

            const onOpenMenu = () => {
                emit('on-open-menu')
            }

            onMounted(() => {
                window.addEventListener('scroll', throttle(setMenuScrolled, 200, { trailing: true }))

                setMenuScrolled()
            })

            return {
                menuScrolled,
                onOpenMenu
            }
        }
    })
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
        height: px-to-rem(44);
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
            //...

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
            height: 35px;
            width: auto;
        }

        &__inner-logo-icon {
            //width: px-to-rem(82);
            //width: px-to-rem(20);
            width: auto;
            height: px-to-rem(18);
        }

        &__inner-toggler {
            display: flex;
            align-items: center;
            justify-content: center;
            height: px-to-rem(30);
            padding: 0 px-to-rem(6);
            background-color: #eee;
            border-radius: px-to-rem(6);
            transition: background-color .15s ease-in-out;
            cursor: pointer;

            &:hover {
                background-color: #888;
            }
        }

        &__inner-toggler-icon {
            width: px-to-rem(24);
            height: auto;
        }
    }
</style>
