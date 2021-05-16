import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/_professor/dependencies/store'
Vue.use(VueRouter)

let authenticate = (to, from, next) => {
     if (store.state.isAuth) {
          next()
     } else {
          next({ name: 'usersLogin' })
     }
}

const professor = {
     path: '/auth/professor',
     component: () => import('@/_professor/main.vue'),
     beforeEnter: authenticate,
     children: [
          {
               path: '',
               name: 'home',
               component: () => import('@/_professor/_home/index.vue'),
          },
          {
               path: 'calculator',
               name: 'calculator',
               component: () => import('@/_professor/_calculator/index.vue'),
          },
          {
               path: 'studentlist',
               name: 'studentList',
               component: () => import('@/_professor/_students/index.vue'),
          },
          {
               path: 'exam',
               name: 'exam',
               component: () => import('@/_professor/_exam/index.vue'),
          },
          {
               path: 'history',
               name: 'history',
               component: () => import('@/_professor/_history/index.vue'),
          },

          //form question viewing route
          {
               path: 'viewing/form/:token/:batch/:subject_code',
               name: 'HistoryForm',
               component: () => import('@/_professor/_history/formviewing.vue'),
          },

          //viewing of student response
          {
               path: 'student/response/form/:token/:student_id',
               name: 'reponseviewing',
               component: () =>
                    import('@/_professor/_history/studentresponse.vue'),
          },

          {
               path: 'admin',
               name: 'adminHome',
               component: () => import('@/_professor/_admin/index.vue'),
          },
     ],
}

const routes = [
     {
          path: '/',
          name: 'usersLogin',
          component: () => import('@/_professor/Login.vue'),
     },

     {
          path: '/signup',
          name: 'signup',
          component: () => import('@/_professor/Signup.vue'),
     },

     {
          path: '/account/verification/:token',
          name: 'AccountVerify',
          component: () => import('@/_professor/AccountVerify.vue'),
     },

     /*
   {
      path: '/professor/viewing/form/:token/:batch/:subject_code',
      name: 'HistoryForm',
      component: () => import('@/_professor/HistoryForm.vue'),
   },
   */

     //student question form route
     {
          path: '/student/question/form/:token/:student_id',
          name: 'examform',
          component: () => import('@/_professor/_students/questionnaire.vue'),
     },

     professor,
]

const router = new VueRouter({
     mode: 'history',
     base: process.env.BASE_URL,
     routes,
})

export default router
