import Vue from 'vue'
import Vuex from 'vuex'
import * as Cookies from 'js-cookie'
import router from '../router/index'
import createPersistedState from 'vuex-persistedstate'
import axios from 'axios'
Vue.use(Vuex)

const logout = () => {
      return {
            access_token: '',
            isAuth: false,
      }
}

export default new Vuex.Store({
      // object
      state: {
            BASE_URL: 'http://192.168.1.12:5115/api/p1',
            access_token: '',
            token_name: '',
            isAuth: false,

            calculator: {
                  listStudents: [],
                  listSubjects: [],
                  listGrades: '',
            },
      },

      // pang edit ng state
      // this.$store.commit(nameofmut, payload!null)
      mutations: {
            resetState(state) {
                  Cookies.remove(state.token_name, {
                        path: '/',
                        domain: 'localhost',
                  })
                  const logoutUser = logout()
                  Object.keys(logoutUser).forEach((k) => {
                        console.log(k)
                        state[k] = logoutUser[k]
                  })

                  localStorage.removeItem('vuex')
                  router.push({ name: 'usersLogin' })
            },

            getSubjects(state, payload) {
                  state.calculator.listSubjects = payload.data
            },

            getStudents(state, payload) {
                  state.calculator.listStudents = payload.data
            },

            remove_cookie(state) {
                  Cookies.remove(state.token_name, {
                        path: '/',
                        domain: 'localhost',
                  })
            },

            set_cookie(state, payload) {
                  state.access_token = payload.token
                  state.token_name = payload.name
                  state.isAuth = true

                  Cookies.set(state.token_name, state.access_token, {
                        expires: 1,
                  })
                  router.push({ name: 'calculator' })
            },
      },
      // mga functions
      // this.$store.dispatch(nameofact, payload=={})
      actions: {
            //payload = object
            async getSubjects({ commit, state }) {
                  try {
                        const subjects = await axios.get(
                              `${state.BASE_URL}/list/subjects`
                        )

                        if (subjects.status === 200) {
                              commit('getSubjects', subjects)
                        }
                  } catch (error) {
                        console.log(error.response)
                  }
            },

            async getStudents({ commit, state }, subject_code) {
                  try {
                        const students = await axios.get(
                              `${state.BASE_URL}/list/students/${subject_code}`
                        )

                        if (students.status === 200) {
                              commit('getStudents', students)
                        }
                  } catch (error) {
                        console.log(error.response)
                  }
            },

            async getStudentGrade({ state }, payload) {
                  try {
                        console.log(payload)
                        const students = await axios.get(
                              `${state.BASE_URL}/subjectGrade/listGrade`,
                              {
                                    params: { ...payload },
                              }
                        )

                        if (students.status === 200) {
                              console.log(students.data)
                              if (students.data.prelim_grade) {
                                    state.calculator.listGrades =
                                          students.data.prelim_grade
                              } else if (students.data.midterm_grade) {
                                    state.calculator.listGrades =
                                          students.data.midterm_grade
                              } else {
                                    state.calculator.listGrades =
                                          students.data.finals_grade
                              }
                        }
                  } catch (error) {
                        console.log(error.response)
                  }
            },

            async updateGrade({ state }, payload) {
                  try {
                        const grade = await axios.patch(
                              `${state.BASE_URL}/subjectGrade/students`,
                              payload
                        )
                        console.log(grade)
                  } catch (error) {
                        console.log(error.response)
                  }
            },
      },
      // dependencies
      modules: {},

      plugins: [
            createPersistedState({
                  paths: ['access_token', 'isAuth'],
            }),
      ],
})
