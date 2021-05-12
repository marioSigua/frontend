import validate from "../../validations/validate";

export default {
  data() {
    return {
      showregister: false,

      isregistered: false,

      loginErrors: {
        email: "",
        password: "",
      },

      registerErrors: {
        email: "",
        password: "",
        confirm: "",
        account_type: "",
      },

      yupOptions: { abortEarly: false, strict: false },
      inputCredentials: {
        email: "",
        password: "",
      },

      registerCredentials: {
        email: "",
        password: "",
        confirm: "",
        account_type: "",
      },
    };
  },

  methods: {
    loginValidate: async function(field) {
      let { validateLogin } = validate;
      try {
        await validateLogin.validateAt(
          field,
          this.inputCredentials,
          this.yupOptions
        );
        this.loginErrors[field] = "";
      } catch (err) {
        err.inner.forEach((error) => {
          this.loginErrors[error.path] = error.message;
        });
      }
    },
    registerValidate: async function(field) {
      let { registerIsValid } = validate;
      try {
        await registerIsValid.validateAt(
          field,
          this.registerCredentials,
          this.yupOptions
        );
        this.registerErrors[field] = "";
      } catch (err) {
        err.inner.forEach((error) => {
          this.registerErrors[error.path] = error.message;
        });
      }
    },

    async sendRegistration() {
      let { registerIsValid } = validate;
      try {
        const valid = await registerIsValid.validate(
          this.registerCredentials,
          this.yupOptions
        );
        if (valid) {
          delete this.registerCredentials.confirm;
          const res = await this.$axios.post(
            `${this.stateVariables.BASE_URL}/accounts/signup`,
            this.registerCredentials
          );

          if (res.status === 200) {
            this.$store.state.openModal = true;
            Object.keys(this.registerCredentials).forEach((k) => {
              this.registerCredentials[k] = "";
            });

            this.showregister = false;
          }
        }
      } catch (err) {
        console.log(err);
        if (err.response !== undefined) {
          this.registerErrors.email = err.response.data.message;
        } else {
          err.inner.forEach((error) => {
            this.registerErrors[error.path] = error.message;
          });
        }
      }
    },

    async sendLogin() {
      let { validateLogin } = validate;
      try {
        const valid = await validateLogin.validate(
          this.inputCredentials,
          this.yupOptions
        );
        if (valid) {
          const res = await this.$axios.post(
            `${this.stateVariables.BASE_URL}/accounts/login`,
            this.inputCredentials
          );

          if (res.status === 200) {
            this.$store.commit("set_cookie", res.data);
          }
        }
      } catch (err) {
        if (err.response !== undefined) {
          if (err.response.data.message.includes("password")) {
            this.loginErrors.password = err.response.data.message;
          } else {
            this.loginErrors.email = err.response.data.message;
          }
        } else {
          if (err.inner === undefined) {
            return false;
          } else {
            err.inner.forEach((error) => {
              if (error.path in this.loginErrors) {
                this.loginErrors[error.path] = error.message;
              }
              if (error.path in this.loginErrors) {
                this.loginErrors[error.path] = error.message;
              }
            });
          }
        }
      }
    },
  },

  computed: {
    stateVariables() {
      return this.$store.state;
    },
  },
};
