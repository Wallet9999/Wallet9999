import { defineNuxtPlugin } from '#app'

import { Toaster, toast } from 'vue-sonner'

export default defineNuxtPlugin((app) => {
    app.vueApp.component('Toaster', Toaster)

    return {
        provide: {
            toast
        }
    }
})
