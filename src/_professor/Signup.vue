<template lang="html">
     <main>
          <nav>
<<<<<<< HEAD
               <div id="button">
                    Sign Up
=======
               <div @click="$router.push({ name: 'usersLogin' })" id="button">
                    Login
>>>>>>> e44ad5ada8cfe1732b873085e1b697ca62dbc4bb
               </div>
          </nav>

          <section id="form" class="backdrop">
<<<<<<< HEAD
               <h1>Login</h1>
               <p v-show="error != ''">{{ error }}</p>
               <label for="username">Username</label>
               <input
                    type="text"
                    name=""
                    placeholder="username"
                    v-model="email"
                    @input="loginValidate('email')"
               />
               <label for="password">Password</label>
               <input
                    @input="loginValidate('password')"
                    type="password"
                    name="password"
                    placeholder="password"
                    v-model="password"
=======
               <h1>Sign Up</h1>
               <p v-show="error != ''">{{ error }}</p>
               <label for="username">Email</label>
               <input
                    v-model="payload.email"
                    type="text"
                    name=""
                    placeholder="Enter your valid E-mail Address"
               />

               <label for="password">Password</label>
               <input
                    v-model="payload.password"
                    type="password"
                    placeholder="Enter your Password"
>>>>>>> e44ad5ada8cfe1732b873085e1b697ca62dbc4bb
               />

               <label for="password">Confirm Password</label>
               <input
<<<<<<< HEAD
                    @input="loginValidate('password')"
                    type="password"
                    name="password"
                    placeholder="password"
                    v-model="password"
=======
                    v-model="confirm"
                    type="password"
                    placeholder="Re-enter Password"
               />

               <label for="password">Firstname</label>
               <input
                    v-model="payload.firstname"
                    type="text"
                    placeholder="Enter your Firstname"
               />

               <label for="password">Lastname</label>
               <input
                    v-model="payload.lastname"
                    type="text"
                    placeholder="Enter your Lastname"
>>>>>>> e44ad5ada8cfe1732b873085e1b697ca62dbc4bb
               />

               <div class="right">
                    <button
<<<<<<< HEAD
                         :disabled="!email && !password"
                         type="button"
                         name="button"
                         @click="login"
=======
                         @click="createAccount"
                         type="button"
                         name="button"
                         :disabled="checkPayload"
>>>>>>> e44ad5ada8cfe1732b873085e1b697ca62dbc4bb
                    >
                         Login
                    </button>
               </div>
          </section>
     </main>
</template>

