import Vue from "vue";
import Vuex from "vuex";
import * as Cookies from "js-cookie";
import router from "../router/index";
import createPersistedState from "vuex-persistedstate";
import axios from "axios";
Vue.use(Vuex);

export default new Vuex.Store({
  // object
  state: {
    BASE_URL: "http://192.168.18.7:5115/api/p1",
    access_token: "",
    token_name: "",
    isAuth: false,

    calculator: {
      listStudents: [],
      listSubjects: [],
    },
  },

  // pang edit ng state
  // this.$store.commit(nameofmut, payload!null)
  mutations: {
    getSubjects(state, payload) {
      state.calculator.listSubjects = payload.data;
    },

    getStudents(state, payload) {
      console.log(payload);

      state.calculator.listStudents = payload.data;
    },

    remove_cookie(state) {
      Cookies.remove(state.token_name, {
        path: "/",
        domain: "localhost",
      });
    },

    set_cookie(state, payload) {
      state.access_token = payload.token;
      state.token_name = payload.name;
      state.isAuth = true;

      Cookies.set(state.token_name, state.access_token, {
        expires: 1,
      });
      router.push({ name: "calculator" });
    },
  },
  // mga functions
  // this.$store.dispatch(nameofact, payload=={})
  actions: {
    //payload = object
    async getSubjects({ commit, state }) {
      try {
        const subjects = await axios.get(`${state.BASE_URL}/list/subjects`);

        if (subjects.status === 200) {
          commit("getSubjects", subjects);
        }
      } catch (error) {
        console.log(error.response);
      }
    },

    async getStudents({ commit, state }, subject_code) {
      try {
        const students = await axios.get(
          `${state.BASE_URL}/list/students/${subject_code}`
        );

        if (students.status === 200) {
          console.log(students);
          commit("getStudents", students);
        }
      } catch (error) {
        console.log(error.response);
      }
    },
  },
  // dependencies
  modules: {},

  plugins: [
    createPersistedState({
      paths: ["access_token", "isAuth"],
    }),
  ],
});
