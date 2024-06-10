<template>
    <div class="currency">
        <div class="currency__row">
            <p class="currency__row-name">
                {{ currency.toUpperCase() }}
            </p>
            <p class="currency__row-value">
                {{ convertCurrency(balance, currency)?.toFixed(2) }}
            </p>
        </div>
        <div class="currency__row">
            <p class="currency__row-rate">
                Rate: {{ getCurrencySymbol(currency) }}{{ getCurrencyRate(currency)?.toFixed(2) }}
            </p>
            <p class="currency__row-balance">
                Balance: ${{ balance }}
            </p>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from '#imports'

    import { useCurrencyStore } from '@/stores/currency'

    export default defineComponent({
        props: {
            currency: {
                type: String,
                default: ''
            },
            balance: {
                type: Number,
                default: null
            }
        },
        setup (_props) {
            const {
                getCurrencySymbol,
                getCurrencyRate,
                convertCurrency
            } = useCurrencyStore()

            return {
                getCurrencySymbol,
                getCurrencyRate,
                convertCurrency
            }
        }
    })
</script>

<style lang="scss" scoped>
    @import '@/assets/scss/variables';
    @import '@/assets/scss/utils';

    .currency {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: px-to-rem(10);
        width: 100%;
        height: px-to-rem(90);
        padding: 0 px-to-rem(16);
        background-color: $color-grey-light;
        border-radius: px-to-rem(12);
        transition: background-color .15s ease-in-out;
        cursor: pointer;

        &:hover {
            background-color: $color-grey;
        }

        &__row {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        &__row-name {
            color: $color-black;
            font-size: px-to-rem(20);
            font-weight: 700;
        }

        &__row-value {
            color: $color-black;
            font-size: px-to-rem(20);
            font-weight: 600;
        }

        &__row-rate,
        &__row-balance {
            color: $color-grey-dark;
            font-size: px-to-rem(13);
            font-weight: 700;
        }
    }
</style>
