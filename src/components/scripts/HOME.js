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
      },

      components: {
            navbar: nav,
      },

      data() {
            return {
                  initSuggest: false,

                  options: [],

                  selected: [],

                  searchList: '',

                  payload: {},
                  sizeChangedBy: null,

                  optionVal: '',
            }
      },

      methods: {
            showSuggest(e) {
                  let val = e.target.value

                  console.log(e.target.value)
                  if (val) {
                        this.optionVal = val
                  }
                  e.target.value = ''
            },

            sendToStudentList(id) {
                  this.$store.state.openAccordion = id
            },

            getSubjectValues(obj) {
                  console.log(obj)
                  this.payload = { ...obj }
                  console.log(this.payload)
            },
      },

      mounted() {
            this.$store.dispatch('profSubjects')

            setTimeout(() => {
                  this.$store.dispatch('getSubjects')
            }, 2000)
      },
}
