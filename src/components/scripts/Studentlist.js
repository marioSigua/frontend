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
            }
      },

      methods: {
            toggleDetails(row) {
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
      },

      mounted() {
            this.$store.dispatch('getEnrolledStudents')

            console.log(this.$store.state.openAccordion)
      },
}
