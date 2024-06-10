<template>
    <div class="item">
        <div class="item__inner">
            <nuxt-img
                v-if="data.image.length !== 0"
                format="webp"
                width="40"
                height="40"
                class="item__inner-image"
                :src="data.image"
                :alt="data.name"
            />
            <div class="item__inner-text">
                <p class="item__inner-text-name">
                    {{ data.name }}
                </p>
                <p class="item__inner-text-symbol">
                    {{ data.networkSymbol }}
                </p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import type { PropType } from 'vue'
    import type { BlockchainOption } from '@/components/ui/BlockchainSelector/index.vue'
    import { defineComponent } from '#imports'

    export default defineComponent({
        props: {
            data: {
                type: Object as PropType<BlockchainOption>,
                default: () => {}
            }
        }
    })
</script>

<style lang="scss" scoped>
    @import '@/assets/scss/variables';
    @import '@/assets/scss/utils';

    .item {
        display: flex;
        width: 100%;
        height: px-to-rem(72);
        padding: 0 px-to-rem(16);
        background-color: $color-grey-light;
        border-radius: px-to-rem(12);
        transition: background-color .15s ease-in-out;
        cursor: pointer;

        &:hover {
            background-color: $color-grey;
        }

        &__inner {
            display: flex;
            align-items: center;
            flex-grow: 1;
            gap: px-to-rem(16);
            width: 100%;
            height: 100%;
        }

        &__inner-image {
            width: px-to-rem(40);
            height: px-to-rem(40);
        }

        &__inner-text {
            display: flex;
            flex-direction: column;
            gap: px-to-rem(6);
            text-transform: uppercase;
            color: $color-black;
        }

        &__inner-text-name {
            font-size: px-to-rem(14);
            font-weight: 700;
        }

        &__inner-text-symbol {
            font-size: px-to-rem(12);
            font-weight: 600;
        }
    }
</style>
