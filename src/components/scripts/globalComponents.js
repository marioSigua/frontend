import Vue from 'vue'

//for questions
Vue.component('exam-essay', () => import('../examEssay'))
Vue.component('exam-identification', () => import('../examIdentification'))
Vue.component('exam-mcq', () => import('../examMCQ'))

Vue.component('prompt-modal', () => import('../promptModal'))

Vue.component('navbar', () => import('../navbar'))

//students form
Vue.component('student-essay', () => import('../StudentEssay'))
Vue.component('student-identification', () => import('../StdntIdentification'))
Vue.component('student-mcq', () => import('../StudentMCQ'))

//responses viewing
Vue.component('viewing-essay', () => import('../viewingEssay'))
Vue.component('viewing-identification', () =>
     import('../viewingIdentification')
)
Vue.component('viewing-mcq', () => import('../viewingMCQ'))
