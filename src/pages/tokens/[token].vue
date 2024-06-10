<template>
    <div class="token">
        <template v-if="token">
            <div class="token__header">
                <nuxt-img
                    v-if="token.image"
                    format="webp"
                    width="80"
                    height="80"
                    class="token__header-image"
                    :src="token.image"
                    :alt="token.name"
                />
                <div class="token__header-text">
                    <p class="token__header-text-amount">
                        {{ parseFloat(token.amount).toFixed(6) }} {{ token.symbol }}
                    </p>
                    <p class="token__header-text-rate">
                        {{ getCurrencySymbol(currency) }}{{ convertCurrency(token.usd_rate, currency, 'USD')?.toFixed(2) }}
                    </p>
                </div>
            </div>
            <div class="token__buttons">
                <app-button
                    size="md"
                    class="token__buttons-item"
                    @on-click="onDeposit"
                >
                    Get
                </app-button>
                <app-button
                    size="md"
                    class="token__buttons-item"
                    @on-click="onSend"
                >
                    Send
                </app-button>
                <template v-if="isNexta">
                    <app-button
                        size="md"
                        class="token__buttons-item"
                        @on-click="onBuy"
                    >
                        Buy
                    </app-button>
                    <app-button
                        size="md"
                        class="token__buttons-item"
                        @on-click="onSend"
                    >
                        Stake
                    </app-button>
                </template>
                
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
    import type { IWalletBalance } from '@/shared/api/types/Wallet.interface'

    import { useUserStore } from '@/stores/user'
    import { useCurrencyStore } from '@/stores/currency'

    const {
        getCurrencySymbol,
        convertCurrency
    } = useCurrencyStore()
    const user = useUserStore()
    const { emitter } = useBus()
    const route = useRoute()
    const token = ref<IWalletBalance | null>(null)
    const tokenId = typeof route.params.token === 'string' && route.params.token.trim() !== ''
        ? route.params.token
        : null
    const isNexta = computed(() => route.params.token == 'nexta' || false)
    const buttonsNum = computed(() => isNexta.value ? 3 : 2)

    const currency = computed(() => user.data?.currency || 'USD')

    const onPageError = () => {
        return navigateTo('/', { redirectCode: 302 })
    }

    const onDeposit = () => {
        if (tokenId === null) return undefined

        emitter.emit('onDeposit', tokenId)
    }

    const onBuy = () => {
        if (tokenId === null) return undefined

        navigateTo('/buy')
    }

    const onSend = () => {
        if (tokenId === null) return undefined

        return navigateTo(`/send/${tokenId}`)
    }

    onMounted(async () => {
        if (tokenId === null) return onPageError()

        if (!user.balances) await user.getBalances()

        if (user.balances && user.balances.balances.some(el => el.symbol === tokenId && el.type !== 'fiat')) {
            const targetToken = user.balances.balances.filter(el => el.symbol === tokenId)[0]

            if (!targetToken) return onPageError()

            return token.value = targetToken
        }

        onPageError()
    })
</script>

<style lang="scss" scoped>
    @import '@/assets/scss/variables';
    @import '@/assets/scss/utils';

    .token {
        position: relative;
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        gap: px-to-rem(32);
        width: 100%;
        padding: px-to-rem(20);

        &__header {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: px-to-rem(20);
        }

        &__header-image {
            width: px-to-rem(80);
            height: px-to-rem(80);
        }

        &__header-text {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: px-to-rem(6);
        }

        &__header-text-amount {
            text-transform: uppercase;
            color: $color-black;
            font-size: px-to-rem(24);
            font-weight: 700;
        }

        &__header-text-rate {
            color: $color-blue;
            font-size: px-to-rem(14);
            font-weight: 600;
        }

        &__buttons {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: px-to-rem(10);
            align-items: stretch;
        }

        // &__buttons-item {
        //     width: calc((100% - px-to-rem(10)) / 2);
        // }

        &__buttons-item {
            flex: 1;
        }
    }
</style>
