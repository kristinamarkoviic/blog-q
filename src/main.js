import Vue from 'vue'
import App from './App.vue'
import router from './router'
import upperFirst from 'lodash/upperFirst.js';
import camelCase from 'lodash/camelCase.js'; 

Vue.config.productionTip = false

const requireComponent = require.context(
  // The relative path of the components folder
  './components/base_components',
  // Whether or not to look in subfolders
  false,
  // The regular expression used to match base component filenames
  /[A-Z]\w+\.(vue|js)$/
)
requireComponent.keys().forEach(fileName => {
  // Get component config
  const componentConfig = requireComponent(fileName)

  // Get PascalCase name of component
  const componentName = upperFirst(
      camelCase(
          // Gets the file name regardless of folder depth
          fileName
              .split('/')
              .pop()
              .replace(/\.\w+$/, '')
      )
  )


  // Register component globally
  Vue.component(
      componentName,
      // Look for the component options on `.default`, which will
      // exist if the component was exported with `export default`,
      // otherwise fall back to module's root.
      componentConfig.default || componentConfig
  )
});

new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
