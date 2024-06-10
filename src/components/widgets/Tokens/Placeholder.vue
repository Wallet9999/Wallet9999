<template>
    <div class="placeholder">
        <div class="placeholder__inner">
            <icon-flag class="placeholder__inner-icon" />
            <p class="placeholder__inner-text">
                Oops, no tokens
            </p>
        </div>
        <app-button
            size="md"
            class="placeholder__button"
            @on-click="onDeposit"
        >
            Deposit
        </app-button>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from '#imports'

    import { useBus } from '@/composables/useBus'

    import IconFlag from '@/assets/icons/flag.svg?component'

    export default defineComponent({
        components: { IconFlag },
        setup (_props) {
            const { emitter } = useBus()

            const onDeposit = () => {
                emitter.emit('onDeposit')
            }

            return {
                onDeposit
            }
        }
    })
</script>

<style lang="scss" scoped>
    @import '@/assets/scss/variables';
    @import '@/assets/scss/utils';

    .placeholder {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        flex-grow: 1;
        gap: px-to-rem(20);

        &__inner {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: px-to-rem(8);
            text-align: center;
        }

        &__inner-icon {
            width: px-to-rem(24);
            height: auto;
        }

        &__inner-text {
            color: $color-black;
            font-size: px-to-rem(15);
            font-weight: 600;
        }

        &__button {
            width: auto;
        }
    }
</style>
