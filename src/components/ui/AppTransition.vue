<template>
    <component
        :is="component"
        :name="name"
        :enter-from-class="`${name}__enter--from`"
        :enter-active-class="`${name}__enter--active`"
        :enter-to-class="`${name}__enter--to`"
        :leave-from-class="`${name}__leave--from`"
        :leave-active-class="`${name}__leave--active`"
        :leave-to-class="`${name}__leave--to`"
    >
        <slot />
    </component>
</template>

<script lang="ts">
    import { defineComponent } from '#imports'

    import {
        Transition,
        TransitionGroup
    } from 'vue'

    export default defineComponent({
        props: {
            name: {
                type: String,
                default: 'default'
            },
            group: {
                type: Boolean,
                default: false
            }
        },
        setup (props) {
            const component = computed(() => {
                return props.group
                    ? TransitionGroup
                    : Transition
            })

            return {
                component
            }
        }
    })
</script>

<style lang="scss">
    .fade {
        // ...

        &__enter--active,
        &__leave--active {
            transition: opacity .25s ease-in-out;
        }

        &__enter--from,
        &__leave--to {
            opacity: 0;
        }
    }
</style>
