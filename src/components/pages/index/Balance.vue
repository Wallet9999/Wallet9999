<template>
    <div class="balance">
        <div class="balance__inner">
            <div
                v-if="user.data !== null"
                class="balance__inner-value"
            >
                <span class="balance__inner-value balance__inner-value--currency">
                    {{ getCurrencySymbol(user.data?.currency) }}
                </span>
                {{ convertCurrency(user.data?.usd_balance, user.data?.currency)?.toFixed(2) }}
            </div>
            <div class="balance__inner-buttons">
                <div class="balance__inner-buttons__item">
                    <app-button
                        icon
                        class="balance__inner-buttons__item-element"
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
                            <icon-exchange class="balance__inner-buttons__item-icon" />
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
                            <icon-upload class="balance__inner-buttons__item-icon" />
                        </template>
                    </app-button>
                    <p class="balance__inner-buttons__item-label">
                        Send
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from '#imports'

    import { useUserStore } from '@/stores/user'
    import { useCurrencyStore } from '@/stores/currency'
    import { useBus } from '@/composables/useBus'

    import IconPlus from '@/assets/icons/plus.svg?component'
    import IconExchange from '@/assets/icons/exchange.svg?component'
    import IconUpload from '@/assets/icons/upload.svg?component'

    export default defineComponent({
        components: {
            IconPlus,
            IconExchange,
            IconUpload
        },
        emits: [
            'on-deposit',
            'on-convert',
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

            return {
                user,
                onDeposit,
                onConvert,
                onSend,
                convertCurrency,
                getCurrencyRate,
                getCurrencySymbol
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
        background: $color-grey;
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

            &--currency {
                color: rgba(0, 0, 0, .3);
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
                fill: $color-white;
                stroke: $color-white;
            }

            &__item-label {
                color: $color-black;
                font-size: px-to-rem(13);
                font-weight: 600;
            }
        }
    }
</style>
