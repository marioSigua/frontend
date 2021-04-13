export default {
     computed: {
          questionList() {
               const { question_form } = this.$store.state.questionList
               return question_form ? JSON.parse(question_form) : []
          },
     },

     methods: {
          createStudentForm() {
               console.log(this.questionList)
          },
     },

     mounted() {
          this.$store.dispatch('getQuestion', this.$route.params.token)

          setTimeout(() => {
               console.log(this.questionList)
          }, 2000)

          document.addEventListener('contextmenu', function(e) {
               e.preventDefault()
          })

          // document.addEventListener('keydown', function(e) {
          //      e.preventDefault()

          //      // disable F12 key
          //      if (e.key == 123) {
          //           return false
          //      }

          //      // disable I key
          //      if (e.ctrlKey && e.shiftKey && e.key == 73) {
          //           return false
          //      }

          //      // disable J key
          //      if (e.ctrlKey && e.shiftKey && e.key == 74) {
          //           return false
          //      }
          //      // disable U key
          //      if (e.ctrlKey && e.key == 85) {
          //           return false
          //      }
          // })
     },
}
