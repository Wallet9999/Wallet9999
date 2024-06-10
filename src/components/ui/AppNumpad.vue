<template>
    <div class="app-numpad">
        <div class="app-numpad__container">
            <div
                v-for="item in numpad"
                class="app-numpad__container-item"
                :key="item"
            >
                <div
                    class="app-numpad__container-item-value"
                    @click="() => onInput(item)"
                >
                    {{ item }}
                </div>
            </div>
            <div class="app-numpad__container-item">
                <div
                    class="app-numpad__container-item-value app-numpad__container-item-value--icon"
                    @click="onDeleteCharacter"
                    @mousedown="onStartHold"
                    @mouseup="onTerminateHold"
                    @mouseleave="onTerminateHold"
                    @touchstart="onStartHold"
                    @touchend="onTerminateHold"
                    @touchmove="onTerminateHold"
                >
                    <icon-delete class="app-numpad__container-item-icon" />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from '#imports'

    import IconDelete from '@/assets/icons/delete.svg?component'

    export default defineComponent({
        components: { IconDelete },
        props: {
            modelValue: {
                type: String,
                default: ''
            },
            defaultValue: {
                type: String,
                default: '0.00'
            },
            scale: {
                type: Number,
                default: 2
            }
        },
        emits: [
            'update:modelValue',
            'on-input',
            'on-delete'
        ],
        setup (props, { emit, expose }) {
            const dot = '.'
            const numpad = [ '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0' ]
            const isHoldingDelete = ref(false)
            const holdTimeout = ref<ReturnType<typeof setTimeout> | null>(null)

            const onInput = (value: string): void => {
                if (props.modelValue === props.defaultValue && value !== dot) {
                    emit('update:modelValue', value)
                    emit('on-input', value)
                }

                if (value === dot && props.modelValue.includes(dot)) {
                    return undefined
                }

                const decimals = props.modelValue.split(dot)[1]
                if (decimals && decimals.length >= props.scale) {
                    return undefined
                }

                const newValue = props.modelValue + value
                emit('update:modelValue', newValue)
                emit('on-input', newValue)
            }

            const onDeleteCharacter = (): void => {
                const value = props.modelValue.slice(0, -1) || ''

                emit('update:modelValue', value)
            }

            const onDeleteValue = (): void => {
                emit('update:modelValue', props.defaultValue)
                emit('on-delete')
            }

            const onStartHold = (): void => {
                holdTimeout.value = setTimeout(() => {
                    isHoldingDelete.value  = true

                    // deleting the whole value if user holds the delete button
                    onDeleteValue()
                }, 1000)
            }

            const onTerminateHold = (): void => {
                if (holdTimeout.value !== null) {
                    clearTimeout(holdTimeout.value)
                    holdTimeout.value = null
                }

                isHoldingDelete.value = false
            }

            expose()

            return {
                numpad,
                onInput,
                onDeleteCharacter,
                onDeleteValue,
                onStartHold,
                onTerminateHold
            }
        }
    })
</script>

<style lang="scss" scoped>
    @import '@/assets/scss/variables';
    @import '@/assets/scss/utils';

    .app-numpad {
        position: relative;
        width: 100%;
        user-select: none;

        &__container {
            display: grid;
            grid-template-columns: repeat(12, 1fr);
            gap: px-to-rem(12);
        }

        &__container-item {
            display: flex;
            align-items: center;
            justify-content: center;
            grid-column-start: span 4;
            grid-column-end: span 4;
        }

        &__container-item-value {
            display: flex;
            align-items: center;
            justify-content: center;
            width: px-to-rem(68);
            height: px-to-rem(68);
            color: $color-black;
            font-size: px-to-rem(22);
            font-weight: 600;
            background-color: transparent;
            border-radius: 50%;
            transition: background-color .15s ease-in-out;
            cursor: pointer;

            &:hover,
            &:active {
                background-color: $color-grey;
            }

            &--icon {
                width: px-to-rem(54);
                height: px-to-rem(48);
                border-radius: px-to-rem(10);
            }
        }

        &__container-item-icon {
            width: px-to-rem(24);
            height: auto;
            fill: $color-black;
        }
    }
</style>
