<template>
    <component
        ref="elButton"
        :is="component"
        role="button"
        :class="{
            'app-button': true,
            ['app-button--' + size]: true,
            ['app-button--' + color]: true,
            'app-button--disabled': disabled,
            'app-button--loading': loading,
            'app-button--icon': icon,
            'app-button--wide': wide
        }"
        :disabled="disabled"
        v-bind="attributes"
        @click="handleClick"
    >
        <div class="app-button__inner">
            <icon-loading
                v-if="loading"
                class="app-button__inner-loader"
            />
            <slot
                v-else-if="icon"
                name="icon"
            />
            <slot v-else />
        </div>
    </component>
</template>

<script lang="ts">
    import type { PropType } from 'vue'
    import type { RouteLocationRaw } from 'vue-router'
    import { defineComponent } from '#imports'

    import { propTypeValidator } from '@/utils/prop-validator'

    import IconLoading from '@/assets/icons/loading.svg?component'

    interface ButtonAnchorAttributes {
        href?: string
        target: string
    }

    interface ButtonRouterLinkAttributes {
        to: string | RouteLocationRaw
    }

    export enum ButtonSize {
        Large = 'lg',
        Medium = 'md'
    }

    export enum ButtonColor {
        Blue = 'blue',
        Black = 'black'
    }

    export default defineComponent({
        components: { IconLoading },
        props: {
            to: {
                type: [ String, Object ] as PropType<RouteLocationRaw>,
                default: null
            },
            href: {
                type: String,
                default: null
            },
            target: {
                type: String,
                default: '_blank'
            },
            size: {
                type: String as PropType<ButtonSize | `${ButtonSize}`>,
                default: ButtonSize.Large,
                validator: (value: string) => propTypeValidator('size', value, Object.values(ButtonSize))
            },
            color: {
                type: String as PropType<ButtonColor | `${ButtonColor}`>,
                default: ButtonColor.Blue,
                validator: (value: string) => propTypeValidator('color', value, Object.values(ButtonColor))
            },
            icon: {
                type: Boolean,
                default: false
            },
            wide: {
                type: Boolean,
                default: false
            },
            disabled: {
                type: Boolean,
                default: false
            },
            loading: {
                type: Boolean,
                default: false
            }
        },
        emits: [ 'on-click' ],
        setup (props, { emit, expose }) {
            const elButton = ref<HTMLElement>()
            const elButtonStyleWidth = ref('')

            const component = computed<'a' | 'button' | 'router-link'>(() => {
                if (props.to) return 'router-link'
                if (props.href) return 'a'

                return 'button'
            })

            const attributes = computed<ButtonAnchorAttributes | ButtonRouterLinkAttributes | null>(() => {
                if (component.value === 'button') return null
                if (component.value === 'router-link') return { to: props.to }

                return {
                    href: props.href,
                    target: props.target
                }
            })

            const handleClick = (event: MouseEvent): void => {
                if (props.loading || props.disabled) return undefined

                emit('on-click', event)
            }

            watch(() => props.loading, (loading) => {
                if (!elButton.value) return undefined

                if (loading) {
                    elButtonStyleWidth.value = elButton.value.style?.width
                    elButton.value.style.width = `${elButton.value.offsetWidth}px`
                } else {
                    elButton.value.style.width = elButtonStyleWidth.value
                    elButtonStyleWidth.value = ''
                }
            })

            expose()

            return {
                elButton,
                component,
                attributes,
                handleClick
            }
        }
    })
</script>

<style lang="scss">
    @use 'sass:map';
    @use 'sass:color';

    @import '@/assets/scss/variables';
    @import '@/assets/scss/utils';

    $button-sizes: (
        'lg': (
            'height': px-to-rem(48),
            'padding': 0 px-to-rem(24),
            'border-radius': px-to-rem(12),
            'font-size': px-to-rem(18)
        ),
        'md': (
            'height': px-to-rem(42),
            'padding': 0 px-to-rem(18),
            'border-radius': px-to-rem(10),
            'font-size': px-to-rem(15)
        )
    );

    $button-colors: (
        'blue': $color-blue,
        'black': $color-black
    );

    .app-button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex: 0 0 auto;
        height: map.get($button-sizes, 'lg', 'height');
        padding: map.get($button-sizes, 'lg', 'padding');
        font-size: map.get($button-sizes, 'lg', 'font-size');
        font-weight: 600;
        line-height: 1;
        color: $color-white;
        background-color: $color-blue;
        border-radius: map.get($button-sizes, 'lg', 'border-radius');
        transition: .15s ease-in-out;
        transition-property: color, background-color;
        user-select: none;
        cursor: pointer;

        @each $name, $size in $button-sizes {
            &--#{$name}:not(#{&}--icon) {
                height: map.get($size, 'height');
                padding: map.get($size, 'padding');
                border-radius: map.get($size, 'border-radius');
                font-size: map.get($size, 'font-size');
            }
        }

        @each $name, $color in $button-colors {
            &--#{$name} {
                background-color: $color;

                &:hover:not(:disabled) {
                    background-color: color.adjust($color, $lightness: 10%);
                }

                &:active:not(:disabled) {
                    background-color: color.adjust($color, $lightness: -10%);
                }
            }
        }

        &--icon {
            width: px-to-rem(56);
            height: px-to-rem(56);
            padding: 0;
            fill: $color-white;
            stroke: $color-white;
            border-radius: 50%;

            & svg {
                width: px-to-rem(24);
                height: auto;
                fill: inherit;
                stroke: inherit;
            }
        }

        &--wide:not(#{&}--icon) {
            width: 100%;
        }

        &--disabled,
        &--loading {
            pointer-events: none;
            cursor: default;
        }

        &--disabled {
            background-color: rgba(25, 27, 30, .15);
            color: $color-white;
        }

        &__inner {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: px-to-rem(8);
            height: 100%;
            transition: inherit;
        }

        &__inner-loader {
            height: 80%;
            width: auto;
            fill: $color-white;
        }
    }
</style>
