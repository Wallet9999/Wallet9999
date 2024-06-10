<template>
    <div id="__layout">
        <client-only>
            <div class="app">
                <div class="app__header">
                    <the-header @on-open-menu="onOpenMenu" />
                </div>
                <div class="content">
                    <slot />
                </div>
            </div>
            <modals-menu ref="compModalMenu" />
        </client-only>
    </div>
</template>

<script lang="ts">
    import type ModalMenu from '@/components/modals/Menu/index.vue'

    import { defineComponent } from '#imports'

    export default defineComponent({
        setup (_props) {
            const compModalMenu = ref<InstanceType<typeof ModalMenu>>()

            const onOpenMenu = () => {
                compModalMenu.value?.open()
            }

            return {
                compModalMenu,
                onOpenMenu
            }
        }
    })
</script>

<style lang="scss" scoped>
    @import '@/assets/scss/variables';
    @import '@/assets/scss/utils';

    #__layout {
        display: flex;
        flex-direction: column;
    }

    .app {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow: hidden;

        &__header {
            width: 100%;
            height: px-to-rem(64);
        }
    }

    .content {
        position: relative;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        width: 100%;
    }
</style>
