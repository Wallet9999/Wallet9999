<template>
    <div
        :class="{
            'app-input': true,
            'app-input--readonly': readOnly,
            'app-input--disabled': disabled,
            'app-input--errors': errors.length
        }"
    >
        <div
            v-if="hasPrefix"
            class="app-input__prefix"
        >
            <slot name="prepend" />
        </div>
        <input
            ref="elInput"
            role="presentation"
            autocomplete="off"
            aria-autocomplete="none"
            :class="{
                'app-input__element': true,
                'app-input__element--disabled': disabled,
                'app-input__element--errors': errors.length
            }"
            :type="inputType"
            :value="modelValue"
            :disabled="disabled"
            :readonly="readOnly"
            :placeholder="placeholder"
            @focus="handleFocus"
            @blur="handleBlur"
            @input="handleInput"
        />
        <app-transition name="fade">
            <div
                v-if="type === 'password' && modelValue.length > 0"
                class="app-input__suffix"
            >
                <icon-show
                    v-if="passwordVisible"
                    class="app-input__suffix-icon"
                    @click="toggleModifiedType"
                />
                <icon-hide
                    v-else
                    class="app-input__suffix-icon"
                    @click="toggleModifiedType"
                />
            </div>
        </app-transition>
        <div
            v-if="hasSuffix"
            class="app-input__suffix"
        >
            <slot name="append" />
        </div>
        <div
            v-if="disabled || readOnly"
            :class="{
                'app-input__overlay': true,
                'app-input__overlay--readonly': readOnly
            }"
        />
    </div>
</template>

<script lang="ts">
    import type { PropType } from 'vue'
    import { defineComponent } from '#imports'

    import { propTypeValidator } from '@/utils/prop-validator'

    import IconHide from '@/assets/icons/eye-hide.svg?component'
    import IconShow from '@/assets/icons/eye-show.svg?component'

    export enum InputType {
        Text = 'text',
        Password = 'password',
        Number = 'number'
    }

    export default defineComponent({
        components: {
            IconHide,
            IconShow
        },
        props: {
            modelValue: {
                type: String,
                default: null
            },
            placeholder: {
                type: String,
                default: ''
            },
            autoFocus: {
                type: Boolean,
                default: false
            },
            readOnly: {
                type: Boolean,
                default: false
            },
            disabled: {
                type: Boolean,
                default: false
            },
            removable: {
                type: Boolean,
                default: false
            },
            type: {
                type: String as PropType<InputType | `${InputType}`>,
                default: InputType.Text,
                validator: (value: string) => propTypeValidator('type', value, Object.values(InputType))
            },
            errors: {
                type: Array as PropType<string[]>,
                default: () => []
            }
        },
        emits: [
            'update:modelValue',
            'on-input',
            'on-focus',
            'on-blur'
        ],
        setup (props, { emit, expose, slots }) {
            const elInput = ref<HTMLInputElement>()
            const toggledType = ref<InputType>(InputType.Password)
            const passwordVisible = ref(false)

            const hasPrefix = computed(() => slots.prepend !== undefined)
            const hasSuffix = computed(() => slots.append !== undefined)
            const inputType = computed(() => {
                return props.type === InputType.Password
                    ? toggledType.value
                    : props.type
            })

            const toggleModifiedType = () => {
                toggledType.value === InputType.Password
                    ? toggledType.value = InputType.Text
                    : toggledType.value = InputType.Password

                passwordVisible.value = !passwordVisible.value
            }

            const handleInput = (event: Event): void => {
                if (!event.target) return undefined

                const target = event.target as HTMLInputElement
                const value = props.type === 'number'
                    ? (parseInt(target.value, 10) || target.value)
                    : target.value.trim()

                emit('update:modelValue', value)
                emit('on-input', value)
            }

            //const handleAutoFocus = () => {
            //    if (!props.autoFocus) return undefined
            //
            //    elInput.value?.focus({ preventScroll: true })
            //}

            const handleFocus = (event: FocusEvent): void => {
                emit('on-focus', event)
            }

            const handleBlur = (event: FocusEvent): void => {
                emit('on-blur', event)
            }

            watch(() => props.modelValue, (value) => {
                if (props.type !== InputType.Password || toggledType.value === InputType.Password) return undefined
                if (value.length > 0) return undefined

                toggleModifiedType()
            })

            // onMounted(() => {
            //     handleAutoFocus()
            // })

            expose()

            return {
                elInput,
                toggledType,
                inputType,
                passwordVisible,
                hasPrefix,
                hasSuffix,
                handleInput,
                handleFocus,
                handleBlur,
                toggleModifiedType
            }
        }
    })
</script>

<style lang="scss">
    @use 'sass:color';

    @import '@/assets/scss/variables';
    @import '@/assets/scss/utils';

    .app-input {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: px-to-rem(48);
        color: $color-black;
        border: 1px solid $color-grey-light;
        background-color: $color-grey-light;
        border-radius: px-to-rem(12);
        transition: border-color .15s ease-in-out;

        &--errors {
            border-color: $color-red;
        }

        &:hover:not(#{&}--errors):not(#{&}--disabled):not(#{&}--readonly):not(:focus-within) {
            border-color: color.adjust(#BAC2CD, $lightness: 10%);
        }

        &:focus-within:not(#{&}--errors) {
            border-color: #BAC2CD;
        }

        &__element {
            appearance: none;
            width: 100%;
            height: 100%;
            padding: 0 px-to-rem(16);
            color: inherit;
            font-size: px-to-rem(16);
            font-weight: 600;
            background-color: transparent;
            border: 0;
            outline: none;

            &:hover,
            &:focus,
            &::-webkit-outer-spin-button,
            &::-webkit-inner-spin-button {
                appearance: none;
                -webkit-appearance: none;
            }

            &:hover {
                outline: none !important;
            }

            &::placeholder {
                color: rgba(0, 0, 0, .25);
            }
        }

        &__prefix,
        &__suffix {
            align-items: center;
            display: flex;
            height: 100%;
        }

        &__prefix {
            padding-left: px-to-rem(16);
        }

        &__suffix {
            padding-right: px-to-rem(16);
        }

        &__suffix-icon {
            width: px-to-rem(20);
            height: auto;
            stroke: $color-grey-dark;
            transition: stroke .15s ease-in-out;
            cursor: pointer;

            &:hover {
                stroke: $color-grey;
            }
        }

        &__overlay {
            position: absolute;
            left: -1px;
            top: -1px;
            right: -1px;
            bottom: -1px;
            background-color: #000;
            border-radius: px-to-rem(12);
            transition: opacity .15s ease-in-out;
            opacity: .25;
            z-index: 2;

            &--readonly {
                opacity: 0;
            }
        }
    }
</style>
