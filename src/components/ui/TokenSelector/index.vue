<template>
    <div class="token-selector">
        <div class="token-selector__inner">
            <div class="token-selector__inner-row">
                <div
                    class="token-selector__inner-row-name"
                    @click="!unselectable ? onOpenModal() : undefined"
                >
                    <template v-if="selected.length !== 0">
                        <nuxt-img
                            v-if="selected[0].image"
                            format="webp"
                            width="24"
                            height="24"
                            class="token-selector__inner-row-name-image"
                            :src="selected[0].image"
                            :alt="selected[0].name"
                        />
                        <p class="token-selector__inner-row-name-text">
                            {{ selected[0].name }}
                        </p>
                    </template>
                    <p
                        v-else
                        class="token-selector__inner-row-name-placeholder"
                    >
                        Select Token
                    </p>
                    <icon-chevron
                        v-if="!unselectable"
                        class="token-selector__inner-row-name-icon"
                    />
                </div>
                <template v-if="selected.length !== 0">
                    <p
                        v-if="!writable"
                        class="token-selector__inner-row-value"
                    >
                        {{ parseFloat(selected[0].amount).toFixed(2) }}
                    </p>
                    <app-static-input
                        v-else
                        :value="amount"
                        :placeholder="parseFloat(selected[0].amount).toFixed(2)"
                        @on-focus="onFocus"
                    />
                </template>
            </div>
            <div
                v-if="selected.length !== 0"
                class="token-selector__inner-row"
            >
                <p class="token-selector__inner-row-rate">
                    Rate: {{ getCurrencySymbol(currency) }}{{ convertCurrency(selected[0].rate, currency, 'USD')?.toFixed(2) }}
                </p>
                <p class="token-selector__inner-row-balance">
                    {{ getCurrencySymbol(currency) }}
                    {{ convertCurrency((parseFloat(selected[0].amount) * selected[0].rate), currency, 'USD')?.toFixed(2) }}
                </p>
            </div>
        </div>
        <token-selector-modals-tokens
            ref="compModalTokens"
            @on-select="onSelectToken"
        />
    </div>
</template>

<script lang="ts">
    import type ModalTokens from '@/components/ui/TokenSelector/modals/Tokens/index.vue'

    import { defineComponent } from '#imports'

    import { useUserStore } from '@/stores/user'
    import { useCurrencyStore } from '@/stores/currency'

    import IconChevron from '@/assets/icons/chevron.svg?component'

    export interface TokenOption {
        id: string
        image: string
        name: string
        symbol: string
        rate: number
        amount: string
    }

    export default defineComponent({
        components: { IconChevron },
        props: {
            tokenId: {
                type: String,
                default: ''
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
            'on-change',
            'on-input-focus'
        ],
        setup (props, { emit }) {
            const compModalTokens = ref<InstanceType<typeof ModalTokens>>()

            const {
                getCurrencySymbol,
                convertCurrency
            } = useCurrencyStore()
            const user = useUserStore()

            const currency = computed(() => user.data?.currency || 'USD')

            const options = computed<TokenOption[]>(() => {
                if (!user.balances) return [] as TokenOption[]

                return user.balances.balances
                    .filter(el => el.type !== 'fiat')
                    .map((el) => ({
                        id: el.id,
                        image: el.image,
                        name: el.name,
                        symbol: el.symbol,
                        rate: el.usd_rate,
                        amount: el.amount
                    }))
            })
            const selected = ref<TokenOption[]>([])

            const onFocus = () => {
                emit('on-input-focus')
            }

            const onOpenModal = () => {
                compModalTokens.value?.open(options.value)
            }

            const onSelectToken = (id: string) => {
                selected.value = options.value.filter(el => el.symbol === id)
            }

            watch(() => selected.value, (value) => {
                if (!value.length) return undefined

                emit('on-change', value[0].symbol)
            })

            watch(() => props.tokenId, (value) => {
                if (!value || !user.balances?.balances.some(el => el.symbol === value)) {

                    return options.value.length !== 0
                        ? selected.value = [ options.value[0] ]
                        : selected.value = []
                }

                selected.value = options.value.filter(el => el.symbol === value)
            }, { immediate: true })

            return {
                compModalTokens,
                user,
                currency,
                options,
                selected,
                onFocus,
                onOpenModal,
                onSelectToken,
                getCurrencySymbol,
                convertCurrency
            }
        }
    })
</script>

<style lang="scss" scoped>
    @import '@/assets/scss/variables';
    @import '@/assets/scss/utils';

    .token-selector {
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

        &__inner-row-name-image {
            width: px-to-rem(24);
            height: px-to-rem(24);
        }

        &__inner-row-name-text {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            max-width: px-to-rem(140);
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

        &__inner-row-name-placeholder {
            color: $color-grey-dark;
            font-size: px-to-rem(14);
            font-weight: 600;
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
