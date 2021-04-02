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
                  sizeChangedBy: null,
            }
      },

      methods: {
            showSuggest() {
                  if (!this.searchList) {
                        this.initSuggest = false
                  } else {
                        if (this.autoComplete.length > 0) {
                              this.initSuggest = true
                        } else {
                              this.initSuggest = false
                        }
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
