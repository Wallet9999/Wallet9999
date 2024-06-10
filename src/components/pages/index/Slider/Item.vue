<template>
    <div class="item">
        <div class="item__presentation">
            <nuxt-img
                format="webp"
                width="512"
                height="512"
                class="item__presentation-image"
                sizes="sm:48px md:48px lg:48px"
                alt="Presentation image"
                :src="`/images/slider/${image}.png`"
            />
        </div>
        <div class="item__inner">
            <h6 class="item__inner-title">
                {{ title }}
            </h6>
            <p class="item__inner-description">
                {{ description }}
            </p>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from '#imports'

    export default defineComponent({
        props: {
            image: {
                type: String,
                default: ''
            },
            title: {
                type: String,
                default: ''
            },
            description: {
                type: String,
                default: ''
            }
        }
    })
</script>

<style lang="scss" scoped>
    @import '@/assets/scss/variables';
    @import '@/assets/scss/utils';

    .item {
        display: flex;
        align-items: center;
        gap: px-to-rem(16);
        width: 100%;
        height: px-to-rem(82);
        padding: px-to-rem(10);
        background-color: $color-grey;
        border-radius: px-to-rem(22);

        &__presentation {
            display: flex;
            align-items: center;
            justify-content: center;
            width: px-to-rem(64);
            min-width: px-to-rem(64);
            height: px-to-rem(64);
            overflow: hidden;
            background-color: $color-white;
            border-radius: px-to-rem(18);
        }

        &__presentation-image {
            width: px-to-rem(48);
            height: px-to-rem(48);
        }

        &__inner {
            display: flex;
            flex-direction: column;
            gap: px-to-rem(8);
        }

        &__inner-title {
            color: $color-black;
            font-size: px-to-rem(15);
            font-weight: 700;
        }

        &__inner-description {
            color: $color-black-light;
            font-size: px-to-rem(12);
            font-weight: 600;
        }
    }
</style>
