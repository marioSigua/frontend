import nav from '../navbar'
export default {
      computed: {
            listSubjs() {
                  return this.$store.state.subjectList
            },
      },

      components: {
            navbar: nav,
      },

      data() {
            return {
                  options: [],

                  selected: [],
            }
      },

      mounted() {
            this.$store.dispatch('profSubjects')
      },
}
