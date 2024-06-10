<template>
    <div
        v-if="user.data"
        class="form"
    >
        <div class="form__inner-arrow">
            <icon-arrow class="form__inner-arrow-icon" />
        </div>
        <div class="form__inner">
            <currency-selector
                writable
                balances-only
                :default-currency="user.data.currency"
                :balance="user.data.usd_balance"
                :amount="amount"
                @on-input-focus="onFocus"
                @on-change-currency="(value: string) => form.currency = value"
            />
            <app-input
                v-model="form.firstName"
                placeholder="First name"
            />
            <app-input
                v-model="form.lastName"
                placeholder="Last name"
            />
            <app-input
                v-model="form.iban"
                placeholder="IBAN or Card"
            />
            <app-input
                v-model="form.bank"
                placeholder="Bank name"
            />
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from '#imports'

    import { useUserStore } from '@/stores/user'

    import IconArrow from '@/assets/icons/arrow.svg?component'

    export default defineComponent({
        components: { IconArrow },
        props: {
            amount: {
                type: String,
                default: ''
            }
        },
        emits: [
            'on-input-focus',
            'on-form-change'
        ],
        setup (_props, { emit }) {
            const user = useUserStore()
            const form = reactive({
                currency: '',
                firstName: '',
                lastName: '',
                iban: '',
                bank: ''
            })

            const onFocus = () => {
                emit('on-input-focus')
            }

            watch(() => form, () => {
                emit('on-form-change', {
                    currency: form.currency,
                    firstName: form.firstName,
                    lastName: form.lastName,
                    iban: form.iban,
                    bank: form.bank
                })
            }, { deep: true })

            return {
                user,
                form,
                onFocus
            }
        }
    })
</script>

<style lang="scss" scoped>
    @import '@/assets/scss/variables';
    @import '@/assets/scss/utils';

    .form {
        width: 100%;

        &__inner {
            position: relative;
            display: flex;
            flex-direction: column;
            gap: px-to-rem(8);
        }

        &__inner-arrow {
            position: absolute;
            top: px-to-rem(86);
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

        &__inner-arrow-icon {
            width: px-to-rem(24);
            height: auto;
            stroke: $color-blue;
            transform: rotate(180deg);
        }
    }
</style>
