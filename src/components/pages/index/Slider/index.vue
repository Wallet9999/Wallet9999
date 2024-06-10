<template>
    <div class="slider">
        <swiper
            loop
            class="slider__inner"
            :modules="modules"
            :slides-per-view="2"
            :space-between="10"
            :pagination="{ clickable: true }"
            @slideChange="onSlideChange"
        >
            <swiper-slide
                v-for="(item, index) in data"
                :key="index"
            >
                <pages-index-slider-item
                    class="slider__item"
                    :image="item.image"
                    :title="item.title"
                    :description="item.description"
                />
            </swiper-slide>
        </swiper>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from '#imports'

    import { Pagination } from 'swiper/modules'
    import { Swiper, SwiperSlide } from 'swiper/vue'

    import 'swiper/css'
    import 'swiper/css/pagination'

    interface Slide {
        image: string
        title: string
        description: string
    }

    export default defineComponent({
        components: {
            Swiper,
            SwiperSlide
        },
        setup (_props) {
            const data: Slide[] = [
                {
                    image: 'wallet',
                    title: 'Name of Collection',
                    description: '0.002  ETH'
                },
                {
                    image: 'exchange',
                    title: 'NFT Name Collection',
                    description: '0.055  ETH'
                },
                {
                    image: 'wallet',
                    title: 'Name of Collection',
                    description: '0.002  ETH'
                },
                {
                    image: 'exchange',
                    title: 'NFT Name Collection',
                    description: '0.055  ETH'
                }
            ]

            const onSwiper = () => {}
            const onSlideChange = () => {}

            return {
                data,
                onSwiper,
                onSlideChange,
                modules: [ Pagination ]
            }
        }
    })
</script>

<style lang="scss" scoped>
    @import '@/assets/scss/variables';
    @import '@/assets/scss/utils';

    .slider {
        position: relative;
        display: flex;
        align-items: center;
        width: 100%;
        padding: 0 px-to-rem(20);

        &__inner {
            position: relative;
            padding-bottom: px-to-rem(30);
        }

        &__item {
            width: 100%;
            height: 82px;
        }

        &__item-icon {
            width: px-to-rem(36);
            height: auto;
        }
    }
</style>
