<template>
    <teleport to="body">
        <app-modal-sheet v-model="visible">
            <div class="modal__body">
                <nuxt-img
                    format="webp"
                    width="160"
                    height="160"
                    class="modal__body-image"
                    alt="Transaction success"
                    :src="`/images/${image}.png`"
                />
                <div class="modal__body-text">
                    <h6 class="modal__body-text-title">
                        {{ title }}
                    </h6>
                    <p class="modal__body-text-description">
                        You can check details of your Transaction on<br>
                        Transaction History page
                    </p>
                </div>
            </div>
            <template #footer>
                <app-button
                    wide
                    @on-click="onClick"
                >
                    Transaction Details
                </app-button>
            </template>
        </app-modal-sheet>
    </teleport>
</template>

<script lang="ts">
    import { defineComponent } from '#imports'

    export default defineComponent({
        setup (_props, { expose }) {
            const visible = ref(false)
            const title = ref('')
            const image = ref('')

            const open = (data: { title: string, image: string }): void => {
                visible.value = true
                title.value = data.title
                image.value = data.image
            }

            const close = (): void => {
                visible.value = false
            }

            const onClick = () => {
                navigateTo('/transactions')
                close()
            }

            expose({ open, close })

            return {
                visible,
                title,
                image,
                open,
                close,
                onClick
            }
        }
    })
</script>

<style lang="scss" scoped>
    @import '@/assets/scss/variables';
    @import '@/assets/scss/utils';

    .modal {
        //...

        &__body {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: px-to-rem(8);
        }

        &__body-image {
            width: px-to-rem(160);
            height: px-to-rem(160);
        }

        &__body-text {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: px-to-rem(24);
            width: 100%;
            text-align: center;
        }

        &__body-text-title {
            font-size: px-to-rem(24);
            font-weight: 700;
        }

        &__body-text-description {
            font-size: px-to-rem(13);
            font-weight: 600;
        }
    }
</style>
