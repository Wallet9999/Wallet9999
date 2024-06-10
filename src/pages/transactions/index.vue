<template>
    <div class="transactions">
        <h2 class="transactions__title">
            Transactions
        </h2>
        <widgets-transactions
            class="transactions__inner"
            :currency="user.data?.currency"
        />
    </div>
</template>

<script setup lang="ts">
    import { useUserStore } from '@/stores/user'

    const user = useUserStore()
</script>

<style lang="scss" scoped>
    @import '@/assets/scss/variables';
    @import '@/assets/scss/utils';

    .transactions {
        position: relative;
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        gap: px-to-rem(10);

        &__title {
            padding: 0 px-to-rem(20);
            font-size: px-to-rem(24);
            font-weight: 700;
        }

        &__inner {
            //...
        }
    }
</style>
