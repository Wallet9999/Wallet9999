<template>
    <div class="tokens">
        <div class="tokens__header">
            <h6 class="tokens__header-title">
                My Balances
            </h6>
            <Search />
        </div>
        <div class="tokens__inner">
            <div
                v-if="loading"
                class="tokens__inner-loader"
            >
                <icon-loading class="tokens__inner-loader-icon" />
            </div>
            <widgets-tokens-placeholder v-else-if="!user.balances" />
            <div
                v-else
                class="tokens__inner-list"
            >
                <widgets-tokens-item
                    v-for="(item, index) in user.balances.balances"
                    :class="{
                        'tokens__inner-list-item': true,
                        'tokens__inner-list-item--crypto': item.type !== 'fiat'
                    }"
                    :data="item"
                    :key="index"
                    @click="onOpenTokenDetails(item)"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import type { IWalletBalance } from '@/shared/api/types/Wallet.interface'
    import { defineComponent } from '#imports'

    import { useUserStore } from '@/stores/user'

    import Search from '@/components/search/index.vue'

    import IconLoading from '@/assets/icons/loading.svg?component'

    export default defineComponent({
        components: { 
            IconLoading,
            Search
         },
        setup (_props) {
            const user = useUserStore()
            const loading = ref(false)

            const getUserBalances = async () => {
                loading.value = true

                try {
                    await user.getBalances()
                } catch (err) {
                    console.error(err)
                } finally {
                    loading.value = false
                }
            }

            const onOpenTokenDetails = (token: IWalletBalance) => {
                if (token.type === 'fiat') return undefined

                return navigateTo(`/tokens/${token.symbol}`)
            }

            onMounted(async () => {
                await getUserBalances()
            })

            return {
                user,
                loading,
                onOpenTokenDetails
            }
        }
    })
</script>

<style lang="scss" scoped>
    @import '@/assets/scss/variables';
    @import '@/assets/scss/utils';

    .tokens {
        position: relative;
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        gap: px-to-rem(16);
        width: 100%;
        padding: px-to-rem(20) px-to-rem(10);

        &__header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 px-to-rem(10);
        }

        &__header-title {
            color: $color-black-light;
            font-size: px-to-rem(15);
            font-weight: 700;
        }

        &__inner {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
        }

        &__inner-loader {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            flex-grow: 1;
        }

        &__inner-loader-icon {
            width: px-to-rem(42);
            height: auto;
            stroke: $color-grey-dark;
        }

        &__inner-list {
            display: flex;
            flex-direction: column;
            gap: px-to-rem(16);
            width: 100%;
        }

        &__inner-list-item {
            width: 100%;
            background-color: transparent;
            border-radius: px-to-rem(10);

            &--crypto {
                transition: background-color .15s ease-in-out;
                cursor: pointer;

                &:hover {
                    background-color: $color-grey-light;
                }
            }
        }
    }
</style>
