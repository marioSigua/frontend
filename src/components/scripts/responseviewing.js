export default {
     computed: {
          batchToken() {
               return this.$route.params.token
          },

          idToken() {
               return this.$route.params.student_id
          },

          state() {
               return this.$store.state
          },

          student() {
               return this.profile
          },

          responseList() {
               return this.list
          },
     },

     data() {
          return {
               profile: {},

               list: [],
          }
     },

     async mounted() {
          try {
               const { data, status } = await this.$axios.get(
                    `${this.state.BASE_URL}/viewing/student/form/${this.batchToken}/${this.idToken}`
               )

               if (status === 200) {
                    this.list = data.list
                    this.profile = data.profile
               }
          } catch (error) {
               console.log(error.response)
          }
     },
}
