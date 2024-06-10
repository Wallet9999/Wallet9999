<template>
    <div id="__layout">
        <client-only>
            <slot />
        </client-only>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from '#imports'

    export default defineComponent({})
</script>

<style lang="scss" scoped>
    @import '@/assets/scss/variables';
    @import '@/assets/scss/utils';

    #__layout {
        display: flex;
        flex-direction: column;
    }
</style>
