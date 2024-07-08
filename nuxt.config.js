// https://nuxt.com/docs/api/configuration/nuxt-config

/** Aliter Customizations */
const port = process.env.EVOLVE_PORT || 5151;
const serverPath = process.env.EVOLVE_SERVER_URL || 'http://localhost:5141/';
let dist = '../evolve-server/build';
const serveFromSubFolder = false;
/** End Here  */


export default defineNuxtConfig({
  ssr: true,
  target: 'server', // server static
  spaLoadingTemplate: 'loading.html',
  app: {
    head: {
      htmlAttrs: { dir: 'ltr', lang: 'en' },
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description', content: 'Evolve Automations platform'
        },
        { name: "keywords", content: "industry 4.0, automations" },
        { name: "author", content: "Aliter Business Solutions PVT LTD" }
      ],
      script: [
        { src: (process.env.NODE_ENV !== 'production' || !serveFromSubFolder ? '' : '/' + dist) + '/vendor/uikit.min.js' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: (process.env.NODE_ENV !== 'production' || !serveFromSubFolder ? '' : '/' + dist) + '/favicon.ico' },
        { rel: 'preload', href: (process.env.NODE_ENV !== 'production' || !serveFromSubFolder ? '' : '/' + dist) + '/vendor/uikit.min.js', as: 'script' },
        { rel: 'preload', href: (process.env.NODE_ENV !== 'production' || !serveFromSubFolder ? '' : '/' + dist) + '/fonts/roboto_base64.css', as: 'style' },
        { rel: 'preload', href: (process.env.NODE_ENV !== 'production' || !serveFromSubFolder ? '' : '/' + dist) + '/fonts/sourceCodePro_base64.css', as: 'style' },
        { rel: 'preload', href: (process.env.NODE_ENV !== 'production' || !serveFromSubFolder ? '' : '/' + dist) + '/fonts/mdi_base64.css', as: 'style' },
        { rel: 'stylesheet', href: (process.env.NODE_ENV !== 'production' || !serveFromSubFolder ? '' : '/' + dist) + '/fonts/roboto_base64.css' },
        { rel: 'stylesheet', href: (process.env.NODE_ENV !== 'production' || !serveFromSubFolder ? '' : '/' + dist) + '/fonts/sourceCodePro_base64.css' },
        { rel: 'stylesheet', href: (process.env.NODE_ENV !== 'production' || !serveFromSubFolder ? '' : '/' + dist) + '/fonts/mdi_base64.css' }
      ],
      style: [
        {
          children: `\n/* Copyright (C) 2024 Aliter business solutions Pvt Ltd to Present\n* All Rights Reserved.\n* Version : 1.1.0\n* This code may not be used, copied,\n* modified, merged, published, distributed, sublicensed, or\n* sold in any form, without the explicit written permission\n* of the copyright holder.\n*\n* Any information please Write to : vijay@alitersolutions.com,\n* or visit : https://www.alitersolutions.com\n*/\n`,
        },
      ],


    },
  },

  build: {
    standalone: true,
    chunkSizeWarningLimit: 5000
  },

  runtimeConfig: {
    // Public keys that are exposed to the client
    public: {
      VUE_APP_I18N_LOCALE: "en",
      VUE_APP_I18N_FALLBACK_LOCALE: "en",
      VUE_APP_DEFAULT_AUTH: "authapi",
      baseURL: serverPath,
    //   development: process.env?.DEVELOPMENT,
    },
  },


  alias: {
    assets: "/assets",
    public: "/public",
  },
  modules: [
    [
      '@pinia/nuxt',
    ],
    'nuxt-socket-io',
  ],
  io: {
    // module options
    sockets: [{
      //name: 'main',
      url: serverPath,
      default: true,
    }]
  },
  pinia: {
    autoImports: ['defineStore' , 'acceptHMRUpdate'],
  },
  plugins: [
  
		{ src: '~/plugins/auth.js' },
		{ src: '~/plugins/storeRouter.js' },
		{ src: '~/plugins/initData.client.js' },
		{ src: '~/plugins/uiV2.js' },
		{ src: '~/plugins/flatpickr.js' },
  ],

  css: [
    '@mdi/font/css/materialdesignicons.min.css',
    'uikit/dist/css/uikit.css',
    '~/assets/scss/main.scss',
    '~/assets/scss/custom.scss',
  ],
  imports: {
    dirs: ["./stores"],
  },

  /** Aliter Customizations  */
  nitro: {
    prerender: {
      crawlLinks: true,
      failOnError: false,
    },
    output: {
      publicDir: dist
    }
  },
  routeRules: { '/': { ssr: false } },
  dev: true,
  devServer: {
    port: port,
    // host: 'localhost', 
    host: '0.0.0.0',
  }
});
