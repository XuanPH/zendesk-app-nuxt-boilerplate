export default {
  mode: "spa",
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    script: [
      {
        src:
          "https://static.zdassets.com/zendesk_app_framework_sdk/2.0/zaf_sdk.min.js",
        type: "text/javascript"
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: [
    "element-ui/lib/theme-chalk/index.css",
    "~/assets/css/main.css",
    "~/assets/css/icons/icomoon/styles.css"
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    "~/plugins/axios",
    "@/plugins/element-ui",
    "@/plugins/filter.js",
    { src: "~/plugins/moment" },
    { src: "~/plugins/i18n" }
  ],

  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: ["@nuxtjs/dotenv", "@nuxtjs/axios", "@nuxtjs/proxy"],
  /*
   ** Axios module configuration
   */

  // See https://github.com/nuxt-community/axios-module#options
  axios: {
    baseURL: "https://api.gtmjs.com/api/zendesk"
  },
  /*
   ** Build configuration
   */
  build: {
    transpile: [/^element-ui/],
    vendor: ["lodash"],
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          exclude: /(node_modules)/
        });
      }
    }
  }
};
