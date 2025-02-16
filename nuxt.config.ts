// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  
  $development: {
    devtools: { enabled: true },
    nitro: {
      experimental: {
        websocket: true
      }
    }
  },
  

  css: [ '~/assets/css/bootstrap.min.css'],
  compatibilityDate: '2024-04-03',
  modules: [],
  
 
  app: {
    head:{
      title: "Message",
      charset: "utf-8",
      viewport: 'width=device-width, initial-scale=1',
      
    }
  },
  
  postcss: {
    plugins: {
     
      autoprefixer: {}
    }
  },
 

})