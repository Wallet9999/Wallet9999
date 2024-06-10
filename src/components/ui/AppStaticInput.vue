<template>
    <div class="app-static-input">
        <input
            readonly
            type="text"
            role="presentation"
            autocomplete="off"
            aria-autocomplete="none"
            class="app-static-input__element"
            :value="value"
            :placeholder="placeholder"
            @click="handleClick"
        />
    </div>
</template>

<script lang="ts">
    import { defineComponent } from '#imports'

    export default defineComponent({
        props: {
            value: {
                type: String,
                default: null
            },
            placeholder: {
                type: String,
                default: ''
            }
        },
        emits: [ 'on-focus' ],
        setup (_props, { emit }) {
            const handleClick = (event: MouseEvent) => {
                emit('on-focus', event)
            }

            return {
                handleClick
            }
        }
    })
</script>

<style lang="scss" scoped>
    @import '@/assets/scss/variables';
    @import '@/assets/scss/utils';

    .app-static-input {
        position: relative;
        width: 100%;
        height: px-to-rem(24);

        &__element {
            appearance: none;
            width: 100%;
            height: 100%;
            padding: 0;
            text-align: right;
            color: $color-black;
            font-size: px-to-rem(22);
            font-weight: 600;
            background-color: transparent;
            border: none;
            outline: none;
            box-shadow: none;

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
                color: $color-grey-dark;
            }
        }
    }
</style>
