export default {
  computed: {
    batchToken() {
      return this.$route.params.token;
    },

    idToken() {
      return this.$route.params.student_id;
    },

    state() {
      return this.$store.state;
    },

    student() {
      return this.profile;
    },

    responseList() {
      return this.list;
    },

    listFormNum() {
      return this.responseList.map((k) => {
        if (k.type === "Essay") {
          return k.form_number;
        }
      });
    },
  },

  data() {
    return {
      profile: {},

      list: [],
    };
  },

  methods: {
    async submitScore() {
      try {
        const mappedList = this.responseList.map((k) => {
          if (k.type === "Essay") {
            return parseInt(k.student_score);
          }
        });

        await this.$axios.patch(`${this.state.BASE_URL}/essay/score`, {
          batch_token: this.batchToken,
          id_token: this.idToken,
          formNumber: this.listFormNum,
          formList: mappedList,
        });
      } catch (error) {
        console.log(error.response);
      }
    },
  },

  async mounted() {
    try {
      const { data, status } = await this.$axios.get(
        `${this.state.BASE_URL}/viewing/student/form/${this.batchToken}/${this.idToken}`
      );

      console.log(data);

      if (status === 200) {
        this.list = data.list;
        this.profile = data.profile;
      }
    } catch (error) {
      console.log(error.response);
    }
  },
};
