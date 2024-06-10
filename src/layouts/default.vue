<template>
    <div id="__layout">
        <client-only>
            <div class="app">
                <div class="app__header">
                    <the-header @on-open-menu="onOpenMenu" />
                </div>
                <div class="content">
                    <slot />
                </div>
            </div>
            <modals-menu ref="compModalMenu" />
            <modals-deposit ref="compModalDeposit" />
            <modals-transaction-success ref="compModalTransaction" />
            <modals-fiat ref="compModalFiat" />
        </client-only>
    </div>
</template>

<script lang="ts">
    import type ModalMenu from '@/components/modals/Menu/index.vue'
    import type ModalDeposit from '@/components/modals/Deposit/index.vue'
    import type ModalTransactionSuccess from '@/components/pages/index/modals/TransactionSuccess.vue'
    import type ModalFiat from '@/components/modals/Fiat/index.vue'

    import { defineComponent } from '#imports'

    import { useAuthStore } from '@/stores/auth'
    import { useUserStore } from '@/stores/user'
    import { useCurrencyStore } from '@/stores/currency'

    export default defineComponent({
        setup (_props) {
            const compModalMenu = ref<InstanceType<typeof ModalMenu>>()
            const compModalDeposit = ref<InstanceType<typeof ModalDeposit>>()
            const compModalTransaction = ref<InstanceType<typeof ModalTransactionSuccess>>()
            const compModalFiat = ref<InstanceType<typeof ModalFiat>>()

            const { emitter } = useBus()
            const auth = useAuthStore()
            const { getUser } = useUserStore()
            const { initialize: getCurrency } = useCurrencyStore()

            const onOpenMenu = () => {
                compModalMenu.value?.open()
            }

            const onDeposit = (tokenId: string | void) => {
                compModalDeposit.value?.open(tokenId)
            }

            const onTransactionSuccess = (data: { title: string, image: string }) => {
                compModalTransaction.value?.open(data)
            }

            const onFiat = () => {
                compModalFiat.value?.open()
            }

            watch(() => auth.isAuthenticated, async (value) => {
                if (!value) return undefined

                await Promise.all([ getUser(), getCurrency() ])
            }, { immediate: true })

            onMounted(() => {
                emitter.on('onDeposit', (tokenId) => onDeposit(tokenId))

                emitter.on('openWithdrawalSuccess', () => {
                    onTransactionSuccess({
                        title: 'Withdrawal success',
                        image: 'credit-card'
                    })
                })

                emitter.on('openConversionSuccess', () => {
                    onTransactionSuccess({
                        title: 'Conversion success',
                        image: 'convert-success'
                    })
                })

                emitter.on('onFiat', () => onFiat())
            })

            onBeforeUnmount(() => {
                emitter.off('onDeposit')
                emitter.off('openWithdrawalSuccess')
                emitter.off('openConversionSuccess')
                emitter.off('onFiat')
            })

            return {
                compModalMenu,
                compModalDeposit,
                compModalTransaction,
                compModalFiat,
                onOpenMenu
            }
        }
    })
</script>

<style lang="scss" scoped>
    @import '@/assets/scss/variables';
    @import '@/assets/scss/utils';

    #__layout {
        display: flex;
        flex-direction: column;
    }

    .app {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow: hidden;

        &__header {
            width: 100%;
            height: px-to-rem(64);
        }
    }

    .content {
        position: relative;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        width: 100%;
    }
</style>
