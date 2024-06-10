<template>
    <div
        :class="{
            'app-tooltip': true,
            'app-tooltip__wrapper': true,
            ['app-tooltip__wrapper--' + vertical]: true,
            ['app-tooltip__wrapper--' + horizontal]: true
        }"
        @mouseenter="onToggle"
        @mouseleave="onToggle"
    >
        <div
            ref="elHandler"
            class="app-tooltip__handler"
            @mouseenter="onToggle(false)"
            @mouseleave="onToggle(false)"
            @click="onToggleMobile"
        >
            <slot name="handler" />
        </div>
        <div class="app-tooltip__content-wrapper">
            <app-transition name="fade">
                <div
                    v-if="visible"
                    ref="elTooltip"
                    class="app-tooltip__content"
                    :style="style"
                >
                    <div class="app-tooltip__content-inner">
                        <slot />
                    </div>
                </div>
            </app-transition>
        </div>
    </div>
</template>

<script lang="ts">
    import type {
        PropType,
        StyleValue
    } from 'vue'

    import { defineComponent } from '#imports'

    import mobileDetector from 'ismobilejs'

    import { propTypeValidator } from '@/utils/prop-validator'

    export enum TooltipPosition {
        Top = 'top',
        Bottom = 'bottom'
    }

    export enum TooltipAlign {
        Left = 'left',
        Center = 'center',
        Right = 'right'
    }

    export default defineComponent({
        props: {
            position: {
                type: String as PropType<TooltipPosition | `${TooltipPosition}`>,
                default: TooltipPosition.Top,
                validator: (value: string) => propTypeValidator('position', value, Object.values(TooltipPosition))
            },
            align: {
                type: String as PropType<TooltipAlign | `${TooltipAlign}`>,
                default: TooltipAlign.Center,
                validator: (value: string) => propTypeValidator('align', value, Object.values(TooltipAlign))
            },
            gap: {
                type: Number,
                default: 8
            },
            maxWidth: {
                type: Number,
                default: null
            },
            minWidth: {
                type: Number,
                default: null
            },
            hoverable: {
                type: Boolean,
                default: false
            }
        },
        emits: [
            'on-show',
            'on-hide'
        ],
        setup (props, { emit, expose }) {
            const elHandler = ref<HTMLElement>()
            const elTooltip = ref<HTMLElement>()
            const visible = ref(false)
            const isMobile = ref(false)
            const vertical = ref(props.position)
            const horizontal = ref(props.align)

            const style = computed<StyleValue>(() => ({
                padding: `${props.gap}px 0`,
                maxWidth: props.maxWidth ? `${props.maxWidth}px` : undefined,
                minWidth: props.minWidth ? `${props.minWidth}px` : undefined
            }))

            const isEnoughSpaceOnPosition = (position: TooltipPosition): boolean => {
                if (!visible.value || !elHandler.value || !elTooltip.value) return true

                const tooltipHeight = elTooltip.value?.offsetHeight
                const bottomGap = window.innerHeight - elHandler.value?.getBoundingClientRect().bottom
                const topGap = elHandler.value?.getBoundingClientRect().top

                switch (position) {
                    case TooltipPosition.Bottom:
                        return tooltipHeight < bottomGap
                    case TooltipPosition.Top:
                        return tooltipHeight < topGap
                    default:
                        return false
                }
            }

            const isEnoughSpaceOnAlign = (align: TooltipAlign) => {
                if (!visible.value || !elHandler.value || !elTooltip.value) return true

                const tooltipWidth = elTooltip.value?.offsetWidth
                const handlerWidth = elHandler.value?.offsetWidth
                const overflow = tooltipWidth - handlerWidth
                const leftGap = elHandler.value?.getBoundingClientRect().left - overflow
                const rightGap = (window.innerWidth - elHandler.value?.getBoundingClientRect().right) - overflow

                switch (align) {
                    case TooltipAlign.Left:
                        return tooltipWidth < rightGap
                    case TooltipAlign.Center:
                        return tooltipWidth - (overflow / 2) < leftGap
                            && tooltipWidth - (overflow / 2) < rightGap
                    case TooltipAlign.Right:
                        return tooltipWidth < leftGap
                    default:
                        return false
                }
            }

            const show = (): void => {
                visible.value = true
            }

            const hide = (): void => {
                visible.value = false
            }

            const toggle = () => {
                return visible.value
                    ? hide()
                    : show()
            }

            const onToggle = (root = true) => {
                if (isMobile.value) return undefined

                if ((root && props.hoverable) || (!root && !props.hoverable)) {
                    toggle()
                }
            }

            const onToggleMobile = () => {
                if (!isMobile.value) return undefined

                toggle()
            }

            watch(visible, (value) => {
                if (!value) return emit('on-hide')

                const verticals = Object.values(TooltipPosition)
                    .map(el => ({ position: el, available: isEnoughSpaceOnPosition(el) }))
                    .filter(el => el.available)

                const horizontals = Object.values(TooltipAlign)
                    .map(el => ({ align: el, available: isEnoughSpaceOnAlign(el) }))
                    .filter(el => el.available)

                vertical.value = verticals.find(el => el.position === props.position)?.position
                    || verticals[0]?.position
                    || props.position

                horizontal.value = horizontals.find(el => el.align === props.align)?.align
                    || horizontals[0]?.align
                    || props.align

                return emit('on-show')
            }, { flush: 'post' })

            onMounted(() => {
                const { any } = mobileDetector()

                isMobile.value = any
            })

            expose({ show, hide })

            return {
                elHandler,
                elTooltip,
                visible,
                vertical,
                horizontal,
                style,
                show,
                hide,
                toggle,
                onToggle,
                onToggleMobile
            }
        }
    })
</script>

<style lang="scss" scoped>
    @import '@/assets/scss/variables';
    @import '@/assets/scss/utils';

    .app-tooltip {
        $root: #{&}__wrapper;

        &__wrapper {
            position: relative;
            display: flex;
            flex-direction: column;
        }

        &__handler {
            display: flex;
            cursor: default;
        }

        &__content-wrapper {
            position: relative;
            display: flex;
            width: 100%;
            height: 0;

            #{$root}--top & {
                order: -1;
            }

            #{$root}--bottom & {
                order: 1;
            }
        }

        &__content {
            position: absolute;
            z-index: 10;

            #{$root}--top & {
                bottom: 0;
            }

            #{$root}--bottom & {
                top: 0;
            }

            #{$root}--left & {
                left: 0;
                right: auto;
            }

            #{$root}--right & {
                right: 0;
                left: auto;
            }

            #{$root}--center & {
                transform: translateX(-50%);
                left: 50%;
            }
        }

        &__content-inner {
            display: flex;
            align-items: center;
            width: auto;
            min-height: px-to-rem(28);
            padding: px-to-rem(4) px-to-rem(8);
            color: $color-black;
            font-size: px-to-rem(12);
            font-weight: 600;
            border: 1px solid $color-grey-light;
            background-color: $color-white;
            border-radius: px-to-rem(6);
            box-shadow: 0 px-to-rem(2) px-to-rem(16) 0 rgba(0, 0, 0, .15);
        }
    }
</style>
