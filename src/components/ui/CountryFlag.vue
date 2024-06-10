<template>
    <div
        v-if="countryCode"
        class="country-flag"
    >
        <component
            :is="icons[countryCode.toLowerCase()]"
            class="country-flag__icon"
        />
    </div>
</template>

<script lang="ts">
    import { defineComponent } from '#imports'

    import { filename } from 'pathe/utils'

    export default defineComponent({
        props: {
            countryCode: {
                type: String,
                default: ''
            }
        },
        setup (_props) {
            const glob = import.meta.glob('@/assets/icons/country-flags/*.svg', { eager: true })
            const icons = Object.fromEntries(
                // @ts-ignore
                Object.entries(glob).map(([ key, value ]) => [ filename(key), value.default ])
            )

            return {
                icons
            }
        }
    })
</script>

<style lang="scss" scoped>
    @import '@/assets/scss/variables';
    @import '@/assets/scss/utils';

    .country-flag {
        width: px-to-rem(30);
        height: px-to-rem(20);

        &__icon {
            width: 100%;
            height: auto;
        }
    }
</style>
