<template>
    <div
        v-if="data"
        class="data"
    >
        <div class="data__block">
            <div class="data__block-row">
                <p class="data__block-row-label">
                    Date
                </p>
                <p class="data__block-row-value">
                    {{ date }}
                </p>
            </div>
            <div class="data__block-row">
                <p class="data__block-row-label">
                    Status
                </p>
                <p
                    :class="{
                        'data__block-row-value': true,
                        'data__block-row-value--status': true,
                        ['data__block-row-value--' + data.status]: true
                    }"
                >
                    {{ data.status }}
                </p>
            </div>
            <div
                v-if="data.transaction?.sender_address"
                class="data__block-row"
            >
                <p class="data__block-row-label">
                    From
                </p>
                <p class="data__block-row-value">
                    {{ truncateString(data.transaction.sender_address) }}
                </p>
            </div>
        </div>
        <div
            v-if="data.fiat"
            class="data__block"
        >
            <div class="data__block-row">
                <p class="data__block-row-label">
                    Fee
                </p>
                <p class="data__block-row-value">
                    0{{ getCurrencySymbol(data.fiat.currency) }}
                </p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import type { PropType } from 'vue'
    import type { IWalletHistoryOperation } from '@/shared/api/types/Wallet.interface'
    import { defineComponent } from '#imports'

    import { useCurrencyStore } from '@/stores/currency'

    import dayjs from 'dayjs'

    export default defineComponent({
        props: {
            data: {
                type: Object as PropType<IWalletHistoryOperation | null>,
                default: null
            }
        },
        setup (props) {
            const { getCurrencySymbol } = useCurrencyStore()

            const date = computed(() => {
                if (!props.data) return undefined

                return dayjs(props.data.created_at).format('DD.MM.YYYY, HH:mm')
            })

            return {
                date,
                getCurrencySymbol
            }
        }
    })
</script>

<style lang="scss" scoped>
    @import '@/assets/scss/variables';
    @import '@/assets/scss/utils';

    .data {
        display: flex;
        flex-direction: column;
        gap: px-to-rem(12);
        width: 100%;

        &__block {
            display: flex;
            flex-direction: column;
            gap: px-to-rem(24);
            padding: px-to-rem(20);
            background-color: $color-grey-light;
            border-radius: px-to-rem(16);
        }

        &__block-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            color: $color-black-light;
            font-size: px-to-rem(15);
            font-weight: 600;
        }

        &__block-row-label {
            //...
        }

        &__block-row-value {
            font-weight: 700;

            &--status {
                text-transform: capitalize;
            }

            &--pending,
            &--processing {
                color: #E48C08;
            }

            &--completed {
                color: #199667;
            }

            &--expired,
            &--failed,
            &--canceled {
                color: $color-red;
            }
        }
    }
</style>
