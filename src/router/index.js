import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/index";
Vue.use(VueRouter);

const routes = [
  {
    path: "/auth/exam",
    name: "usersExam",
    component: () =>
      import(/* webpackChunkName: "usersExam" */ "../components/Exam.vue"),
  },

  {
    path: "/",
    name: "usersLogin",
    component: () =>
      import(/* webpackChunkName: "usersLogin" */ "../components/Login.vue"),

    beforeEnter(to, from, next) {
      if (store.state.isAuth) {
        next({ name: "calculator" });
      } else {
        next();
      }
    },
  },

  {
    path: "/auth/professor",
    component: () =>
      import(/* webpackChunkName: "calculator" */ "../views/index-view.vue"),

    beforeEnter(to, from, next) {
      if (store.state.isAuth) {
        next();
      } else {
        next({ name: "usersLogin" });
      }
    },

    children: [
      {
        path: "/auth/home",
        name: "home",
        component: () =>
          import(/* webpackChunkName: "home" */ "../components/Home.vue"),
      },

      {
        path: "/auth/calculator",
        name: "calculator",
        component: () =>
          import(
            /* webpackChunkName: "calculator" */ "../components/calculator.vue"
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
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
