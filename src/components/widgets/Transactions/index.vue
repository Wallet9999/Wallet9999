<template>
    <div class="transactions">
        <div
            v-if="loading"
            class="transactions__loader"
        >
            <icon-loading class="transactions__loader-icon" />
        </div>
        <widgets-transactions-placeholder
            v-else-if="!transactions || !transactions.total"
        />
        <template v-else>
            <div class="transactions__list">
                <widgets-transactions-item
                    v-for="item in transactions.operations"
                    class="transactions__list-item"
                    :data="item"
                    :key="item.id"
                    @click="() => onViewDetails(item)"
                />
            </div>
            <app-pagination
                v-if="transactions.total > limit"
                class="transactions__pagination"
                :current="page"
                :page-items="limit"
                :total-items="transactions.total"
                @on-change="onPageChange"
            />
        </template>
        <modals-transaction-details
            ref="compModalTransactionDetails"
        />
    </div>
</template>

<script lang="ts">
    import type ModalsTransactionDetails from '@/components/modals/TransactionDetails/index.vue'

    import type {
        IResponseWalletHistory,
        IWalletHistoryOperation
    } from '@/shared/api/types/Wallet.interface'
    import { defineComponent } from '#imports'

    import { useWallet } from '@/composables/useWallet'

    import IconLoading from '@/assets/icons/loading.svg?component'

    export default defineComponent({
        components: { IconLoading },
        setup (_props) {
            const compModalTransactionDetails = ref<InstanceType<typeof ModalsTransactionDetails>>()

            const wallet = useWallet()
            const transactions = ref<IResponseWalletHistory | null>(null)
            const loading = ref(false)
            const page = ref(1)
            const limit = ref(10)

            const onViewDetails = (operation: IWalletHistoryOperation) => {
                compModalTransactionDetails.value?.open(operation)
            }

            const onPageChange = async (value: number) => {
                page.value = value
                window.scrollTo(0, 0)

                await getWalletHistory()
            }

            const getWalletHistory = async () => {
                loading.value = true

                try {
                    transactions.value = await wallet.getWalletHistory({
                        page: page.value,
                        limit: limit.value
                    })
                } catch (err) {
                    console.error(err)
                } finally {
                    loading.value = false
                }
            }

            onMounted(async () => {
                await getWalletHistory()
            })

            return {
                compModalTransactionDetails,
                transactions,
                loading,
                page,
                limit,
                onViewDetails,
                onPageChange
            }
        }
    })
</script>

<style lang="scss" scoped>
    @import '@/assets/scss/variables';
    @import '@/assets/scss/utils';

    .transactions {
        position: relative;
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        width: 100%;
        padding: px-to-rem(20) px-to-rem(10);

        &__loader {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            flex-grow: 1;
        }

        &__loader-icon {
            width: px-to-rem(42);
            height: auto;
            stroke: $color-grey-dark;
        }

        &__list {
            display: flex;
            flex-direction: column;
            gap: px-to-rem(16);
            width: 100%;
        }

        &__list-item {
            width: 100%;
        }

        &__pagination {
            margin: px-to-rem(24) auto 0;
        }
    }
</style>
