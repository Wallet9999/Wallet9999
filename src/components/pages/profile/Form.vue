<template>
    <div class="form">
        <div class="form__inner">
            <app-form-input
                v-if="user.data"
                label="Default currency"
            >
                <currency-selector
                    class="form__inner-currency"
                    :default-currency="user.data.currency"
                    :balance="user.data.usd_balance"
                    @on-change-currency="setCurrency"
                />
            </app-form-input>
            <app-form-input
                label="Username"
                :errors="form.username.errors"
            >
                <app-input
                    v-model="form.username.value"
                    class="form__inner-input"
                    placeholder="Enter your username"
                    :errors="form.username.errors"
                    @on-blur="() => validateFormField('username')"
                />
            </app-form-input>
            <app-form-input
                label="Phone number"
                :errors="form.phone.errors"
            >
                <app-input
                    v-model="form.phone.value"
                    class="form__inner-input"
                    placeholder="Enter your phone number"
                    :errors="form.phone.errors"
                    @on-blur="() => validateFormField('phone')"
                >
                    <template #append>
                        <country-flag
                            class="form__inner-input-flag"
                            :country-code="phoneFormatter?.getCountry()"
                        />
                    </template>
                </app-input>
            </app-form-input>
            <app-form-input label="Email">
                <app-input
                    v-model="email"
                    read-only
                    class="form__inner-input"
                />
            </app-form-input>
            <app-form-input label="Password">
                <app-input
                    v-model="password"
                    read-only
                    class="form__inner-input"
                />
            </app-form-input>
        </div>
        <app-button
            wide
            color="black"
            class="form__button"
            :loading="loading"
            :disabled="!valid"
            @on-click="onUpdateProfile"
        >
            Save changes
        </app-button>
    </div>
</template>

<script lang="ts">
    import type { CountryCode } from 'libphonenumber-js'
    import { defineComponent } from '#imports'

    import {
        parsePhoneNumber,
        AsYouType
    } from 'libphonenumber-js/max'

    import { useUserStore } from '@/stores/user'
    import { useCurrencyStore } from '@/stores/currency'

    import {
        EMAIL_REGEX,
        USERNAME_REGEX
    } from '@/data/constants'

    import IconChevron from '@/assets/icons/chevron.svg?component'

    type ProfileFormField = 'username' | 'phone'

    interface ProfileFormItem {
        value: string
        errors: string[]
    }

    type ProfileForm = {
        [key in ProfileFormField]: ProfileFormItem
    }

    export default defineComponent({
        components: { IconChevron },
        emits: [ 'on-select-currency' ],
        setup (_props, { emit }) {
            const user = useUserStore()
            const {
                convertCurrency,
                getCurrencyRate,
                getCurrencySymbol
            } = useCurrencyStore()

            const loading = ref(false)
            const currency = ref('')
            const email = ref('')
            const password = ref('')
            const form = reactive<ProfileForm>({
                username: {
                    value: '',
                    errors: []
                },
                phone: {
                    value: '',
                    errors: []
                }
            })

            const phoneFormatter = computed(() => {
                if (user.data === null) return undefined

                const formatted = new AsYouType(user.data.country_code as CountryCode)
                formatted.input(form.phone.value)

                return formatted
            })

            const selectedCurrency = computed(() => {
                return currency.value !== '' && currency.value !== user.data?.currency
                    ? currency.value
                    : user.data?.currency
            })

            const hasChanges = computed(() => {
                return (currency.value !== '' && currency.value !== user.data?.currency)
                    || form.username.value !== user.data?.username
                    || form.phone.value !== user.data?.phone
            })

            const valid = computed(() => {
                return hasChanges.value
                    && !form.username.errors.length
                    && (!form.phone.errors.length && phoneFormatter.value?.isValid())
            })

            const setCurrency = (value: string) => {
                currency.value = value
            }

            const setDefaultValues = () => {
                if (user.data === null) return undefined

                currency.value = user.data.currency
                email.value = user.data.email
                password.value = '*********'
                form.username.value = user.data.username
                form.phone.value = user.data.phone || ''
            }

            const validateFormField = (field: ProfileFormField) => {
                switch (field) {
                    case 'username':
                        return !form.username.value.match(USERNAME_REGEX)
                            ? form.username.errors = [ 'Invalid username' ]
                            : undefined
                    case 'phone':
                        return !phoneFormatter.value?.isValid()
                            ? form.phone.errors = [ 'Invalid phone number' ]
                            : undefined
                }
            }

            const onSelectCurrency = () => {
                emit('on-select-currency')
            }

            const onUpdateProfile = async () => {
                if (!valid.value || !phoneFormatter.value || !user.data) return undefined

                loading.value = true

                const internationalPhone = parsePhoneNumber(form.phone.value).formatInternational()

                try {
                    await user.changeUser({
                        country: phoneFormatter.value?.getCountry() || user.data.country_code,
                        currency: selectedCurrency.value || user.data.currency,
                        phone_number: internationalPhone || '',
                        username: form.username.value || user.data.username
                    })
                } catch (err) {
                    console.error(err)
                } finally {
                    loading.value = false
                }
            }

            const clearErrors = (field: ProfileFormField) => {
                watch(() => form[field].value, () => {
                    if (!form[field].errors.length) return undefined

                    form[field].errors = []
                })
            }

            clearErrors('username')
            clearErrors('phone')

            watch(() => user.data, (value) => {
                if (value === null) return undefined

                setDefaultValues()
            }, { immediate: true, deep: true })

            return {
                user,
                email,
                password,
                form,
                loading,
                phoneFormatter,
                selectedCurrency,
                valid,
                setCurrency,
                validateFormField,
                onSelectCurrency,
                onUpdateProfile,
                convertCurrency,
                getCurrencyRate,
                getCurrencySymbol
            }
        }
    })
</script>

<style lang="scss" scoped>
    @import '@/assets/scss/variables';
    @import '@/assets/scss/utils';

    .form {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: px-to-rem(24);
        padding: 0 px-to-rem(20);

        &__inner {
            display: flex;
            flex-direction: column;
            gap: px-to-rem(16);
            width: 100%;
        }

        &__inner-currency {
            //...
        }

        &__inner-input {
            width: 100%;
        }

        &__inner-input-flag {
            width: px-to-rem(30);
            height: auto;
        }

        &__button {
            width: 100%;
        }
    }
</style>
