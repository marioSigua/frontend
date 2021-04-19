export default {
     computed: {
          questionList() {
               return this.$store.state.questionList
          },

          checkRoute() {
               return this.$route.name !== 'HistoryForm' ? true : false
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
                    //aayusin ko pa
                    delete k.question_image
                    delete k.question_text
                    delete k.choices
                    delete k.form_answer
                    delete k.created_at
                    delete k.updated_at
                    delete k.topic
                    delete k.term
                    delete k.format
                    delete k.type
                    delete k.question_id

                    return {
                         student_answer: k.student_answer,
                         firstname: this.fname,
                         lastname: this.lname,
                         student_id: this.student_id,
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
     },

     mounted() {
          this.$store.dispatch('getQuestion', this.$route.params.token)

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
