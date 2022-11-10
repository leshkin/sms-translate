// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss'
  ],
  app: {
    head: {
      charset: 'utf-16',
      viewport: 'width=500, initial-scale=1', 
      title: 'Georgian SMS Translation',
      description: 'Translation of Georgian SMS written with transliteration',
      link: [
        {rel: 'apple-touch-icon', sizes: '180x180', href: '/sms-translate/apple-touch-icon.png'},
        {rel: 'icon', type: 'image/png', sizes: '32x32', href: '/sms-translate/favicon-32x32.png'},
        {rel: 'icon', type: 'image/png', sizes: '16x16', href: '/sms-translate/favicon-16x16.png'},
        {rel: 'manifest', href: '/sms-translate/site.webmanifest'}
      ]
    },
  },
  router: {
    base: '/sms-translate/'
  }
})
