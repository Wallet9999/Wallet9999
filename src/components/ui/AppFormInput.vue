<template>
    <div class="form-input">
        <div class="form-input__header">
            <div class="form-input__header-inner">
                <p class="form-input__header-label">
                    {{ label }}
                </p>
                <app-tooltip
                    v-if="hint.length !== 0"
                    position="top"
                >
                    <template #handler>
                        <icon-question class="form-input__header-icon" />
                    </template>
                    <div class="form-input__header-tooltip">
                        <p
                            v-for="(item, index) in hint"
                            class="form-input__header-tooltip-text"
                            :key="index"
                        >
                            {{ item }}
                        </p>
                    </div>
                </app-tooltip>
            </div>
            <p
                v-if="errors.length !== 0"
                class="form-input__header-label form-input__header-label--error"
            >
                {{ errors[0] }}
            </p>
        </div>
        <slot />
    </div>
</template>

<script lang="ts">
    import type { PropType } from 'vue'
    import { defineComponent } from '#imports'

    import IconQuestion from '@/assets/icons/question.svg?component'

    export default defineComponent({
        components: { IconQuestion },
        props: {
            label: {
                type: String,
                default: ''
            },
            errors: {
                type: Array as PropType<string[]>,
                default: () => []
            },
            hint: {
                type: Array as PropType<string[]>,
                default: () => []
            }
        }
    })
</script>

<style lang="scss" scoped>
    @import '@/assets/scss/variables';
    @import '@/assets/scss/utils';

    .form-input {
        display: flex;
        flex-direction: column;
        gap: px-to-rem(8);

        &__header {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        &__header-inner {
            display: flex;
            align-items: center;
            gap: px-to-rem(8);
        }

        &__header-label {
            color: $color-black;
            font-size: px-to-rem(14);
            font-weight: 600;

            &--error {
                color: $color-red;
            }
        }

        &__header-icon {
            width: px-to-rem(18);
            height: auto;
        }

        &__header-tooltip {
            display: flex;
            flex-direction: column;
        }

        &__header-tooltip-text {
            white-space: nowrap;
        }
    }
</style>
