export default {
     computed: {
          checkRoute() {
               return this.$route.name !== 'HistoryForm' ? true : false
          },

          questionList() {
               return this.$store.state.questionList
          },
     },

     data() {
          return {}
     },

     mounted() {
          this.$store.dispatch('getQuestion', this.$route.params.token)
     },
}
