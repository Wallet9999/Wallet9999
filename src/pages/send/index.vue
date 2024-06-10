<template>
    <div class="send">
        <div class="send__form">
            <div class="send__form-inner">
                <pages-send-form
                    :amount="form.amount"
                    @on-input-focus="onOpenModal"
                    @on-form-change="(value) => onFormChange(value)"
                />
                <pages-send-note />
            </div>
            <app-button
                wide
                class="send__form-button"
                :disabled="!valid"
                :loading="loading"
                @on-click="onClick"
            >
                <icon-confirm class="send__form-button-icon" />
                Confirm Withdrawal
            </app-button>
        </div>
        <modals-numpad
            ref="compModalNumpad"
            @on-change-value="setAmount"
        />
    </div>
</template>

<script setup lang="ts">
    import type ModalNumpad from '@/components/modals/Numpad/index.vue'

    import IconConfirm from '@/assets/icons/confirm.svg?component'

    import { useUserStore } from '@/stores/user'
    import { useCurrencyStore } from '@/stores/currency'
    import { useWallet } from '@/composables/useWallet'
    import { useBus } from '@/composables/useBus'

    const compModalNumpad = ref<InstanceType<typeof ModalNumpad>>()

    const { emitter } = useBus()
    const user = useUserStore()
    const wallet = useWallet()
    const { convertCurrency } = useCurrencyStore()

    const loading = ref(false)
    const form = reactive({
        currency: '',
        amount: '',
        name: '',
        iban: ''
    })

    const valid = computed(() => {
        if (!user.data) return false

        const numericAmount = parseFloat(form.amount || '0')
        const balance = user.balances?.balances.find(el => el.symbol.toLowerCase() === form.currency.toLowerCase())?.amount
        const numericBalance = parseFloat(balance || '0')

        return form.amount.length !== 0
            && !form.amount.endsWith('.')
            && numericAmount !== 0
            && numericAmount <= numericBalance
            && form.name.length >= 4
            && form.iban.length >= 12
    })

    const setAmount = (value: string) => {
        form.amount = value
    }

    const onFormChange = (data: { currency: string, name: string, iban: string }) => {
        form.currency = data.currency
        form.name = data.name
        form.iban = data.iban
    }

    const onOpenModal = () => {
        compModalNumpad.value?.open()
    }

    const onClick = async () => {
        if (!user.data) return undefined

        loading.value = true

        try {
            await wallet.withdrawFiat({
                fiat_currency: form.currency,
                person_name: form.name,
                iban: form.iban,
                amount: parseFloat(form.amount)
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
        if (user.balances !== null) return undefined

        await user.getBalances()
    })
</script>

<style lang="scss" scoped>
    @import '@/assets/scss/variables';
    @import '@/assets/scss/utils';

    .send {
        position: relative;
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        padding: px-to-rem(10) px-to-rem(20) 0;

        &__form {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding-bottom: 70px;
        }

        &__form-inner {
            display: flex;
            flex-direction: column;
            gap: px-to-rem(32);
        }

        &__form-button {
            width: 100%;
            color: white;
            margin-top: 20px;
        }

        &__form-button-icon {
            width: px-to-rem(24);
            height: auto;
        }
    }
</style>
