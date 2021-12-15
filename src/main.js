// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
Vue.config.productionTip = false

/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   components: { App },
//   template: '<App/>'
// })

new Promise(resolve => {
  var iamModuleConfig = {
    'pluginName': 'IamPlugin',
    'version': 'v2.0.0',
    'modules': [{
      'modName': 'IamAllModule',
      'stable': 'IAM.all.min.js',
      'grey': 'IAM.all.js',
      'css_stable': 'IAM.all.min.css',
      'css_grey': 'IAM.all.css',
      'ratio': 100
    }],
    'dependencies': [{ 'features': ['IamAll'], 'depends': ['IamAllModule'], 'sync': true }]
  }
  new LoaderJS(iamModuleConfig).use('IamAll', function() {
    console.log('******* IAM JSSDK loaded completed! *******')
    resolve()
  })
}).then(() => {
  new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
  })
})
