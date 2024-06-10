import { defineNuxtConfig } from 'nuxt/config'
import { splitVendorChunkPlugin } from 'vite'
import svgLoader from 'vite-svg-loader'

const API_URL: string = process.env.API_URL || 'https://stealth.panel360.space/v1'

export default defineNuxtConfig({
    srcDir: './src',
    ssr: true,
    builder: 'vite',
    vite: {
        build: {
            minify: process.env.NODE_ENV !== 'production' ? false : 'terser',
        },
        plugins: [
            splitVendorChunkPlugin(),
            svgLoader({
                svgo: true,
                svgoConfig: {
                    plugins: [{
                        name: 'preset-default',
                        params: {
                            overrides: {
                                inlineStyles: {
                                    onlyMatchedOnce: false
                                }
                            }
                        }
                    }]
                }
            }),
        ],
    },
    app: {
        head: {
            htmlAttrs: {
                lang: 'en'
            },
            title: 'Stealth Wallet',
            meta: [{
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            }, {
                name: 'msapplication-TileColor',
                content: '#2b5797'
            }, {
                name: 'theme-color',
                content: '#ffffff'
            }],
            link: [{
                rel: 'apple-touch-icon',
                sizes: '180x180',
                href: '/apple-touch-icon.png'
            }, {
                rel: 'icon',
                type: 'image/png',
                sizes: '32x32',
                href: '/favicon-32x32.png'
            }, {
                rel: 'icon',
                type: 'image/png',
                sizes: '16x16',
                href: '/favicon-16x16.png'
            }, {
                rel: 'manifest',
                href: '/site.webmanifest'
            }, {
                rel: 'mask-icon',
                color: '#5bbad5',
                href: '/safari-pinned-tab.svg'
            }],
        },
        layoutTransition: {
            name: 'layout',
            mode: 'out-in',
        },
    },
    css: [ '~/assets/scss/main.scss' ],
    typescript: {
        strict: true,
        shim: false,
    },
    runtimeConfig: {
        public: {
            apiURL: API_URL,
        },
    },
    components: [
        { path: '@/components/', pathPrefix: true },
        { path: '@/components/ui/', pathPrefix: true },
    ],
    modules: [
        '@nuxt/image',
        '@pinia/nuxt',
    ],
})
