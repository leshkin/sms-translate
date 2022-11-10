// https://v3.nuxtjs.org/api/configuration/nuxt.config

const path = (process.env.NODE_ENV === 'development') ? '/' : '/sms-translate/'

export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss'
  ],
  app: {
    baseURL: path,
    head: {
      charset: 'utf-16',
      viewport: 'width=device-width, initial-scale=1.0', 
      title: 'Georgian SMS Translation',
      description: 'Translation of Georgian SMS written with transliteration',
      link: [
        {rel: 'apple-touch-icon', sizes: '180x180', href: path + 'apple-touch-icon.png'},
        {rel: 'icon', type: 'image/png', sizes: '32x32', href: path + 'favicon-32x32.png'},
        {rel: 'icon', type: 'image/png', sizes: '16x16', href: path + 'favicon-16x16.png'},
        {rel: 'manifest', href: path + 'site.webmanifest'}
      ]
    },
  }
})
