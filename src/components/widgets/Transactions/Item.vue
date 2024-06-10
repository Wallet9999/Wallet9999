<template>
    <div class="item">
        <div class="item__inner">
            <div class="item__inner-type">
                <component
                    :is="operationTypeData.icon"
                    class="item__inner-type-icon"
                />
            </div>
            <div class="item__inner-description">
                <p class="item__inner-description-type">
                    {{ operationTypeData.text }}
                </p>
                <p
                    v-if="data.status !== 'completed'"
                    :class="{
                        'item__inner-description-status': true,
                        ['item__inner-description-status--' + data.status]: true
                    }"
                >
                    {{ data.status }}
                </p>
                <p
                    v-else
                    class="item__inner-description-date"
                >
                    {{ date }}
                </p>
            </div>
        </div>
        <div class="item__inner">
            <div class="item__inner-amount">
                <p class="item__inner-amount-text">
                    {{ isDeposit ? '+' : '-' }}
                    {{ isCryptoOperation ? parseFloat(data.token?.amount || '0').toFixed(6) : parseFloat(data.fiat?.amount || '0').toFixed(2) }}
                    <span
                        v-if="isCryptoOperation"
                        class="item__inner-amount-text item__inner-amount-text--small"
                    >
                        {{ data.token?.name }}
                    </span>
                    <template v-else-if="data.fiat">
                        {{ getCurrencySymbol(data.fiat.currency) }}
                    </template>
                </p>
            </div>
            <icon-chevron class="item__inner-chevron" />
        </div>
    </div>
</template>

<script lang="ts">
    import type { PropType } from 'vue'
    import type { IWalletHistoryOperation } from '@/shared/api/types/Wallet.interface'
    import { defineComponent } from '#imports'

    import dayjs from 'dayjs'

    import { useCurrencyStore } from '@/stores/currency'

    import IconChevron from '@/assets/icons/chevron.svg?component'
    import IconPlus from '@/assets/icons/plus.svg?component'
    import IconExchange from '@/assets/icons/exchange.svg?component'
    import IconUpload from '@/assets/icons/upload.svg?component'

    export default defineComponent({
        components: { IconChevron },
        props: {
            data: {
                type: Object as PropType<IWalletHistoryOperation>,
                default: () => {}
            }
        },
        setup (props) {
            const { getCurrencySymbol } = useCurrencyStore()

            const date = computed(() => dayjs(props.data.created_at).format('DD.MM.YYYY'))
            const isCryptoOperation = computed(() => props.data.token !== null)

            const isDeposit = computed(() => {
                return props.data.operation_type === 'deposit_fiat'
                    || props.data.operation_type === 'deposit_crypto'
            })

            const operationTypeData = computed(() => {
                switch (props.data.operation_type) {
                    case 'deposit_fiat':
                    case 'deposit_crypto':
                        return { icon: IconPlus, text: 'Deposit' }
                    case 'convert':
                        return { icon: IconExchange, text: 'Convert' }
                    case 'withdraw_fiat':
                    case 'withdraw_crypto':
                        return { icon: IconUpload, text: 'Withdrawal' }
                }
            })

            return {
                date,
                isCryptoOperation,
                isDeposit,
                operationTypeData,
                getCurrencySymbol
            }
        }
    })
</script>

<style lang="scss" scoped>
    @import '@/assets/scss/variables';
    @import '@/assets/scss/utils';

    .item {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        padding: px-to-rem(10);
        background-color: transparent;
        border-radius: px-to-rem(10);
        transition: background-color .15s ease-in-out;
        cursor: pointer;

        &:hover {
            background-color: $color-grey-light;
        }

        &__inner {
            display: flex;
            align-items: center;
            gap: px-to-rem(16);
        }

        &__inner-type {
            display: flex;
            align-items: center;
            justify-content: center;
            width: px-to-rem(36);
            height: px-to-rem(36);
            background-color: $color-grey-light;
            border-radius: 50%;
        }

        &__inner-type-icon {
            width: px-to-rem(20);
            height: auto;
            fill: $color-black;
            stroke: $color-black;
        }

        &__inner-description {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            height: 100%;
        }

        &__inner-description-type {
            font-size: px-to-rem(14);
            font-weight: 700;
        }

        &__inner-description-status {
            text-transform: capitalize;
            font-size: px-to-rem(12);
            font-weight: 600;

            &--pending,
            &--processing {
                color: #E48C08;
            }

            &--expired,
            &--failed,
            &--canceled {
                color: $color-red;
            }
        }

        &__inner-description-date {
            color: $color-grey-dark;
            font-size: px-to-rem(12);
            font-weight: 600;
        }

        &__inner-amount {
            display: flex;
            flex-direction: column;
            gap: px-to-rem(2);
        }

        &__inner-amount-text {
            font-size: px-to-rem(15);
            font-weight: 700;

            &--small {
                font-size: px-to-rem(11);
                font-weight: 600;
            }
        }

        &__inner-chevron {
            width: px-to-rem(16);
            height: auto;
            stroke: $color-grey-dark;
        }
    }
</style>
