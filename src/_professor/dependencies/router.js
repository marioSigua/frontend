import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/_professor/dependencies/store'
Vue.use(VueRouter)


const debug = true;
let authenticate = (to, from, next)=>{
  console.log('Before Enter: Auth');
  if (debug){ next(); return }
  else if (store.state.isAuth) { next() }
  else { next({ name: 'usersLogin' }) }
}




const professor = {
     path: '/auth/professor',
     component: () => import('@/_professor/main.vue' ),
     beforeEnter:authenticate,
     children: [
        {
           path: '',
           name: 'home',
           component: () => import('@/_professor/_home/index.vue'),
        },
        {
           path: 'calculator',
           name: 'calculator',
           component: () => import( '@/_professor/_calculator/index.vue'),
        },
        {
           path: 'studentlist',
           name: 'studentList',
           component: () => import('@/_professor/_students/index.vue'),
        },
        {
           path: 'exam',
           name: 'exam',
           component: () =>import( '@/_professor/_exam/index.vue'),
        },
        {
           path: 'history',
           name: 'history',
           component: () =>import( '@/_professor/_history/index.vue'),
        },
      ],
}






const routes = [
    {
       path: '/',
       redirect:'/login'
    },
   {
      path: '/login',
      name: 'usersLogin',
      component: () => import( '@/_professor/Login.vue'),
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
      path: '/student/question/form/:token',
      name: 'examform',
      component: () => import( '@/_professor/_exam/studentForm.vue' ),
   },
   professor,
]

const router = new VueRouter({
     mode: 'history',
     base: process.env.BASE_URL,
     routes,
})

export default router
