<template>
    <div class="app-pagination">
        <div class="app-pagination__inner">
            <div
                :class="{
                    'app-pagination__inner-item': true,
                    'app-pagination__inner-item--disabled': current === 1
                }"
                @click.prevent="change(current - 1)"
            >
                <icon-chevron class="app-pagination__inner-item-icon app-pagination__inner-item-icon--prev" />
            </div>
            <div
                v-if="hasFirst"
                class="app-pagination__inner-item"
                @click.prevent="change(1)"
                v-text="'1'"
            />
            <span
                v-if="hasPrev"
                class="app-pagination__inner-item app-pagination__inner-item--dots"
                v-text="'...'"
            />
            <div
                v-for="page in range"
                :class="{
                    'app-pagination__inner-item': true,
                    'app-pagination__inner-item--active': current === page
                }"
                :key="page"
                @click.prevent="change(page)"
                v-text="page"
            />
            <span
                v-if="hasNext"
                class="app-pagination__inner-item app-pagination__inner-item--dots"
                v-text="'...'"
            />
            <div
                v-if="hasLast"
                class="app-pagination__inner-item"
                @click.prevent="change(pages)"
                v-text="pages"
            />
            <div
                :class="{
                    'app-pagination__inner-item': true,
                    'app-pagination__inner-item--disabled': current === pages
                }"
                @click.prevent="change(current + 1)"
            >
                <icon-chevron class="app-pagination__inner-item-icon app-pagination__inner-item-icon--next" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from '#imports'

    import IconChevron from '@/assets/icons/chevron.svg?component'

    export default defineComponent({
        components: { IconChevron },
        props: {
            current: {
                type: Number,
                default: 1
            },
            totalItems: {
                type: Number,
                default: 0
            },
            pageItems: {
                type: Number,
                default: 10
            },
            pageRange: {
                type: Number,
                default: 2
            }
        },
        emits: [ 'on-change' ],
        setup (props, { emit, expose }) {
            const pages = computed(() => Math.ceil(props.totalItems / props.pageItems))

            const ranges = reactive({
                start: computed(() => props.current - props.pageRange > 0 ? props.current - props.pageRange : 1),
                end: computed(() => props.current + props.pageRange < pages.value ? props.current + props.pageRange : pages.value)
            })

            const range = computed(() => {
                return Array.from({ length: (ranges.end - ranges.start) + 1 }).map((_el, i) => ranges.start + i)
            })

            const hasFirst = computed(() => ranges.start !== 1)
            const hasLast = computed(() => ranges.end < pages.value)
            const hasPrev = computed(() => (props.current - props.pageRange - 1) > 1)
            const hasNext = computed(() => (props.current + props.pageRange + 1) < pages.value)

            const change = (page: number) => {
                if (page === props.current) return undefined
                if (page < 1 || page > pages.value) return undefined

                return emit('on-change', page)
            }

            watch(() => props.totalItems, () => change(1))

            expose()

            return {
                range,
                pages,
                hasFirst,
                hasLast,
                hasPrev,
                hasNext,
                change
            }
        }
    })
</script>

<style lang="scss" scoped>
    @import '@/assets/scss/variables';
    @import '@/assets/scss/utils';

    .app-pagination {
        display: flex;
        justify-content: center;
        height: px-to-rem(32);

        &__inner {
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: px-to-rem(4);
        }

        &__inner-item {
            display: flex;
            align-items: center;
            justify-content: center;
            width: px-to-rem(32);
            height: px-to-rem(32);
            color: $color-black-light;
            stroke: $color-black;
            font-size: px-to-rem(13);
            font-weight: 700;
            background-color: transparent;
            border-radius: px-to-rem(8);
            transition: .15s ease-in-out;
            transition-property: color, stroke, background-color;
            cursor: pointer;

            &:hover:not(#{&}--active):not(#{&}--disabled):not(#{&}--dots) {
                background-color: $color-grey;
            }

            &--active {
                background-color: $color-grey;
                cursor: default;
            }

            &--disabled {
                color: $color-grey-dark;
                stroke: $color-grey-dark;
                cursor: default;
            }
        }

        &__inner-item-icon {
            width: px-to-rem(24);
            height: auto;
            stroke: inherit;

            &--prev {
                transform: rotate(180deg);
            }

            &--next {
                //...
            }
        }
    }
</style>
