import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

//imports for bootstrap
import './plugins/bootstrap'

new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount('#app')
