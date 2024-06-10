<template>
    <div class="main">
        <pages-index-balance
            class="main__balance"
            @on-send="onSend"
            @on-convert="onConvert"
        />
        <div class="main__inner">
            <pages-index-slider
                class="main__inner-slider"
            />
            <widgets-tokens
                class="main__inner-tokens"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
    const onSend = () => {
        return navigateTo('/send')
    }

    const onConvert = () => {
        return navigateTo('/convert')
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/scss/variables';
    @import '@/assets/scss/utils';

    .main {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        width: 100%;

        &__balance {
            margin-bottom: px-to-rem(10);
            position: relative;
            top: px-to-rem(-64);
        }

        &__inner {
            position: relative;
            top: px-to-rem(-64);
            display: flex;
            flex-direction: column;
            flex-grow: 1;
        }

        &__inner-slider {
            width: 100%;
        }

        &__inner-history {
            width: 100%;
        }
    }
</style>
