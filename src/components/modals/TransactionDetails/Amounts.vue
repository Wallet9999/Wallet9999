<template>
    <div
        v-if="data"
        class="amounts"
    >
        <p class="amounts__value">
            {{ isDeposit ? '+' : '-' }}
            {{ isCryptoOperation ? parseFloat(data.token?.amount || '0').toFixed(6) : parseFloat(data.fiat?.amount || '0').toFixed(2) }}
            {{ isCryptoOperation ? data.token?.name : getCurrencySymbol(data.fiat?.currency || '') }}
        </p>
        <p
            v-if="!isCryptoOperation"
            class="amounts__value amounts__value--small"
        >
            {{ data.usd_amount.toFixed(2) }}$
        </p>
    </div>
</template>

<script lang="ts">
    import type { PropType } from 'vue'
    import type { IWalletHistoryOperation } from '@/shared/api/types/Wallet.interface'
    import { defineComponent } from '#imports'

    import { useCurrencyStore } from '@/stores/currency'

    export default defineComponent({
        props: {
            data: {
                type: Object as PropType<IWalletHistoryOperation | null>,
                default: null
            }
        },
        setup (props) {
            const { getCurrencySymbol } = useCurrencyStore()

            const isCryptoOperation = computed(() => props.data?.token !== null)
            const isDeposit = computed(() => {
                return props.data?.operation_type === 'deposit_fiat'
                    || props.data?.operation_type === 'deposit_crypto'
            })

            return {
                isDeposit,
                isCryptoOperation,
                getCurrencySymbol
            }
        }
    })
</script>

<style lang="scss" scoped>
    @import '@/assets/scss/variables';
    @import '@/assets/scss/utils';

    .amounts {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: px-to-rem(10);

        &__value {
            color: $color-black-light;
            font-size: px-to-rem(24);
            font-weight: 700;

            &--small {
                font-size: px-to-rem(14);
                font-weight: 600;
            }
        }
    }
</style>