<script>
<<<<<<< HEAD
     import validate from '../validations/validate'

     export default {
          data() {
               return {
                    yupOptions: { abortEarly: false, strict: false },

                    email: '',
                    password: '',

                    error: '',

                    formValidation: validate,
               }
          },
          methods: {
               loginValidate: async function(field) {
                    let { validateLogin } = this.formValidation
                    try {
                         await validateLogin.validateAt(
                              field,
                              { email: this.email, password: this.password },
                              this.yupOptions
                         )

                         this.error = ''
                    } catch (err) {
                         err.inner.forEach((error) => {
                              this.error = error.message
                         })
                    }
               },

               async login() {
                    try {
                         const res = await this.$axios.post(
                              `${this.$store.state.BASE_URL}/accounts/login`,
                              { email: this.email, password: this.password }
                         )
                         if (res.status === 200) {
                              this.$store.commit('set_cookie', res.data)
=======
     export default {
          computed: {
               checkPayload() {
                    return Object.values(this.payload).some((k) => k === '')
               },

               checkPass() {
                    return this.passValidation.test(this.payload.password)
               },

               checkEmail() {
                    return this.emailValidation.test(this.payload.email)
               },
          },

          data() {
               return {
                    error: '',

                    payload: {
                         email: '',
                         password: '',
                         firstname: '',
                         lastname: '',
                    },

                    confirm: '',

                    emailValidation: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    passValidation: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                    passwordErr: `password must contain Minimum eight characters,
     at least one uppercase letter,
     one lowercase letter and one number`,

                    state: this.$store.state,
               }
          },

          methods: {
               async createAccount() {
                    try {
                         if (this.checkPayload) {
                              alert('Please Fill up All the fields')
                              return
                         } else if (!this.checkEmail) {
                              this.error = 'Please Enter a valid Email'
                              return
                         } else if (!this.checkPass) {
                              this.error = this.passwordErr
                              return
                         }

                         const { status } = await this.$axios.post(
                              `${this.state.BASE_URL}/accounts/signup`,
                              this.payload
                         )

                         if (status === 200) {
                              this.$router.push({ name: 'usersLogin' })
>>>>>>> e44ad5ada8cfe1732b873085e1b697ca62dbc4bb
                         }
                    } catch (error) {
                         if (error.response !== undefined) {
                              this.error = error.response.data.message
                         }
                    }
               },
          },
<<<<<<< HEAD
          watch: {
               email(val) {
                    if (val == '') {
                         this.error = 'Username is required'
                    } else {
                         this.error = ''
                    }
               },

               password(val) {
                    if (val == '') {
                         this.error = 'Password is required'
                    } else {
                         this.error = ''
                    }
=======

          watch: {
               'payload.email'(val) {
                    if (!val) {
                         this.error = 'email is required'
                         return
                    } else if (!this.emailValidation.test(val)) {
                         this.error = 'Please enter a valid email'
                         return
                    }

                    this.error = ''
               },

               'payload.password'(val) {
                    if (!val) {
                         this.error = 'Password is required'
                         return
                    } else if (!this.passValidation.test(val)) {
                         this.error = this.passwordErr
                         return
                    }

                    this.error = ''
               },

               confirm(val) {
                    if (!val) {
                         this.error = 'Please Confirm your Password'
                         return
                    } else if (this.payload.password !== val) {
                         this.error = 'Password doesnt match'
                         return
                    }

                    this.error = ''
               },

               'payload.firstname'(val) {
                    if (!val) {
                         this.error = 'Firstname is required'
                         return
                    }

                    this.error = ''
               },

               'payload.lastname'(val) {
                    if (!val) {
                         this.error = 'Lastname is required'
                         return
                    }

                    this.error = ''
>>>>>>> e44ad5ada8cfe1732b873085e1b697ca62dbc4bb
               },
          },
     }
</script>

<style lang="css" scoped>
     nav {
          text-align: right;
          padding: right;
          padding: 10px;
     }
     #button {
          color: white;
          text-align: center;
<<<<<<< HEAD

=======
>>>>>>> e44ad5ada8cfe1732b873085e1b697ca62dbc4bb
          display: inline-block;
          background: black;
          width: 100px;
          padding: 10px;
          border-radius: 10px;
     }
<<<<<<< HEAD

=======
>>>>>>> e44ad5ada8cfe1732b873085e1b697ca62dbc4bb
     #form {
          padding: 30px;
          border-radius: 10px;
          width: 500px;
          color: white;
          -webkit-blur: 10px;
          /* blur: 10px; */
<<<<<<< HEAD

=======
>>>>>>> e44ad5ada8cfe1732b873085e1b697ca62dbc4bb
          margin-top: 100px;
          margin-left: 100px;
          background: rgba(0, 0, 0, 0.3);
     }
<<<<<<< HEAD

=======
>>>>>>> e44ad5ada8cfe1732b873085e1b697ca62dbc4bb
     label,
     button {
          margin-top: 20px;
          min-width: 70px;
     }
<<<<<<< HEAD

=======
>>>>>>> e44ad5ada8cfe1732b873085e1b697ca62dbc4bb
     @media only screen and (max-width: 540px) {
          #form {
               width: 90%;
               margin: 30px auto;
          }
     }
<<<<<<< HEAD

=======
>>>>>>> e44ad5ada8cfe1732b873085e1b697ca62dbc4bb
     @media only screen and (max-width: 720px) {
          #form {
               width: 90%;
               margin: 30px auto;
          }
     }
<<<<<<< HEAD


     
</style>


=======
</style>
>>>>>>> e44ad5ada8cfe1732b873085e1b697ca62dbc4bb
