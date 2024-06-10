<template>
    <teleport to="body">
        <app-modal-sheet v-model="visible">
            <template #header>
                <p>Deposit Tokens</p>
            </template>
            <div class="modal__body">
                <token-selector
                    :token-id="tokenId"
                    @on-change="(value: string) => selectedToken = value"
                />
                <blockchain-selector
                    ref="compBlockchainSelector"
                    :data="blockchains"
                    :disabled="!selectedToken"
                    :loading="networkLoading"
                    @on-change="onChangeNetworkId"
                />
                <div class="modal__body-qr">
                    <vue-qrcode
                        v-if="deposit.address"
                        tag="svg"
                        class="modal__body-qr-image"
                        :value="deposit.address.address"
                    />
                    <p
                        v-else
                        class="modal__body-qr-text"
                    >
                        QR
                    </p>
                </div>
                <div
                    v-if="deposit.address !== null"
                    class="modal__body-address"
                >
                    <p class="modal__body-address-text">
                        {{ deposit.address?.address }}
                    </p>
                    <div class="modal__body-address-divider" />
                    <div
                        class="modal__body-address-button"
                        @click="copy.copy(deposit.address.address)"
                    >
                        <icon-copy class="modal__body-address-button-icon" />
                        Click to Copy
                    </div>
                </div>
            </div>
            <template #footer>
                <div class="modal__footer">
                    <app-button
                        wide
                        @on-click="close"
                    >
                        Go home
                    </app-button>
                </div>
            </template>
        </app-modal-sheet>
    </teleport>
</template>

<script lang="ts">
    import type BlockchainSelector from '@/components/ui/BlockchainSelector/index.vue'

    import type { IResponseBlockchain } from '@/shared/api/types/Deposit.interface'
    import { defineComponent } from '#imports'

    import { useDepositStore } from '@/stores/deposit'
    import { useUserStore } from '@/stores/user'
    import { useCopyText } from '@/composables/useCopyText'

    import VueQrcode from '@chenfengyuan/vue-qrcode'

    import IconDeposit from '@/assets/icons/deposit.svg?component'
    import IconCopy from '@/assets/icons/copy.svg?component'

    export default defineComponent({
        components: {
            VueQrcode,
            IconDeposit,
            IconCopy
        },
        setup (_props, { expose }) {
            const compBlockchainSelector = ref<InstanceType<typeof BlockchainSelector>>()
            const deposit = useDepositStore()
            const user = useUserStore()
            const copy = useCopyText()
            const visible = ref(false)
            const tokenId = ref('')
            const selectedToken = ref('')
            const networkId = ref('')
            const networkLoading = ref(false)
            const blockchains = ref<IResponseBlockchain[]>([])

            const open = (token: string | void): void => {
                if (token) tokenId.value = token
                visible.value = true
            }

            const close = async (): Promise<void> => {
                visible.value = false
            }

            const onChangeNetworkId = async (id: string) => {
                networkId.value = id

                if (!networkId.value) return undefined

                deposit.setNetworkId(networkId.value)
                await deposit.getAddress()
            }

            const getBlockchains = async () => {
                if (!selectedToken.value) return undefined

                networkLoading.value = true

                try {
                    const response = await deposit.getTokenBlockchains(selectedToken.value)

                    blockchains.value = response.blockchains
                } catch (err) {
                    console.log(err)
                } finally {
                    networkLoading.value = false
                }
            }

            watch(() => selectedToken.value, async () => {
                compBlockchainSelector.value?.clear()
                networkId.value = ''
                deposit.address = null

                await getBlockchains()
            })

            watch(() => visible.value, async (value) => {
                if (value) return undefined

                tokenId.value = ''
                deposit.reset()
                await user.getUser()
            })

            expose({ open, close })

            return {
                compBlockchainSelector,
                deposit,
                copy,
                visible,
                tokenId,
                selectedToken,
                networkId,
                networkLoading,
                blockchains,
                open,
                close,
                onChangeNetworkId
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
            //...
        }

        &__body {
            display: flex;
            flex-direction: column;
            gap: px-to-rem(16);
        }

        &__body-qr {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: px-to-rem(250);
            background-color: $color-grey-light;
            border-radius: px-to-rem(16);
        }

        &__body-qr-image {
            width: px-to-rem(220);
            height: auto;
        }

        &__body-qr-text {
            color: $color-grey-dark;
            font-size: px-to-rem(22);
            font-weight: 700;
        }

        &__body-address {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: px-to-rem(8);
            width: 100%;
            padding: px-to-rem(12) 0;
            text-align: center;
            background-color: $color-grey-light;
            border-radius: px-to-rem(16);
        }

        &__body-address-text,
        &__body-address-button {
            padding: 0 px-to-rem(16);
        }

        &__body-address-text {
            max-width: 100%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            font-size: px-to-rem(14);
            font-weight: 700;
        }

        &__body-address-divider {
            width: 100%;
            height: px-to-rem(2);
            background-color: $color-white;
        }

        &__body-address-button {
            display: flex;
            align-items: center;
            gap: px-to-rem(8);
            color: $color-blue;
            font-size: px-to-rem(15);
            font-weight: 700;
            cursor: pointer;
        }

        &__body-address-button-icon {
            width: px-to-rem(16);
            height: auto;
            stroke: $color-blue;
        }

        &__footer {
            width: 100%;
        }
    }
</style>
