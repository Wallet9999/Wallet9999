<template>
    <teleport to="body">
        <app-modal-sheet v-model="visible">
            <template #header>
                <div class="modal__header">
                    <icon-deposit class="modal__header-icon" />
                    Choose Currency
                </div>
            </template>
            <div class="modal__body">
                <!--trick to handle autofocus-->
                <template v-if="visible">
                    <app-input
                        v-model="search"
                        auto-focus
                        class="modal__body-input"
                        placeholder="Currency"
                    >
                        <template #prepend>
                            <icon-search class="modal__body-input-icon" />
                        </template>
                    </app-input>
                </template>
                <div class="modal__body-list">
                    <template v-if="balancesOnly">
                        <modals-currency-item
                            v-for="item in balancesPaginated"
                            class="modal__body-list-item"
                            :currency="item.symbol"
                            :balance="balance"
                            :key="item.symbol"
                            @click="onSelect(item.symbol)"
                        />
                    </template>
                    <template v-else>
                        <modals-currency-item
                            v-for="currency in currenciesPaginated"
                            class="modal__body-list-item"
                            :currency="currency.short_code"
                            :balance="balance"
                            :key="currency.id"
                            @click="onSelect(currency.short_code)"
                        />
                    </template>
                </div>
                <app-pagination
                    class="modal__body-pagination"
                    :current="currentPage"
                    :page-items="limit"
                    :total-items="balancesOnly ? (balancesFiltered?.length || 0) : currenciesFiltered.length"
                    @on-change="onPageChange"
                />
            </div>
        </app-modal-sheet>
    </teleport>
</template>

<script lang="ts">
    import { defineComponent } from '#imports'

    import { useUserStore } from '@/stores/user'
    import { useCurrencyStore } from '@/stores/currency'

    import IconDeposit from '@/assets/icons/deposit.svg?component'
    import IconSearch from '@/assets/icons/search.svg?component'

    export default defineComponent({
        components: {
            IconDeposit,
            IconSearch
        },
        props: {
            balancesOnly: {
                type: Boolean,
                default: false
            }
        },
        emits: [ 'on-select' ],
        setup (props, { emit, expose }) {
            const user = useUserStore()
            const currency = useCurrencyStore()
            const visible = ref(false)
            const balance = ref(0)
            const search = ref('')
            const currentPage = ref(1)
            const limit = 3

            const currenciesFiltered = computed(() => {
                if (!search.value) return currency.currencies

                return currency.currencies.filter(el => el.short_code.toLowerCase().includes(search.value.toLowerCase()))
            })

            const currenciesPaginated = computed(() => {
                return currenciesFiltered.value.slice(
                    (currentPage.value - 1) * limit,
                    ((currentPage.value - 1) * limit) + limit
                )
            })

            const balancesFiltered = computed(() => {
                if (!user.balances) return undefined

                const query = search.value.toLowerCase()

                return user.balances.balances.filter((el) => {
                    return (el.name.toLowerCase().includes(query) || el.symbol.toLowerCase().includes(query))
                        && el.type === 'fiat'
                })
            })

            const balancesPaginated = computed(() => {
                return balancesFiltered.value?.slice(
                    (currentPage.value - 1) * limit,
                    ((currentPage.value - 1) * limit) + limit
                )
            })

            const open = (value: number): void => {
                balance.value = value
                visible.value = true
            }

            const close = (): void => {
                visible.value = false
            }

            const reset = (): void => {
                balance.value = 0
                search.value = ''
            }

            const onSelect = (currencyCode: string) => {
                emit('on-select', currencyCode.toUpperCase())

                close()
            }

            const onPageChange = (value: number) => {
                currentPage.value = value
            }

            watch(visible, (value) => {
                if (value) return undefined

                reset()
            })

            expose({ open, close })

            return {
                visible,
                balance,
                search,
                currentPage,
                limit,
                currenciesFiltered,
                currenciesPaginated,
                balancesFiltered,
                balancesPaginated,
                open,
                close,
                onSelect,
                onPageChange
            }
        }
    })
</script>

<style lang="scss" scoped>
    @import '@/assets/scss/variables';
    @import '@/assets/scss/utils';

    .modal {
        //...

        &__header {
            display: flex;
            align-items: center;
            gap: px-to-rem(8);
        }

        &__header-icon {
            width: px-to-rem(24);
            height: auto;
        }

        &__body {
            display: flex;
            flex-direction: column;
            gap: px-to-rem(20);
        }

        &__body-input {
            width: 100%;
        }

        &__body-input-icon {
            width: px-to-rem(24);
            height: auto;
        }

        &__body-list {
            display: flex;
            flex-direction: column;
            gap: px-to-rem(8);
            min-height: px-to-rem(286);
        }

        &__body-list-item {
            width: 100%;
        }

        &__body-pagination {
            display: flex;
            justify-content: center;
            width: 100%;
        }
    }
</style>
