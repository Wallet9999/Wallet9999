<template>
    <div class="convert">
        <div
            v-if="user.data"
            class="convert__form"
        >
            <div class="convert__form-inner">
                <token-selector
                    writable
                    :amount="form.send.value"
                    @on-input-focus="onFocus('send')"
                    @on-change="(value: string) => form.send.currency = value"
                />
                <currency-selector
                    writable
                    balances-only
                    :default-currency="user.data?.currency"
                    :balance="user.data?.usd_balance"
                    :amount="form.receive.value"
                    @on-input-focus="onFocus('receive')"
                    @on-change-currency="(value: string) => form.receive.currency = value"
                />
                <div class="convert__form-arrow">
                    <icon-arrow class="convert__form-arrow-icon" />
                </div>
            </div>
            <div class="convert__form-numpad">
                <app-numpad
                    v-if="lastEdited === 'send'"
                    v-model="form.send.value"
                    :scale="6"
                />
                <app-numpad
                    v-else-if="lastEdited === 'receive'"
                    v-model="form.receive.value"
                />
            </div>
            <app-button
                wide
                class="convert__form-button"
                :loading="loading"
                :disabled="!valid"
                @on-click="onConvert"
            >
                Continue
            </app-button>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { useUserStore } from '@/stores/user'
    import { useCurrencyStore } from '@/stores/currency'
    import { useWallet } from '@/composables/useWallet'
    import { useBus } from '@/composables/useBus'

    import IconArrow from '@/assets/icons/arrow.svg?component'

    type FormField = 'send' | 'receive'

    interface FormValues {
        currency: string
        value: string
    }

    type FormItem = {
        [key in FormField]: FormValues
    }

    const { emitter } = useBus()
    const { getCurrencyRate, convertCurrency } = useCurrencyStore()
    const user = useUserStore()
    const wallet = useWallet()
    const loading = ref(false)
    const lastEdited = ref<FormField>('send')
    const form = reactive<FormItem>({
        send: {
            currency: '',
            value: ''
        },
        receive: {
            currency: '',
            value: ''
        }
    })

    const valid = computed(() => {
        if (!form.send.currency || !form.send.value || !form.receive.currency || !form.receive.value) return false

        const userBalance = user.balances?.balances.find(el => el.symbol === form.send.currency)?.amount || '0'

        return parseFloat(form.send.value) <= parseFloat(userBalance)
    })

    const onFocus = (target: FormField) => {
        lastEdited.value = target
    }

    const onConvert = async () => {
        if (!valid.value) return undefined

        loading.value = true

        try {
            await wallet.convertCryptoToFiat({
                crypto_symbol: form.send.currency,
                fiat_symbol: form.receive.currency,
                amount: parseFloat(form.send.value)
            })

            // updating user balance and navigating back to main page
            await user.getUser()

            navigateTo('/')
            emitter.emit('openConversionSuccess')
        } catch (err) {
            console.error(err)
        } finally {
            loading.value = false
        }
    }

    const calculateValues = () => {
        if (!user.data || !user.balances) return undefined
        if (!form.send.value && !form.receive.value) {
            form.send.value = ''
            form.receive.value = ''

            return undefined
        }

        const sendRate = user.balances.balances.find(el => el.symbol === form.send.currency)?.usd_rate || 1
        const receiveRate = getCurrencyRate(form.receive.currency) || 1

        return lastEdited.value === 'send'
            ? form.receive.value = (parseFloat(form.send.value || '0') * sendRate * receiveRate).toFixed(2)
            : form.send.value = (parseFloat(form.receive.value || '0') / receiveRate).toFixed(6)
    }

    watch(() => form, () => {
        calculateValues()
    }, { deep: true })

    onMounted(async () => {
        if (user.balances !== null) return undefined

        await user.getBalances()
    })
</script>

<style lang="scss" scoped>
    @import '@/assets/scss/variables';
    @import '@/assets/scss/utils';

    .convert {
        position: relative;
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        padding: px-to-rem(20) px-to-rem(20) 0;

        &__form {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            flex-grow: 1;
            gap: px-to-rem(32);
        }

        &__form-inner {
            position: relative;
            display: flex;
            flex-direction: column;
            gap: px-to-rem(8);
        }

        &__form-arrow {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
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

        &__form-numpad {
            width: 100%;
        }

        &__form-button {
            width: 100%;
        }
    }
</style>
