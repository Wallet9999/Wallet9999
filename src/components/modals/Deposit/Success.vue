<template>
    <div class="success">
        <nuxt-img
            format="webp"
            width="128"
            height="128"
            class="success__image"
            src="/images/money-bag.png"
            alt="Deposit successful"
            sizes="sm:128px md:256px lg:512px"
        />
        <div class="success__inner">
            <h6 class="success__inner-title">
                Deposit Successful
            </h6>
            <p class="success__inner-description">
                You can check Transaction details on Home Screen
            </p>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from '#imports'

    export default defineComponent({})
</script>

<style lang="scss" scoped>
    @import '@/assets/scss/variables';
    @import '@/assets/scss/utils';

    .success {
        position: relative;
        display: flex;
        flex-direction: column;

        &__image {
            margin: 0 auto;
            width: px-to-rem(128);
            height: px-to-rem(128);
        }

        &__inner {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: px-to-rem(16);
            width: 100%;
            color: $color-black-light;
            text-align: center;
        }

        &__inner-title {
            color: $color-black-light;
            font-size: px-to-rem(24);
            font-weight: 700;
        }

        &__inner-description {
            font-size: px-to-rem(13);
            font-weight: 600;
        }
    }
</style>
