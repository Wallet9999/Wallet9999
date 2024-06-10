<template>
    <teleport to="body">
        <app-modal-sheet
            v-model="visible"
            close-on-click-outside
        >
            <div class="modal__body">
                <app-numpad
                    v-model="amount"
                    :scale="scale"
                />
            </div>
        </app-modal-sheet>
    </teleport>
</template>

<script lang="ts">
    import { defineComponent } from '#imports'

    export default defineComponent({
        props: {
            scale: {
                type: Number,
                default: 2
            }
        },
        emits: [ 'on-change-value' ],
        setup (_props, { emit, expose }) {
            const visible = ref(false)
            const amount = ref('')

            const open = (): void => {
                visible.value = true
            }

            const close = (): void => {
                visible.value = false
            }

            watch(() => amount.value, (value) => {
                emit('on-change-value', value)
            })

            expose({ open, close })

            return {
                visible,
                amount,
                open,
                close
            }
        }
    })
</script>

<style lang="scss" scoped>
    @import '@/assets/scss/variables';
    @import '@/assets/scss/utils';

    .modal {
        //...

        &__modal-body {
            //...
        }
    }
</style>
