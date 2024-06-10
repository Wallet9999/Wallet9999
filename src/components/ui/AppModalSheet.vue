<template>
    <app-transition name="modal-sheet">
        <div
            v-if="modelValue"
            class="app-modal"
            @mousedown.self="onClickOutside"
        >
            <div
                class="app-modal__block"
                :style="{
                    transform: touch.delta >= 0 ? `translateY(${touch.delta}px)` : undefined
                }"
            >
                <div
                    ref="elModal"
                    class="app-modal__block-inner"
                >
                    <div
                        class="app-modal__block-inner__swiper"
                        @touchstart="onTouchStart"
                        @touchmove="onTouchMove"
                        @touchend="onTouchEnd"
                    >
                        <div class="app-modal__block-inner__swiper-handler" />
                    </div>
                    <div
                        v-if="hasHeader"
                        class="app-modal__block-inner__header"
                    >
                        <slot name="header" />
                    </div>
                    <div class="app-modal__block-inner__body">
                        <slot />
                    </div>
                    <div
                        v-if="hasFooter"
                        class="app-modal__block-inner__footer"
                    >
                        <slot name="footer" />
                    </div>
                </div>
            </div>
        </div>
    </app-transition>
</template>

<script lang="ts">
    import { defineComponent } from '#imports'

    export default defineComponent({
        props: {
            modelValue: {
                type: Boolean,
                default: false
            },
            closable: {
                type: Boolean,
                default: true
            },
            closeOnClickOutside: {
                type: Boolean,
                default: false
            }
        },
        emits: [
            'update:modelValue',
            'on-show',
            'on-hide'
        ],
        setup (props, { emit, expose, slots }) {
            const elModal = ref<HTMLDivElement>()
            const touch = reactive({
                start: 0,
                end: 0,
                delta: 0
            })

            const hasHeader = computed(() => slots.header !== undefined && slots.header().length !== 0)
            const hasFooter = computed(() => slots.footer !== undefined && slots.footer().length !== 0)

            const show = () => {
                emit('update:modelValue', true)
            }

            const hide = () => {
                emit('update:modelValue', false)
            }

            const onClickOutside = () => {
                if (!props.closable || !props.closeOnClickOutside) return undefined

                hide()
            }

            const onTouchStart = (event: TouchEvent) => {
                touch.start = event.touches[0].clientY
            }

            const onTouchMove = (event: TouchEvent) => {
                touch.end = event.touches[0].clientY
                touch.delta = touch.end - touch.start
            }

            const onTouchEnd = () => {
                const modalHeight = elModal.value?.clientHeight
                const delta = (touch.delta / Number(modalHeight)) * 100

                if (delta >= 15) {
                    return hide()
                }

                touch.delta = 0
            }

            const resetTouch = () => {
                touch.start = 0
                touch.end = 0
                touch.delta = 0
            }

            const handleScrollable = (show: boolean) => {
                const classname = 'scroll-lock'

                if (show) {
                    document.body.classList.add(classname)
                    document.documentElement.classList.add(classname)
                } else {
                    document.body.classList.remove(classname)
                    document.documentElement.classList.remove(classname)
                }
            }

            watch(() => props.modelValue, (value) => {
                resetTouch()
                handleScrollable(value)

                return value
                    ? emit('on-show')
                    : emit('on-hide')
            })

            expose({ show, hide })

            return {
                elModal,
                touch,
                hasHeader,
                hasFooter,
                onClickOutside,
                onTouchStart,
                onTouchMove,
                onTouchEnd
            }
        }
    })
</script>

<style lang="scss">
    @import '@/assets/scss/variables';
    @import '@/assets/scss/utils';

    .app-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10;

        &__block {
            position: fixed;
            left: 0;
            right: 0;
            top: auto;
            bottom: 0;
            display: flex;
            flex-direction: column;
            width: 100%;
            background-color: $color-white;
            border-radius: px-to-rem(22) px-to-rem(22) 0 0;
            box-shadow: 0 px-to-rem(-20) px-to-rem(44) 0 rgba(54, 56, 83, .15);
            pointer-events: all;
            z-index: 11;
        }

        &__block-inner {
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            flex-grow: 1;
            width: 100%;
            height: 100%;
            padding: px-to-rem(56) px-to-rem(24) px-to-rem(30);

            &__swiper {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                display: flex;
                justify-content: center;
                padding: px-to-rem(20) 0;
            }

            &__swiper-handler {
                width: 25%;
                height: px-to-rem(6);
                background-color: $color-grey;
                border-radius: px-to-rem(100);
            }

            &__header {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                height: px-to-rem(52);
                min-height: px-to-rem(52);
                font-size: px-to-rem(15);
                font-weight: 700;
            }

            &__body {
                flex-grow: 1;
                width: 100%;
                padding-top: px-to-rem(10);
            }

            &__footer {
                width: 100%;
                padding-top: px-to-rem(30);
            }
        }
    }

    // transition
    .modal-sheet {
        // ...

        &__enter--active,
        &__leave--active {
            transition: transform .3s ease-in-out;
        }

        &__enter--from,
        &__leave--to {
            transform: translateY(100%);
        }
    }

    .app-modal__block-inner__swiper-handler {
        background-color: #F0AB26;
    }
</style>
