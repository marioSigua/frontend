import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
Vue.use(VueRouter)

const routes = [
     {
          path: '/',
          name: 'usersLogin',
          component: () =>
               import(
                    /* webpackChunkName: "usersLogin" */ '../components/Login.vue'
               ),

          beforeEnter(to, from, next) {
               if (store.state.isAuth) {
                    next({ name: 'home' })
               } else {
                    next()
               }
          },
     },

     {
          path: '/professor/student/response/:token/:student_id',
          name: 'ResponseViewing',
          component: () =>
               import(
                    /* webpackChunkName: "usersExam" */ '../components/ResponseViewing.vue'
               ),
     },

     {
          path: '/professor/viewing/form/:token/:batch/:subject_code',
          name: 'HistoryForm',
          component: () =>
               import(
                    /* webpackChunkName: "usersExam" */ '../components/HistoryForm.vue'
               ),
     },

     //student question form route
     {
          path: '/student/question/form/:token/:student_id',
          name: 'examform',
          component: () =>
               import(
                    /* webpackChunkName: "usersExam" */ '../components/ExamForm.vue'
               ),
     },

     //route for authenticated user

     {
          path: '/auth/professor',
          component: () =>
               import(
                    /* webpackChunkName: "calculator" */ '../views/index-view.vue'
               ),

          beforeEnter(to, from, next) {
               if (store.state.isAuth) {
                    next()
               } else {
                    next({ name: 'usersLogin' })
               }
          },

          children: [
               {
                    path: '',
                    name: 'home',
                    component: () =>
                         import(
                              /* webpackChunkName: "home" */ '../components/Home.vue'
                         ),
               },

               {
                    path: 'calculator',
                    name: 'calculator',
                    component: () =>
                         import(
                              /* webpackChunkName: "calculator" */ '../components/calculator.vue'
                         ),
               },

               {
                    path: 'studentlist',
                    name: 'studentList',
                    component: () =>
                         import(
                              /* webpackChunkName: "studentList" */ '../components/Studentlist.vue'
                         ),
               },

               {
                    path: 'exam',
                    name: 'usersExam',
                    component: () =>
                         import(
                              /* webpackChunkName: "usersExam" */ '../components/Exam.vue'
                         ),
               },
          ],
     },

     // {
     //   path: '/about',
     //   name: 'About',
     //   // route level code-splitting
     //   // this generates a separate chunk (about.[hash].js) for this route
     //   // which is lazy-loaded when the route is visited.
     //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
     // }
]

const router = new VueRouter({
     mode: 'history',
     base: process.env.BASE_URL,
     routes,
})

export default router
