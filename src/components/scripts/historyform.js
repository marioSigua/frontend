export default {
     computed: {
          checkRoute() {
               return this.$route.name !== 'HistoryForm' ? true : false
          },

          questionList() {
               return this.$store.state.historyForm.historyList
          },

          listStudents() {
               const [subj] = this.$store.state.historyForm.listStudents.filter(
                    (v) => v.subject_code === this.$route.params.subject_code
               )

               return Object.keys(subj).length < 1 ? [] : subj.students
          },
     },

     data() {
          return {
               stdEmail: [],
          }
     },

     methods: {
          openStudentList(e) {
               if (!this.$route.params.subject_code) {
                    alert('No Subject')
                    e.preventDefault()
               } else {
                    this.$store.dispatch('getEnrolledStudents')

                    setTimeout(() => {
                         this.$bvModal.show('modal-lg')
                    }, 300)
               }
          },

          resetModal() {
               this.$nextTick(() => {
                    this.$bvModal.hide('modal-prevent-closing')
               })
          },

          async sendForm() {
               const { state } = this.$store
               try {
                    const isSuccess = await this.$axios.post(
                         `${state.BASE_URL}/resend/question`,
                         {
                              batch_number: this.$route.params.batch,
                              stdEmail: JSON.stringify(this.stdEmail),
                         }
                    )

                    if (isSuccess.status === 200) this.resetModal()
               } catch (error) {
                    console.log(error)
               }
          },
     },

     mounted() {
          this.$store.dispatch('getResponse', this.$route.params.token)
     },
}
