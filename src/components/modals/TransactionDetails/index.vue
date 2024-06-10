<template>
    <teleport to="body">
        <app-modal-sheet v-model="visible">
            <template #header>
                <div class="modal__header">
                    <icon-clock class="modal__header-icon" />
                    <p>Transaction Details</p>
                </div>
            </template>
            <div class="modal__body">
                <modals-transaction-details-amounts :data="operation" />
                <modals-transaction-details-data :data="operation" />
            </div>
            <template #footer>
                <app-button
                    v-if="operation?.transaction?.explorer_link"
                    wide
                    color="black"
                    class="modal__footer-button"
                    target="_blank"
                    :href="operation.transaction.explorer_link"
                >
                    <icon-explorer class="modal__footer-button-icon" />
                    Explorer
                </app-button>
            </template>
        </app-modal-sheet>
    </teleport>
</template>

<script lang="ts">
    import type { IWalletHistoryOperation } from '@/shared/api/types/Wallet.interface'
    import { defineComponent } from '#imports'

    import IconClock from '@/assets/icons/clock.svg?component'
    import IconExplorer from '@/assets/icons/explorer.svg?component'

    export default defineComponent({
        components: {
            IconClock,
            IconExplorer
        },
        setup (_props, { expose }) {
            const visible = ref(false)
            const operation = ref<IWalletHistoryOperation | null>(null)

            const open = (data: IWalletHistoryOperation): void => {
                operation.value = data
                visible.value = true
            }

            const close = (): void => {
                visible.value = false
            }

            expose({ open, close })

            return {
                visible,
                operation,
                open,
                close
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
            gap: px-to-rem(24);
            width: 100%;
            height: 100%;
            min-height: 50vh;
        }

        &__footer-button {
            width: 100%;
        }

        &__footer-button-icon {
            width: px-to-rem(24);
            height: auto;
        }
    }
</style>
