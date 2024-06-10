export const truncateString = (value: string, limit = 4): string => {
    return `${value.slice(0, limit)}...${value.slice(-limit)}`
}
