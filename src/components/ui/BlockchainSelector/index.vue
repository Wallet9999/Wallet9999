<template>
    <div class="blockchain-selector">
        <div
            class="blockchain-selector__inner"
            @click="onOpenModal"
        >
            <div
                v-if="selected.length !== 0"
                class="blockchain-selector__inner-info"
            >
                <nuxt-img
                    format="webp"
                    width="24"
                    height="24"
                    class="blockchain-selector__inner-info-image"
                    :src="selected[0].image"
                    :alt="selected[0].name"
                />
                <p class="blockchain-selector__inner-info-name">
                    {{ selected[0].name }} | {{ selected[0].networkSymbol }}
                </p>
            </div>
            <p
                v-else
                class="blockchain-selector__inner-placeholder"
            >
                Select Blockchain
            </p>
            <icon-chevron
                v-if="!loading"
                class="blockchain-selector__inner-icon"
            />
            <icon-loading
                v-else
                class="blockchain-selector__inner-icon"
            />
        </div>
        <blockchain-selector-modals-blockchains
            ref="compModalBlockchains"
            @on-select="onSelectBlockchain"
        />
    </div>
</template>

<script lang="ts">
    import type ModalBlockchains from '@/components/ui/BlockchainSelector/modals/Blockchains/index.vue'

    import type { PropType } from 'vue'
    import type { IResponseBlockchain } from '@/shared/api/types/Deposit.interface'

    import {
        defineComponent,
        useNuxtApp
    } from '#imports'

    import IconChevron from '@/assets/icons/chevron.svg?component'
    import IconLoading from '@/assets/icons/loading.svg?component'

    export interface BlockchainOption {
        name: string
        image: string
        networkId: string
        networkSymbol: string
    }

    export default defineComponent({
        components: {
            IconChevron,
            IconLoading
        },
        props: {
            data: {
                type: Array as PropType<IResponseBlockchain[]>,
                default: () => []
            },
            loading: {
                type: Boolean,
                default: false
            },
            disabled: {
                type: Boolean,
                default: false
            }
        },
        emits: [ 'on-change' ],
        setup (props, { emit, expose }) {
            const compModalBlockchains = ref<InstanceType<typeof ModalBlockchains>>()
            const { $toast } = useNuxtApp()

            const options = computed<BlockchainOption[]>(() => {
                if (!props.data.length) return [] as BlockchainOption[]

                return props.data.map((el) => ({
                    name: el.name,
                    image: el.image_url,
                    networkId: el.networks.filter(network => !network.is_testnet)[0]?.id || '',
                    networkSymbol: el.network_symbol
                }))
            })
            const selected = ref<BlockchainOption[]>([])

            const onSelectBlockchain = (networkId: string) => {
                selected.value = options.value.filter(el => el.networkId === networkId)
            }

            const onOpenModal = () => {
                if (props.loading) return undefined
                if (props.disabled) {
                    $toast.error('Select token first')

                    return undefined
                }

                if (!options.value.length) {
                    $toast.error('No blockchains found')

                    return undefined
                }

                compModalBlockchains.value?.open(options.value)
            }

            const clear = () => {
                selected.value = []
            }

            watch(() => selected.value, (value) => {
                emit('on-change', value.length !== 0 ? value[0].networkId : '')
            })

            expose({ clear })

            return {
                compModalBlockchains,
                options,
                selected,
                clear,
                onOpenModal,
                onSelectBlockchain
            }
        }
    })
</script>

<style lang="scss" scoped>
    @import '@/assets/scss/variables';
    @import '@/assets/scss/utils';

    .blockchain-selector {
        position: relative;
        display: flex;
        align-items: center;
        width: 100%;
        height: px-to-rem(42);
        border: 1px solid $color-grey-dark;
        background-color: $color-grey-light;
        border-radius: px-to-rem(10);

        &__inner {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            padding: 0 px-to-rem(10);
            cursor: pointer;
        }

        &__inner-info {
            display: flex;
            align-items: center;
            gap: px-to-rem(8);
        }

        &__inner-info-image {
            width: px-to-rem(24);
            height: px-to-rem(24);
        }

        &__inner-info-name {
            text-transform: uppercase;
            color: $color-black;
            font-size: px-to-rem(14);
            font-weight: 700;
        }

        &__inner-icon {
            width: px-to-rem(20);
            height: auto;
            stroke: $color-black-light;
            transform: rotate(90deg);
        }

        &__inner-placeholder {
            color: $color-grey-dark;
            font-size: px-to-rem(14);
            font-weight: 600;
        }
    }
</style>
