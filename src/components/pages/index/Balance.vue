<template>
    <div class="balance">
        <div class="balance__inner">
            <div
                v-if="user.data !== null"
                class="balance__inner-value"
            >
                {{ convertCurrency(user.data?.usd_balance, user.data?.currency)?.toFixed(2) }}
                <span class="balance__inner-value balance__inner-value--currency">
                    {{ getCurrencySymbol(user.data?.currency) }}
                </span>
                <div class="token__user">
                    0.00 <span>NEXT</span>
                </div>
            </div>
            <div class="balance__inner-buttons">
                <div class="balance__inner-buttons__item">
                    <app-button
                        icon
                        class="balance__inner-buttons__item-element color_bg"
                        @on-click="onDeposit"
                    >
                        <template #icon>
                            <icon-plus class="balance__inner-buttons__item-icon" />
                        </template>
                    </app-button>
                    <p class="balance__inner-buttons__item-label">
                        Deposit
                    </p>
                </div>
                <div class="balance__inner-buttons__item">
                    <app-button
                        icon
                        color="black"
                        class="balance__inner-buttons__item-element"
                        @on-click="onConvert"
                    >
                        <template #icon>
                            <icon-exchange class="balance__inner-buttons__item-icon size" />
                        </template>
                    </app-button>
                    <p class="balance__inner-buttons__item-label">
                        Convert
                    </p>
                </div>
                <div class="balance__inner-buttons__item">
                    <app-button
                        icon
                        color="black"
                        class="balance__inner-buttons__item-element"
                        @on-click="onSend"
                    >
                        <template #icon>
                            <IconCup class="balance__inner-buttons__item-icon" />
                        </template>
                    </app-button>
                    <p class="balance__inner-buttons__item-label">
                        AirDrop
                    </p>
                </div>
                <div class="balance__inner-buttons__item balance__bg">
                    <app-button
                        icon
                        color="black"
                        class="balance__inner-buttons__item-element"
                        @on-click="onSend"
                    >
                        <template #icon>
                            <icon-upload class="balance__inner-buttons__item-icon" />
                        </template>
                    </app-button>
                    <p class="balance__inner-buttons__item-label">
                        Send
                    </p>
                </div>
            </div>
        </div>
        <FooterMenu />
    </div>
</template>

<script lang="ts">
    import { defineComponent } from '#imports'

    import { useUserStore } from '@/stores/user'
    import { useCurrencyStore } from '@/stores/currency'
    import { useBus } from '@/composables/useBus'

    import FooterMenu from '@/components/FooterMenu/index.vue';

    import IconPlus from '@/assets/icons/plus.svg?component'
    import IconExchange from '@/assets/icons/icon_24.svg?component'
    import IconUpload from '@/assets/icons/load_circle.svg?component'
    import IconCup from '@/assets/icons/cup.svg?component'

    export default defineComponent({
        components: {
            IconPlus,
            IconExchange,
            IconUpload,
            IconCup,
            FooterMenu
        },
        emits: [
            'on-deposit',
            'on-convert',
            'on-game',
            'on-send'
        ],
        setup (_props, { emit }) {
            const { emitter } = useBus()
            const user = useUserStore()
            const {
                convertCurrency,
                getCurrencyRate,
                getCurrencySymbol
            } = useCurrencyStore()

            const onDeposit = () => {
                emitter.emit('onDeposit')
            }

            const onConvert = () => {
                emit('on-convert')
            }

            const onSend = () => {
                emit('on-send')
            }

            const onGame = () => {
                emit('on-game')
            }

            return {
                user,
                onDeposit,
                onConvert,
                onSend,
                convertCurrency,
                getCurrencyRate,
                getCurrencySymbol,
                onGame
            }
        }
    })
</script>

<style lang="scss" scoped>
    @import '@/assets/scss/variables';
    @import '@/assets/scss/utils';

    .balance {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: px-to-rem(330);
        padding: px-to-rem(100) px-to-rem(40) px-to-rem(24);
        background: linear-gradient(180deg, #1A1A1A 0%, #22262C 100%);
        border-radius: 0 0 px-to-rem(22) px-to-rem(22);

        &__inner {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            flex-grow: 1;
            width: 100%;
        }

        &__inner-value {
            display: inline;
            color: $color-black;
            font-size: px-to-rem(32);
            font-weight: 700;
            margin-top: 10px;

            &--currency {
                color: rgba(255, 255, 255, 0.3);
            }
        }

        &__inner-buttons {
            display: flex;
            align-items: flex-end;
            justify-content: space-between;
            width: 100%;

            &__item {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: px-to-rem(8);
                text-align: center;
            }

            &__item-element {
                //...
            }

            &__item-icon {
                fill: #404246;
                stroke: white;
            }

            &__item-label {
                color: $color-black;
                font-size: px-to-rem(13);
                font-weight: 600;
            }

            &__bg {
                border-color: #404246;
            }
        }
    }

    .token__user {
        font-weight: 700;
        font-size: 13px;
        line-height: 16px;
        text-align: center;
        color: #F0AB26;
        margin-top: 8px;
    }

    .token__user span{
        color: #626466;
    }

    .balance__inner-buttons__item-element {
       background-color: #404246;
    }

    .color_bg {
        background-color: #F0AB26;
    }

    .color_bg svg {
        stroke: #404246;
    }
    .size {
        width: 1.3rem;
    }
</style>
