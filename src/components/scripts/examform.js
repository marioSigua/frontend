export default {
     computed: {
          questionList() {
               return this.$store.state.questionList
          },

          checkRoute() {
               return this.$route.name !== 'HistoryForm' ? true : false
          },

          hasError() {
               return this.$store.state.errorMessage
          },
     },

     data() {
          return {
               student_id: '',
               fname: '',
               lname: '',
          }
     },

     methods: {
          async createStudentForm() {
               const { state } = this.$store

               const dispatch = this.questionList.map((k) => {
                    const isCorrect =
                         k.form_answer.toLowerCase() ===
                              k.student_answer.toLowerCase() ||
                         k.form_answer.toUpperCase() ===
                              k.student_answer.toUpperCase()
                              ? true
                              : false

                    return {
                         student_answer: k.student_answer,
                         student_score: isCorrect ? k.question_score : 0,
                         student_id: this.$route.params.student_id,
                         batch_number: k.batch_number,
                         form_number: k.form_number,
                         subject_code: k.subject_code,
                    }
               })
               try {
                    const isSuccess = await this.$axios.post(
                         `${state.BASE_URL}/student/response`,
                         { questionList: dispatch }
                    )

                    if (isSuccess.status === 200) console.log(1)
               } catch (error) {
                    console.log(error.response)
               }
          },

          isMatch(key) {
               return (
                    key.form_answer.toLowerCase() ===
                         key.student_answer.toLowerCase() ||
                    key.form_answer.toUpperCase() ===
                         key.student_answer.toUpperCase()
               )
          },
     },

     mounted() {
          const payload = {
               token: this.$route.params.token,
               student_id: this.$route.params.student_id,
          }

          this.$store.dispatch('getQuestion', payload)

          setTimeout(() => {
               console.log(this.questionList)
          }, 2000)
          // document.addEventListener('contextmenu', function(e) {
          //      e.preventDefault()
          // })

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
