<template>
    <nuxt-layout>
        <nuxt-page />
        <client-only>
            <toaster
                rich-colors
                position="top-center"
            />
        </client-only>
    </nuxt-layout>
</template>

<script lang="ts">
    import { defineComponent } from '#imports'

    import { Toaster } from 'vue-sonner'

    export default defineComponent({
        components: { Toaster }
    })
</script>
