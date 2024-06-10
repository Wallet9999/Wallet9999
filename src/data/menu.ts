import type { RouteLocationRaw } from 'vue-router'

type MenuItemLinkAttributes = string | RouteLocationRaw

export interface MenuItem {
    id: number
    path: MenuItemLinkAttributes
    text: string
    protected: boolean
    target?: '_blank'
}

export const menu: MenuItem[] = [
    {
        id: 0,
        path: '/',
        text: 'Wallet',
        protected: true,
    },
    {
        id: 1,
        path: '/transactions',
        text: 'Transactions',
        protected: true,
    },
    {
        id: 2,
        path: '/',
        text: 'How it Works?',
        protected: false,
    },
]
