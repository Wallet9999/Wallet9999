<template>
    <div class="footer__menu">
        <ul class="footer__menu_items">
            <li class="footer__menu_item">
                <nuxt-link class="footer__menu_link" to="/convert">
                    <div class="footer__menu_link_icon">
                        <ConvertIcon />
                    </div>
                    <span>Convert</span>
                </nuxt-link>
            </li>
            <li class="footer__menu_item">
                <nuxt-link class="footer__menu_link" to="/transactions/trade">
                    <div class="footer__menu_link_icon">
                        <TradingIcon />
                    </div>
                    <span>Trading</span>
                </nuxt-link>
            </li>
            <li class="footer__menu_item">
                <nuxt-link class="footer__menu_link" to="/wallet">
                    <div class="footer__menu_link_icon">
                        <WaletIcon />
                    </div>
                    <span>Wallet</span>
                </nuxt-link>
            </li>
            <li class="footer__menu_item">
                <nuxt-link class="footer__menu_link" to="/account">
                    <div class="footer__menu_link_icon">
                        <AccountIcon />
                    </div>
                    <span>Account</span>
                </nuxt-link>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ConvertIcon from '@/assets/icons/convert_icon.svg?component';
import TradingIcon from '@/assets/icons/trading_icon.svg?component';
import WaletIcon from '@/assets/icons/walet_icon.svg?component';
import AccountIcon from '@/assets/icons/account_icon.svg?component';

export default defineComponent({
    name: 'FooterMenu',
    components: {
        ConvertIcon,
        TradingIcon,
        WaletIcon,
        AccountIcon
    }
});
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables';
@import '@/assets/scss/utils';

.footer__menu {
    background: $color-white-light;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 10px 32px;
    z-index: 5;

    &_items {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    &_link {
        font-weight: 700;
        font-size: 9px;
        line-height: 11px;
        text-align: center;
        color: $color-black-light;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        transition: 0.3s ease 0s;

        &:hover {
            opacity: 0.6;
        }
    }

    &_link_icon {
        width: 21px;
        height: 21px;
    }
}
</style>
