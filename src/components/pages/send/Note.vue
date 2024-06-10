<template>
    <div class="note">
        <div class="note__inner">
            <div
                v-for="(note, index) in notes"
                class="note__inner-item"
                :key="index"
            >
                <component
                    :is="note.icon"
                    class="note__inner-item-icon"
                />
                <p class="note__inner-item-text">
                    {{ note.text }}
                    <span class="note__inner-item-text note__inner-item-text--highlight">
                        {{ note?.link }}
                    </span>
                </p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import type { FunctionalComponent } from 'vue'
    import { defineComponent } from '#imports'

    import IconShield from '@/assets/icons/shield.svg?component'
    import IconClock from '@/assets/icons/clock-filled.svg?component'
    import IconFlag from '@/assets/icons/flag-filled.svg?component'

    interface NoteItem {
        icon: FunctionalComponent
        text: string
        link?: string
        href?: string
    }

    export default defineComponent({
        setup (_props) {
            const notes: NoteItem[] = [
                {
                    icon: IconShield,
                    text: 'Your money is held in licensed banks.',
                    link: 'Learn more.',
                    href: ''
                },
                {
                    icon: IconClock,
                    text: 'Transfers usually take a few hours to appear on your Revolut account.'
                },
                {
                    icon: IconFlag,
                    text: 'Only local transfers are accepted. For international transfers, please use the SWIFT details found above.'
                }
            ]

            return {
                notes
            }
        }
    })
</script>

<style lang="scss" scoped>
    @import '@/assets/scss/variables';
    @import '@/assets/scss/utils';

    .note {
        position: relative;
        width: 100%;
        padding: px-to-rem(20);
        background-color: $color-grey-light;
        border-radius: px-to-rem(12);

        &__inner {
            display: flex;
            flex-direction: column;
            gap: px-to-rem(32);
        }

        &__inner-item {
            display: flex;
            align-items: center;
            gap: px-to-rem(12);
        }

        &__inner-item-icon {
            width: px-to-rem(24);
            min-width: px-to-rem(24);
            height: auto;
        }

        &__inner-item-text {
            display: inline;
            color: $color-black;
            font-size: px-to-rem(14);
            font-weight: 500;

            &--highlight {
                color: $color-blue;
            }
        }
    }
</style>
