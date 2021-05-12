import Vue from "vue";
import Vuex from "vuex";
import * as Cookies from "js-cookie";
import router from "@/_professor/dependencies/router";
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

// Database ------------------------------------
// Database ------------------------------------
// Database ------------------------------------
// Database ------------------------------------
// Database ------------------------------------

// To do:

// Return values instead of commiting
// handle values in their respective vues to isolate data

const DATABASE = {
  async getQuestion({ state }, payload) {
    try {
      const { status, data } = await axios.get(
        `${state.BASE_URL}/student/question/${payload.token}/${payload.student_id}`
      );

      if (status === 200) {
        return data;
      }
    } catch (error) {
      throw error.response;
    }
  },

  async getResponse({ state }, payload) {
    try {
      const { status, data } = await axios.get(
        `${state.BASE_URL}/student/response/${payload}`
      );

      if (status === 200) {
        return data;
      }
    } catch (error) {
      console.log(error.response);
    }
  },

  async getSubjects({ state }) {
    try {
      const { data, status } = await axios.get(
        `${state.BASE_URL}/list/subjects`
      );
      if (status === 200) {
        return data;
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
          return students.data;
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
        return students.data;
      }
    } catch (error) {
      console.log(error.response);
    }
  },

  // get all isOccupied subject where account_id matches
  async profSubjects({ state, commit }) {
    try {
      const subjs = await axios.get(`${state.BASE_URL}/assigned/subjects`, {
        headers: { Authorization: this.getters.isLoggedIn },
      });
      if (subjs.status === 200) return subjs.data;
    } catch (error) {
      if (error.response !== undefined) {
        if (error.response.data.message === "jwt expired") {
          commit("resetState");
        }
      }
    }
  },

  async getEnrolledStudents({ state, commit }) {
    try {
      const subjs = await axios.get(`${state.BASE_URL}/enrolled/students`, {
        headers: { Authorization: this.getters.isLoggedIn },
      });
      if (subjs.status === 200) return subjs.data;
    } catch (error) {
      if (error.response !== undefined) {
        if (error.response.data.message === "jwt expired") {
          commit("resetState");
        }
      }
    }
  },

  async updateGrade({ state }, payload) {
    try {
      const { status } = await axios.patch(
        `${state.BASE_URL}/subjectGrade/students`,
        payload
      );
      return status;
    } catch (error) {
      console.log(error.response);
    }
  },
};

export default new Vuex.Store({
  // object
  state: {
    BASE_URL: "http://192.168.18.7:5115/api/p1",
    // BASE_URL: "https://api.scanolongapo.com//api/p1",

    access_token: "",
    token_name: "",
    isAuth: false,

    userProfile: {},

    // to isolate
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
    // end of isolate

    openModal: false,

    openAccordion: "",
  },

  getters: {
    // to check if there is any current user logged in on current device
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
    // to remove current logged in user and cookies
    resetState(state) {
      Cookies.remove(state.token_name, {
        path: "/",
        domain: "lsb.scanolongapo.com",
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
        domain: "lsb.scanolongapo.com",
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
    ...DATABASE,
  },

  plugins: [
    createPersistedState({
      paths: ["access_token", "isAuth", "token_name", "userProfile"],
    }),
  ],
});
