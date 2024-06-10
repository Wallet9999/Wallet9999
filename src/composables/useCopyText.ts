import { useNuxtApp } from '#imports'

export const useCopyText = () => {
    const { $toast } = useNuxtApp()
    const copied = ref('')

    const copy = async (value: string, timeout?: number) => {
        if (copied.value === value) return undefined

        try {
            await navigator.clipboard.writeText(value)
            copied.value = value

            $toast.info('Copied to clipboard')
        } catch (err) {
            $toast.error('Cannot copy text')
        }

        setTimeout(() => {
            copied.value = ''
        }, timeout ?? 2000)
    }

    return {
        copied,
        copy
    }
}