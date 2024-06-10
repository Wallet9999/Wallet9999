<template>
    <div class="slider">
        <swiper
            loop
            class="slider__inner"
            :modules="modules"
            :slides-per-view="1"
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
                    title: 'Safe and Fast',
                    description: 'Try the wallet with the most effective protect protocols'
                },
                {
                    image: 'exchange',
                    title: 'No Ban. No Charge Back',
                    description: 'Forget about chargebacks and banking money holds'
                },
                {
                    image: 'settings',
                    title: 'Unlimited Exchange',
                    description: 'Exchange more the 700+ tokens and 100+ currencies'
                },
                {
                    image: 'eye',
                    title: 'No KYC',
                    description: 'All users are staying incognito without KYC protocols to have clear experience'
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
        }

        &__item-icon {
            width: px-to-rem(36);
            height: auto;
        }
    }
</style>
