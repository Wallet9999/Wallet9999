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
                    <token-selector-modals-tokens-item
                        v-for="token in tokensPaginated"
                        class="modal__body-list-item"
                        :data="token"
                        :key="token.id"
                        @click="onSelect(token.symbol)"
                    />
                </div>
                <app-pagination
                    v-if="tokensFiltered.length > limit"
                    class="modal__body-pagination"
                    :current="currentPage"
                    :page-items="limit"
                    :total-items="tokensFiltered.length"
                    @on-change="onPageChange"
                />
            </div>
        </app-modal-sheet>
    </teleport>
</template>

<script lang="ts">
    import type { TokenOption } from '@/components/ui/TokenSelector/index.vue'
    import { defineComponent } from '#imports'

    import IconSearch from '@/assets/icons/search.svg?component'

    export default defineComponent({
        components: { IconSearch },
        emits: [ 'on-select' ],
        setup (_props, { emit, expose }) {
            const visible = ref(false)
            const tokens = ref<TokenOption[]>([])
            const search = ref('')
            const currentPage = ref(1)
            const limit = 3

            const tokensFiltered = computed(() => {
                if (!search.value) return tokens.value

                return tokens.value.filter((el) => {
                    const query = search.value.toLowerCase()

                    return el.name.toLowerCase().includes(query)
                        || el.symbol.toLowerCase().includes(query)
                })
            })

            const tokensPaginated = computed(() => {
                return tokensFiltered.value.slice(
                    (currentPage.value - 1) * limit,
                    ((currentPage.value - 1) * limit) + limit
                )
            })

            const open = (options: TokenOption[]) => {
                tokens.value = options
                visible.value = true
            }

            const close = () => {
                visible.value = false
            }

            const onSelect = (symbol: string) => {
                emit('on-select', symbol)

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
                tokensFiltered,
                tokensPaginated,
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
