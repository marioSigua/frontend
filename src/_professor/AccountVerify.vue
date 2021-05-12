<template>
     <div class="">
          <h1>{{ msg }}</h1>
     </div>
</template>

<script>
     export default {
          data() {
               return {
                    msg: '',
               }
          },

          methods: {
               askUser() {
                    const answer = window.confirm(
                         `Do you really want to Verify this Account ?`
                    )

                    return answer ? true : false
               },
          },

          mounted() {
               if (this.$route.params.token) {
                    const isOk = this.askUser()
                    if (isOk) {
                         this.$axios
                              .patch(
                                   `${this.$store.state.BASE_URL}/verify/account`,
                                   { studentToken: this.$route.params.token }
                              )
                              .then(({ status }) => {
                                   if (status === 200) {
                                        this.msg = 'Account Verified'
                                   }
                              })
                              .catch((err) => {
                                   this.msg = err.response.data.message
                              })
                    } else {
                         this.$router.push({ name: 'usersLogin' })
                    }
               } else {
                    this.$router.push({ name: 'usersLogin' })
               }
          },
     }
</script>
