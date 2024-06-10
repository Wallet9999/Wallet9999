<script setup lang="ts">
    import type ModalNumpad from '@/components/modals/Numpad/index.vue'
    import type { IWalletBalance } from '@/shared/api/types/Wallet.interface'

    import { useUserStore } from '@/stores/user'
    import { useWallet } from '@/composables/useWallet'
    import { useBus } from '@/composables/useBus'

    import IconArrow from '@/assets/icons/arrow.svg?component'
    import IconConfirm from '@/assets/icons/confirm.svg?component'

    import StreamBarcodeReader from '@/components/scanner/index.vue';

    const scannerActive = ref(false)

    const onLoaded = () => {
        console.log("loaded");
    };

    const onDecode = (text: string) => {
        form.address = text;
        scannerActive.value = false; // Останавливаем сканирование
    };

    const compModalNumpad = ref<InstanceType<typeof ModalNumpad>>()

    const { emitter } = useBus()
    const user = useUserStore()
    const wallet = useWallet()
    const route = useRoute()
    const token = ref<IWalletBalance | null>(null)
    const tokenId = typeof route.params.token === 'string' && route.params.token.trim() !== ''
        ? route.params.token
        : null

    const loading = ref(false)
    const form = reactive({
        amount: '',
        address: '',
        // fee: ''
    })

    const valid = computed(() => {
        if (!user.balances || tokenId === null || !token.value) return false

        return (form.amount.length !== 0 && parseFloat(form.amount) !== 0)
            && form.address.length !== 0
    })

    const onPageError = () => {
        return navigateTo('/', { redirectCode: 302 })
    }

    const onFocus = () => {
        compModalNumpad.value?.open()
    }

    const setAmount = (value: string) => {
        form.amount = value
    }

    const onWithdrawal = async () => {
        if (tokenId === null || !valid.value) return undefined

        loading.value = true

        try {
            await wallet.withdrawCrypto({
                currency_symbol: tokenId,
                amount: parseFloat(form.amount),
                address: form.address
            })

            // updating user balance and navigating back to main page
            await user.getUser()

            navigateTo('/')
            emitter.emit('openWithdrawalSuccess')
        } catch (err) {
            console.error(err)
        } finally {
            loading.value = false
        }
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

    const onTokenTitleArrowClick = () => {
        console.log('onTokenTitleArrowClick');
        scannerActive.value = !scannerActive.value;
    };

</script>

<template>
    <div class="token">
        <template v-if="token">
            <div class="token__title">
                <h6 id="token__title-text" class="token__title-text">
                    Send Tokens
                </h6>
                <div class="token__title-arrow">
                    <icon-arrow class="token__title-arrow-icon" />
                </div>
            </div>
            <div v-if="scannerActive" id="token__reader">
                <StreamBarcodeReader
                    @loaded="onLoaded"
                    @decode="onDecode"
                    style="overflow: hidden; border-radius: 13px; margin: 0 auto; max-width: 370px; max-height: 370px;"
                />
            </div>
            <div class="token__form">
                <div class="token__form-inner">
                    <div class="token__form-arrow">
                        <icon-arrow class="token__form-arrow-icon" />
                    </div>
                    <token-selector
                        unselectable
                        writable
                        :token-id="token.symbol"
                        :amount="form.amount"
                        @on-input-focus="onFocus"
                    />
                    <app-input
                        v-model="form.address"
                        placeholder="Address"
                    />
                    <!-- <app-input
                        v-model="form.fee"
                        placeholder="Fee"
                    /> -->
                    <div style="position: absolute; top: 102px; right: 6px; padding: 8px 10px 8px 6px; display: flex; justify-content: center; align-items: center; border-radius: 8px; background: #ffffff; border: 1px solid #eee;"
                    @click="onTokenTitleArrowClick">
                        <div v-if="!scannerActive" id="qr-open">
                            <svg style="width: 20px; height: 20px;">
                                <path stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="M4 4h6v6H4V4Zm10 10h6v6h-6v-6Zm0-10h6v6h-6V4Zm-4 10h.01v.01H10V14Zm0 4h.01v.01H10V18Zm-3 2h.01v.01H7V20Zm0-4h.01v.01H7V16Zm-3 2h.01v.01H4V18Zm0-4h.01v.01H4V14Z"/>
                                <path stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="M7 7h.01v.01H7V7Zm10 10h.01v.01H17V17Z"/>
                            </svg>
                        </div>
                        <div v-if="scannerActive" id="qr-close">
                            <svg class="w-[28px] h-[28px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.1" d="M6 18 17.94 6M18 18 6.06 6"/>
                            </svg>
                        </div>
                    </div>
                    <!-- <img src="" alt="QR" /> -->
                </div>
                <app-button
                    wide
                    class="token__form-button"
                    :loading="loading"
                    :disabled="!valid"
                    @on-click="onWithdrawal"
                >
                    <icon-confirm class="token__form-button-icon" />
                    Confirm Withdrawal
                </app-button>
            </div>
        </template>
        <modals-numpad
            ref="compModalNumpad"
            :scale="6"
            @on-change-value="setAmount"
        />
    </div>
</template>

<style lang="scss" scoped>
    @import '@/assets/scss/variables';
    @import '@/assets/scss/utils';

    .token {
        position: relative;
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        gap: px-to-rem(16);
        width: 100%;
        padding: px-to-rem(20);

        &__title {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: px-to-rem(20);
        }

        &__title-text {
            color: $color-black;
            font-size: px-to-rem(18);
            font-weight: 700;
        }

        &__title-arrow {
            display: flex;
            align-items: center;
            justify-content: center;
            width: px-to-rem(36);
            height: px-to-rem(36);
            background-color: $color-grey-light;
            border-radius: 50%;
        }

        &__title-arrow-icon {
            width: px-to-rem(24);
            height: auto;
            stroke: $color-blue;
            transform: rotate(45deg);
        }

        &__form {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            flex-grow: 1;
        }

        &__form-inner {
            position: relative;
            display: flex;
            flex-direction: column;
            gap: px-to-rem(8);
            width: 100%;
        }

        &__form-arrow {
            position: absolute;
            top: px-to-rem(77);
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            align-items: center;
            justify-content: center;
            width: px-to-rem(34);
            height: px-to-rem(34);
            background-color: $color-white;
            border-radius: 50%;
            z-index: 2;
        }

        &__form-arrow-icon {
            width: px-to-rem(24);
            height: auto;
            stroke: $color-blue;
            transform: rotate(180deg);
        }

        &__form-button {
            width: 100%;
        }

        &__form-button-icon {
            width: px-to-rem(24);
            height: auto;
        }
    }
</style>
