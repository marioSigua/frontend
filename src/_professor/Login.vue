<template lang="html">
  <main>
    <nav>
      <div @click="$router.push({ name: 'signup' })" id="button">
        Sign Up
      </div>
    </nav>

    <section id="form" class="backdrop">
      <h1>Login</h1>
      <p v-show="error != ''">{{ error }}</p>
      <label for="email">Email</label>
      <!-- @input="loginValidate('email')" -->

      <input
        type="text"
        name=""
        placeholder="email"
        v-model="email"
        v-on:keyup.enter="login"
      />
      <label for="password">Password</label>
      <!-- @input="loginValidate('password')" -->

      <input
        type="password"
        name="password"
        placeholder="password"
        v-model="password"
        v-on:keyup.enter="login"
      />
      <div class="right">
        <button
          :disabled="!email && !password"
          type="button"
          name="button"
          @click="login"
        >
          Login
        </button>
      </div>
    </section>
  </main>
</template>

<script>
import validate from "../validations/validate";

export default {
  data() {
    return {
      yupOptions: { abortEarly: false, strict: false },

      email: "",
      password: "",

      error: "",

      formValidation: validate,
    };
  },
  methods: {
    // loginValidate: async function(field) {
    //      let { validateLogin } = this.formValidation
    //      try {
    //           await validateLogin.validateAt(
    //                field,
    //                { email: this.email, password: this.password },
    //                this.yupOptions
    //           )

    //           this.error = ''
    //      } catch (err) {
    //           err.inner.forEach((error) => {
    //                this.error = error.message
    //           })
    //      }
    // },

    async login() {
      try {
        if (this.error !== "") {
          return;
        } else {
          const res = await this.$axios.post(
            `${this.$store.state.BASE_URL}/accounts/login`,
            {
              email: this.email,
              password: this.password,
            }
          );
          if (res.status === 200) {
            this.$store.commit("set_cookie", res.data);
          }
        }
      } catch (error) {
        if (error.response !== undefined) {
          this.error = error.response.data.message;
        }
      }
    },
  },
  watch: {
    email(val) {
      if (val == "") {
        this.error = "Email is required";
      } else {
        this.error = "";
      }
    },

    password(val) {
      if (val == "") {
        this.error = "Password is required";
      } else {
        this.error = "";
      }
    },
  },
};
</script>

<style lang="css" scoped>
.right button {
  cursor: pointer;
  background-color: rgb(143, 32, 29);
}

button:hover {
  background-color: #5c1c1c;
}

#button:hover {
  background-color: #4c040c;
}

nav {
  cursor: pointer;
  text-align: right;
  padding: right;
  padding: 10px;
}
#button {
  color: white;
  text-align: center;

  display: inline-block;
  background: #5c1c1c;
  width: 100px;
  padding: 10px;
  border-radius: 10px;
}

main {
  background: url(https://i.imgur.com/zrr075Y.jpg);
  height: 100vh;
  width: 100%;
  background-size: cover;
  object-fit: cover;
  overflow: hidden;
}

#form {
  padding: 30px;
  border-radius: 10px;
  width: 500px;
  color: white;
  -webkit-blur: 10px;
  /* blur: 10px; */

  margin-top: 100px;
  margin-left: 125px;
  background: rgba(0, 0, 0, 0.3);
}

label,
button {
  margin-top: 20px;
  min-width: 70px;
}

@media only screen and (max-width: 540px) {
  #form {
    width: 90%;
    margin: 30px auto;
  }
}

@media only screen and (max-width: 720px) {
  #form {
    width: 90%;
    margin: 30px auto;
  }
}
</style>
