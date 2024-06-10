export const useLocalStorage = () => {
    const setItem = (key: string, data: string): void => {
        localStorage.setItem(`bitbank-${key}`, data)
    }

    const getItem = (key: string): string | null => {
        return localStorage.getItem(`bitbank-${key}`)
    }

    const removeItem = (key: string): void => {
        localStorage.removeItem(`bitbank-${key}`)
    }

    return {
        setItem,
        getItem,
        removeItem
    }
}
