<template>
    <teleport to="body">
        <app-modal-sheet
            v-model="visible"
            close-on-click-outside
        >
            <template #header>
                <p>Select Token</p>
            </template>
            <div class="modal__body">
                <!--trick to handle autofocus-->
                <template v-if="visible">
                    <app-input
                        v-model="search"
                        auto-focus
                        class="modal__body-input"
                        placeholder="Token"
                    >
                        <template #prepend>
                            <icon-search class="modal__body-input-icon" />
                        </template>
                    </app-input>
                </template>
                <div class="modal__body-list">
                    <blockchain-selector-modals-blockchains-item
                        v-for="blockchain in blockchainsPaginated"
                        class="modal__body-list-item"
                        :data="blockchain"
                        :key="blockchain.networkId"
                        @click="onSelect(blockchain.networkId)"
                    />
                </div>
                <app-pagination
                    v-if="blockchainsFiltered.length > limit"
                    class="modal__body-pagination"
                    :current="currentPage"
                    :page-items="limit"
                    :total-items="blockchainsFiltered.length"
                    @on-change="onPageChange"
                />
            </div>
        </app-modal-sheet>
    </teleport>
</template>

<script lang="ts">
    import type { BlockchainOption } from '@/components/ui/BlockchainSelector/index.vue'
    import { defineComponent } from '#imports'

    import IconSearch from '@/assets/icons/search.svg?component'

    export default defineComponent({
        components: { IconSearch },
        emits: [ 'on-select' ],
        setup (_props, { emit, expose }) {
            const visible = ref(false)
            const blockchains = ref<BlockchainOption[]>([])
            const search = ref('')
            const currentPage = ref(1)
            const limit = 3

            const blockchainsFiltered = computed(() => {
                if (!search.value) return blockchains.value

                return blockchains.value.filter((el) => {
                    const query = search.value.toLowerCase()

                    return el.name.toLowerCase().includes(query)
                        || el.networkSymbol.toLowerCase().includes(query)
                })
            })

            const blockchainsPaginated = computed(() => {
                return blockchainsFiltered.value.slice(
                    (currentPage.value - 1) * limit,
                    ((currentPage.value - 1) * limit) + limit
                )
            })

            const open = (options: BlockchainOption[]) => {
                blockchains.value = options
                visible.value = true
            }

            const close = () => {
                visible.value = false
            }

            const onSelect = (networkId: string) => {
                emit('on-select', networkId)

                close()
            }

            const onPageChange = (value: number) => {
                currentPage.value = value
            }

            expose({ open, close })

            return {
                visible,
                search,
                currentPage,
                limit,
                blockchainsFiltered,
                blockchainsPaginated,
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
            min-height: px-to-rem(232);
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
