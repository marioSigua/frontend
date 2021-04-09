import nav from '../navbar'
export default {
      computed: {
            listSubjs() {
                  return this.$store.state.subjectList
            },

            autoComplete() {
                  const { listSubjects } = this.$store.state.calculator

                  return !this.searchList
                        ? []
                        : listSubjects.filter((item) => {
                                return this.searchList
                                      .toLowerCase()
                                      .split(' ')
                                      .every((v) =>
                                            item.subject_name
                                                  .toLowerCase()
                                                  .includes(v)
                                      )
                          })
            },

            foundData() {
                  return this.autoComplete.find(
                        (o) => o.subject_name === this.searchList
                  )
            },
      },

      components: {
            navbar: nav,
      },

      data() {
            return {
                  initSuggest: false,

                  options: {
                        semester: ['1st SEMESTER', '2nd SEMESTER'],
                        course: [
                              'BSCpE',
                              'BSEE',
                              'BSECE',
                              'BSIE',
                              'BS Architecture',
                        ],

                        year: [
                              '1st Year',
                              '2nd Year',
                              '3rd Year',
                              '4th Year',
                              '5th Year',
                        ],
                  },

                  searchList: '',

                  payload: {
                        subject_code: '',
                        subject_course: '',
                        subject_desc: '',
                        subject_sem: '',
                        subject_year: '',
                  },

                  sizeChangedBy: null,

                  optionVal: '',
            }
      },

      methods: {
            sendDispatch() {
                  if (this.foundData) {
                        this.patchRequest(this.foundData.subject_code)
                  } else {
                        this.patchRequest(this.payload.subject_code)
                  }
            },

            sendToStudentList(id) {
                  this.$store.state.openAccordion = id
            },

            getSubjectValues(obj) {
                  console.log(obj)
                  this.payload = { ...obj }
            },

            async patchRequest(subject_code) {
                  try {
                        const grade = await this.$axios.patch(
                              `${this.$store.state.BASE_URL}/add/prof/subjects`,
                              { subject_code },
                              {
                                    headers: {
                                          Authorization: this.$store.getters
                                                .isLoggedIn,
                                    },
                              }
                        )
                        if (grade.status === 200) {
                              this.$store.dispatch('profSubjects')

                              Object.keys(this.payload).forEach(
                                    (k) => (this.payload[k] = '')
                              )

                              this.searchList = ''
                        }
                  } catch (error) {
                        console.log(error.response)
                  }
            },
      },

      mounted() {
            this.$store.dispatch('profSubjects')

            setTimeout(() => {
                  this.$store.dispatch('getSubjects')
            }, 2000)
      },
}
