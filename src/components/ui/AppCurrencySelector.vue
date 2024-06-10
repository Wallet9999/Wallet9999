<template>
    <div class="currency">
        <div class="currency__inner">
            <div
                class="currency__inner-row"
                @click="!unselectable ? onOpenModal() : undefined"
            >
                <div class="currency__inner-row-name">
                    <p class="currency__inner-row-name-text">
                        {{ currency }}
                    </p>
                    <icon-chevron
                        v-if="!unselectable"
                        class="currency__inner-row-name-icon"
                    />
                </div>
                <p
                    v-if="!writable"
                    class="currency__inner-row-value"
                >
                    {{ convertCurrency(balance, currency)?.toFixed(2) }}{{ getCurrencySymbol(currency) }}
                </p>
                <app-numeric-static-input
                    v-else
                    :value="amount"
                    :placeholder="convertCurrency(balance, currency)?.toFixed(2)"
                    @on-focus="onFocus"
                />
            </div>
            <div class="currency__inner-row">
                <p class="currency__inner-row-rate">
                    Rate: {{ getCurrencyRate(currency)?.toFixed(2) }}{{ getCurrencySymbol(currency) }}
                </p>
                <p class="currency__inner-row-balance">
                    Balance: {{ balance }}$
                </p>
            </div>
        </div>
        <modals-currency
            ref="compModalCurrency"
            @on-select="onSelectCurrency"
        />
    </div>
</template>

<script lang="ts">
    import type ModalCurrency from '@/components/modals/Currency/index.vue'

    import { useCurrencyStore } from '@/stores/currency'

    import { defineComponent } from '#imports'

    import IconChevron from '@/assets/icons/chevron.svg?component'

    export default defineComponent({
        components: { IconChevron },
        props: {
            defaultCurrency: {
                type: String,
                default: 'USD'
            },
            balance: {
                type: Number,
                default: 0
            },
            amount: {
                type: String,
                default: ''
            },
            writable: {
                type: Boolean,
                default: false
            },
            unselectable: {
                type: Boolean,
                default: false
            }
        },
        emits: [
            'on-change-currency',
            'on-input-focus'
        ],
        setup (props, { emit }) {
            const compModalCurrency = ref<InstanceType<typeof ModalCurrency>>()
            const {
                convertCurrency,
                getCurrencyRate,
                getCurrencySymbol
            } = useCurrencyStore()
            const currency = ref(props.defaultCurrency)

            const onFocus = () => {
                emit('on-input-focus')
            }

            const onOpenModal = () => {
                compModalCurrency.value?.open(props.balance)
            }

            const onSelectCurrency = (value: string): void => {
                currency.value = value
            }

            watch(() => currency.value, (value) => {
                emit('on-change-currency', value)
            })

            return {
                compModalCurrency,
                currency,
                onFocus,
                onOpenModal,
                onSelectCurrency,
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

    .currency {
        //...

        &__inner {
            display: flex;
            flex-direction: column;
            justify-content: center;
            gap: px-to-rem(10);
            width: 100%;
            height: px-to-rem(90);
            padding: 0 px-to-rem(16);
            background-color: $color-grey-light;
            border-radius: px-to-rem(12);
        }

        &__inner-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
        }

        &__inner-row-name {
            display: flex;
            align-items: center;
            gap: px-to-rem(8);
        }

        &__inner-row-name-text {
            color: $color-black;
            font-size: px-to-rem(20);
            font-weight: 700;
        }

        &__inner-row-name-icon {
            width: px-to-rem(24);
            min-width: px-to-rem(24);
            height: auto;
            stroke: $color-black;
            transform: rotate(90deg);
        }

        &__inner-row-value {
            color: $color-black;
            font-size: px-to-rem(20);
            font-weight: 600;
        }

        &__inner-row-rate,
        &__inner-row-balance {
            color: $color-grey-dark;
            font-size: px-to-rem(13);
            font-weight: 700;
        }
    }
</style>
