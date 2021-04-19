import Vue from "vue";
import Vuex from "vuex";
import * as Cookies from "js-cookie";
import router from "../router/index";
import createPersistedState from "vuex-persistedstate";
import axios from "axios";
Vue.use(Vuex);

const logout = () => {
  return {
    access_token: "",
    isAuth: false,
    userProfile: {},
    token_name: "",
  };
};

const routeNames = {
  calculator: "calculator",
  exam: "usersExam",
  studentList: "studentList",
  HistoryForm: "HistoryForm",
  examform: "examform",
};

export default new Vuex.Store({
  // object
  state: {
    BASE_URL: "http://192.168.18.7:5115/api/p1",
    access_token: "",
    token_name: "",
    isAuth: false,

    userProfile: {},

    calculator: {
      listStudents: [],
      listSubjects: [],
      listGrades: "",
    },

    exam: {
      listStudents: [],
    },

    studentList: {
      students: [],
    },

    subjectList: [],

    //sa examform to
    questionList: [],

    historyForm: {
      historyList: [],
      listStudents: [],
    },

    openModal: false,

    openAccordion: "",
  },

  getters: {
    isLoggedIn: (state) => {
      if (!Cookies.get(state.token_name)) {
        return false;
      } else {
        return Cookies.get(state.token_name);
      }
    },
  },
  // pang edit ng state
  // this.$store.commit(nameofmut, payload!null)
  mutations: {
    resetState(state) {
      Cookies.remove(state.token_name, {
        path: "/",
        domain: "localhost",
      });
      const logoutUser = logout();

      Object.keys(logoutUser).forEach((k) => {
        state[k] = logoutUser[k];
      });

      localStorage.removeItem("vuex");
      router.push({ name: "usersLogin" });
    },

    getSubjects(state, payload) {
      state.calculator.listSubjects = payload.data;
    },

    getStudents(state, payload) {
      if (router.currentRoute.name === routeNames.exam) {
        //pag nsa route ng exam
        state.exam.listStudents = payload;
      } else if (router.currentRoute.name === routeNames.studentList) {
        //pag nsa route ng student list
        state.studentList.students = payload;
      } else if (router.currentRoute.name === routeNames.HistoryForm) {
        //pag nsa route ng history form
        state.historyForm.listStudents = payload;
      } else {
        state.calculator.listStudents = payload;
      }
    },

    getQuestion(state, payload) {
      if (router.currentRoute.name === routeNames.examform) {
        state.questionList = payload;
      } else if (router.currentRoute.name === routeNames.HistoryForm) {
        state.historyForm.historyList = payload;
      }
    },

    profSubjects(state, payload) {
      state.subjectList = payload;
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
      state.userProfile = { ...payload.profile };

      Cookies.set(state.token_name, state.access_token, {
        expires: 1,
      });
      router.push({ name: "home" });
    },
  },
  // mga functions
  // this.$store.dispatch(nameofact, payload=={})
  actions: {
    async getQuestion({ commit, state }, payload) {
      try {
        const { status, data } = await axios.get(
          `${state.BASE_URL}/student/question/${payload}`
        );

        if (status === 200) {
          commit("getQuestion", data);
        }
      } catch (error) {
        console.log(error.response);
      }
    },

    async getResponse({ commit, state }, payload) {
      try {
        const { status, data } = await axios.get(
          `${state.BASE_URL}/student/response/${payload}`
        );

        if (status === 200) {
          commit("getQuestion", data);
        }
      } catch (error) {
        console.log(error.response);
      }
    },

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
        if (!subject_code) {
          commit("getStudents", []);
        } else {
          const students = await axios.get(
            `${state.BASE_URL}/list/students/${subject_code}`
          );
          if (students.status === 200) {
            commit("getStudents", students.data);
          }
        }
      } catch (error) {
        console.log(error.response);
      }
    },

    async getStudentGrade({ state }, payload) {
      try {
        const students = await axios.get(
          `${state.BASE_URL}/subjectGrade/listGrade`,
          {
            params: { ...payload },
          }
        );

        if (students.status === 200) {
          if (students.data.prelim_grade) {
            state.calculator.listGrades = students.data.prelim_grade;
          } else if (students.data.midterm_grade) {
            state.calculator.listGrades = students.data.midterm_grade;
          } else {
            state.calculator.listGrades = students.data.finals_grade;
          }
        }
      } catch (error) {
        console.log(error.response);
      }
    },

    async profSubjects({ state, commit }) {
      try {
        const subjs = await axios.get(`${state.BASE_URL}/assigned/subjects`, {
          headers: {
            Authorization: this.getters.isLoggedIn,
          },
        });

        if (subjs.status === 200) commit("profSubjects", subjs.data);
      } catch (error) {
        console.log(error.response);
      }
    },

    async getEnrolledStudents({ state, commit }) {
      try {
        const subjs = await axios.get(`${state.BASE_URL}/enrolled/students`, {
          headers: {
            Authorization: this.getters.isLoggedIn,
          },
        });

        if (subjs.status === 200) commit("getStudents", subjs.data);
      } catch (error) {
        console.log(error.response);
      }
    },

    async updateGrade({ state }, payload) {
      try {
        await axios.patch(`${state.BASE_URL}/subjectGrade/students`, payload);
      } catch (error) {
        console.log(error.response);
      }
    },
  },
  // dependencies
  modules: {},

  plugins: [
    createPersistedState({
      paths: ["access_token", "isAuth", "token_name", "userProfile"],
    }),
  ],
});
