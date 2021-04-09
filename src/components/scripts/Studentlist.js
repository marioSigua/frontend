import nav from '../navbar'
export default {
      components: {
            navbar: nav,
      },

      computed: {
            subjectList() {
                  return this.$store.state.subjectList
            },
      },

      data() {
            return {
                  fields: [
                        {
                              key: 'student_id',
                              sortable: true,
                        },
                        {
                              key: 'lastname',
                              sortable: true,
                        },
                        {
                              key: 'firstname',
                              sortable: false,
                        },
                        {
                              key: 'student_course',
                              label: 'Course',
                              sortable: true,
                              // Variant applies to the whole column, including the header and footer
                              // variant: 'danger'
                        },

                        'show_details',

                        'drop_students',
                  ],

                  items: [
                        {
                              Course: 'BSEE',
                              first_name: 'Dickerson',
                              last_name: 'Macdonald',
                              Student_ID: '2015020055',
                        },
                        {
                              Course: 'BSCOE',
                              first_name: 'Larsen',
                              last_name: 'Shaw',
                              Student_ID: '2015020055',
                        },
                        {
                              Course: 'BSECE',
                              first_name: 'Geneva',
                              last_name: 'Wilson',
                              Student_ID: '2015020055',
                        },
                        {
                              Course: 'BSEEE',
                              first_name: 'Jami',
                              last_name: 'Carney',
                              Student_ID: '2015020055',
                        },
                  ],

                  engrCourse: [
                        'BSCpE',
                        'BSEE',
                        'BSECE',
                        'BSIE',
                        'BS Architecture',
                  ],

                  payload: {
                        student_id: '',
                        student_email: '',
                        firstname: '',
                        lastname: '',
                        student_course: '',
                  },

                  subjectInfo: {},

                  nameState: null,
            }
      },

      methods: {
            async dropStudent(student) {
                  const { state } = this.$store
                  try {
                        const deactStudent = await this.$axios.patch(
                              `${state.BASE_URL}/drop/students`,
                              student
                        )
                        if (deactStudent.status === 200)
                              this.$store.dispatch('getEnrolledStudents')
                  } catch (error) {
                        console.log(error.response)
                  }
            },

            toggleDetails(row) {
                  console.log(row)
                  if (row._showDetails) {
                        this.$set(row, '_showDetails', false)
                  } else {
                        this.currentItems.forEach((item) => {
                              this.$set(item, '_showDetails', false)
                        })

                        this.$nextTick(() => {
                              this.$set(row, '_showDetails', true)
                        })
                  }
            },

            getSubjectCode(code) {
                  const { subject_code, subject_sem } = code
                  this.subjectInfo = { subject_code, subject_sem }
                  console.log(this.subjectInfo)
            },

            checkFormValidity() {
                  const valid = this.$refs.form.checkValidity()

                  return valid
            },

            resetModal() {
                  Object.keys(this.payload).some((k) => (this.payload[k] = ''))
            },

            async handleOk(bvModalEvt) {
                  const { state } = this.$store,
                        sendDispatch = { ...this.payload, ...this.subjectInfo }
                  try {
                        // Prevent modal from closing
                        bvModalEvt.preventDefault()

                        const checkifEmpty = Object.values(this.payload).every(
                              (v) => v !== ''
                        )

                        if (checkifEmpty) {
                              const postResponse = await this.$axios.post(
                                    `${state.BASE_URL}/add/students`,
                                    sendDispatch
                              )

                              if (postResponse.status === 200) {
                                    this.$store.dispatch('getEnrolledStudents')
                                    this.resetModal
                              }
                        }
                        // Trigger submit handler
                        this.handleSubmit()
                  } catch (error) {
                        console.log(error)
                  }
            },

            handleSubmit() {
                  // Exit when the form isn't valid
                  if (!this.checkFormValidity()) {
                        return
                  }

                  // Hide the modal manually
                  this.$nextTick(() => {
                        this.$bvModal.hide('modal-prevent-closing')
                  })
            },

            loadAccordion(code) {
                  const { subject_code, subject_sem } = code
                  if (this.$store.state.openAccordion === subject_code) {
                        this.subjectInfo = { subject_code, subject_sem }
                        return true
                  } else {
                        return false
                  }
            },
      },

      mounted() {
            this.$store.dispatch('getEnrolledStudents')
      },
}
