<template>
    <div class="token">
        <div class="token__inner">
            <div class="token__inner-block">
                <nuxt-img
                    v-if="data.image"
                    format="webp"
                    width="40"
                    height="40"
                    class="token__inner-block__image"
                    :src="data.image"
                    :alt="data.name"
                />
                <div class="token__inner-block__column">
                    <p class="token__inner-block__column-name">
                        {{ data.name }}
                    </p>
                    <p class="token__inner-block__column-rate">
                        {{ getCurrencySymbol(currency) }}{{ convertCurrency(data.usd_rate, currency, 'USD')?.toFixed(4) }}
                    </p>
                </div>
            </div>
            <div class="token__inner-block">
                <div class="token__inner-block__column token__inner-block__column--right">
                    <p class="token__inner-block__column-amount">
                        {{ parseFloat(data.amount).toFixed(data.type !== 'fiat' ? 6 : 2) }}
                    </p>
                    <p class="token__inner-block__column-total">
                        {{ getCurrencySymbol(currency) }}{{ convertCurrency((parseFloat(data.amount) * data.usd_rate), currency, 'USD')?.toFixed(4) }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import type { PropType } from 'vue'
    import type { IWalletBalance } from '@/shared/api/types/Wallet.interface'
    import { defineComponent } from '#imports'

    import { useUserStore } from '@/stores/user'
    import { useCurrencyStore } from '@/stores/currency'

    export default defineComponent({
        props: {
            data: {
                type: Object as PropType<IWalletBalance>,
                default: () => {}
            }
        },
        setup (_props) {
            const user = useUserStore()
            const {
                getCurrencySymbol,
                convertCurrency
            } = useCurrencyStore()

            const currency = computed(() => user.data?.currency || 'USD')

            return {
                currency,
                getCurrencySymbol,
                convertCurrency
            }
        }
    })
</script>

<style lang="scss" scoped>
    @import '@/assets/scss/variables';
    @import '@/assets/scss/utils';

    .token {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        padding: px-to-rem(10);

        &__inner {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            height: px-to-rem(40);
        }

        &__inner-block {
            display: flex;
            align-items: center;
            gap: px-to-rem(16);

            &__image {
                width: px-to-rem(40);
                height: px-to-rem(40);
            }

            &__column {
                display: flex;
                flex-direction: column;
                gap: px-to-rem(4);

                &--right {
                    text-align: right;
                }
            }

            &__column-name {
                color: $color-black;
                font-size: px-to-rem(14);
                font-weight: 700;
            }

            &__column-rate {
                color: $color-blue;
                font-size: px-to-rem(12);
                font-weight: 500;
            }

            &__column-amount {
                color: $color-blue;
                font-size: px-to-rem(13);
                font-weight: 800;
            }

            &__column-total {
                color: $color-grey-dark;
                font-size: px-to-rem(12);
                font-weight: 500;
            }
        }
    }
</style>
