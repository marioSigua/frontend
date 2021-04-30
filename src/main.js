import Vue from 'vue'
import axios from 'axios'


// old code
//import App from './App.vue'
//import router from './router'
//import store from './store'

import App from './_professor/App.vue'
import router from './_professor/dependencies/router'
import store from './_professor/dependencies/store'





Vue.config.productionTip = false
//imports for bootstrap
import './plugins/bootstrap'

//initaliaze global components
import './components/scripts/globalComponents'



// Material Design
import '@/_professor/themes/material-design.css'


// Initialize store
Vue.prototype.$store = store

// initialize global for axios

Vue.prototype.$axios = axios

new Vue({
     router,
     store,
     render: (h) => h(App),
}).$mount('#app')
