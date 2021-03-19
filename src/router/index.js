import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/index";
Vue.use(VueRouter);

const routes = [
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
    path: "/auth/calculator",
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
        path: "",
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
