import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import '@progress/kendo-ui' // This will import the entire Kendo UI library
// As an alternative, you could import only the scripts that are used by a specific widget:
// import '@progress/kendo-ui/js/kendo.editor' // Imports only the Editor script and its dependencies

import '@progress/kendo-theme-default/dist/all.css'

import { Editor } from '@progress/kendo-editor-vue-wrapper'
// import { EditorTool } from '@progress/kendo-editor-vue-wrapper'
import { EditorInstaller } from '@progress/kendo-editor-vue-wrapper'
import './axios'
import "./assets/scss/util.scss"
import VueSkeletonLoader from 'skeleton-loader-vue'
Vue.config.productionTip = false
Vue.use(EditorInstaller)

new Vue({
  router,
  vuetify,
  Editor,
  VueSkeletonLoader,
  render: h => h(App)
}).$mount('#app')
