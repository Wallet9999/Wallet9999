<template>
    <div class="item">
        <div class="item__inner">
            <div class="item__inner-block">
                <nuxt-img
                    v-if="data.image"
                    format="webp"
                    width="54"
                    height="54"
                    class="item__inner-block__image"
                    :src="data.image"
                    :alt="data.name"
                />
                <div class="item__inner-block__column">
                    <p class="item__inner-block__column-name">
                        {{ data.name }}
                    </p>
                    <p class="item__inner-block__column-rate">
                        {{ getCurrencySymbol(currency) }}{{ convertCurrency(data.rate, currency, 'USD')?.toFixed(2) }}
                    </p>
                </div>
            </div>
            <div class="item__inner-block">
                <div class="item__inner-block__column item__inner-block__column--right">
                    <p class="item__inner-block__column-amount">
                        {{ parseFloat(data.amount).toFixed(6) }}
                    </p>
                    <p class="item__inner-block__column-total">
                        {{ getCurrencySymbol(currency) }}
                        {{ convertCurrency((parseFloat(data.amount) * data.rate), currency, 'USD')?.toFixed(2) }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import type { PropType } from 'vue'
    import type { TokenOption } from '@/components/ui/TokenSelector/index.vue'
    import { defineComponent } from '#imports'

    import { useUserStore } from '@/stores/user'
    import { useCurrencyStore } from '@/stores/currency'

    export default defineComponent({
        props: {
            data: {
                type: Object as PropType<TokenOption>,
                default: () => {}
            }
        },
        setup (_props) {
            const {
                getCurrencySymbol,
                convertCurrency
            } = useCurrencyStore()
            const user = useUserStore()

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

    .item {
        display: flex;
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

        &__inner {
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-grow: 1;
            width: 100%;
            height: 100%;
        }

        &__inner-block {
            display: flex;
            align-items: center;
            gap: px-to-rem(16);

            &__image {
                width: px-to-rem(54);
                height: px-to-rem(54);
            }

            &__column {
                display: flex;
                flex-direction: column;
                gap: px-to-rem(8);

                &--right {
                    text-align: right;
                }
            }

            &__column-name {
                color: $color-black;
                font-size: px-to-rem(16);
                font-weight: 700;
            }

            &__column-rate {
                color: $color-blue;
                font-size: px-to-rem(14);
                font-weight: 500;
            }

            &__column-amount {
                color: $color-blue;
                font-size: px-to-rem(15);
                font-weight: 800;
            }

            &__column-total {
                color: $color-grey-dark;
                font-size: px-to-rem(14);
                font-weight: 500;
            }
        }
    }
</style>
