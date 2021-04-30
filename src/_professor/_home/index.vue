<template lang="html">
  <section id="home">
    <h1>Home</h1>
    <addSub></addSub>

    <div id="cards">
      <card
        v-for="subj in listSubjs"
        :key="subj.subject_code"
        :title="subj.subject_name"
        :code="subj.subject_code"
        :time="subj.subject_desc"
      ></card>
    </div>
  </section>
</template>

<script>
import card from "@/_professor/_home/card";
import addSub from "@/_professor/_home/addSub";

export default {
  components: { card, addSub },

  computed: {
    autoComplete() {
      const { listSubjects } = this.$store.state.calculator;
      return !this.searchList
        ? []
        : listSubjects.filter((item) => {
            return this.searchList
              .toLowerCase()
              .split(" ")
              .every((v) => item.subject_name.toLowerCase().includes(v));
          });
    },
    foundData() {
      return this.autoComplete.find((o) => o.subject_name === this.searchList);
    },
  },

  data() {
    return {
      initSuggest: false,

      options: {
        semester: ["1st SEMESTER", "2nd SEMESTER"],
        course: ["BSCpE", "BSEE", "BSECE", "BSIE", "BS Architecture"],
        year: ["1st Year", "2nd Year", "3rd Year", "4th Year", "5th Year"],
      },

      searchList: "",
      payload: {
        subject_code: "",
        subject_course: "",
        subject_desc: "",
        subject_sem: "",
        subject_year: "",
      },

      listSubjs: [],

      sizeChangedBy: null,
      optionVal: "",
    };
  },
  methods: {
    sendDispatch() {
      if (this.foundData) {
        this.patchRequest(this.foundData.subject_code);
      } else {
        this.patchRequest(this.payload.subject_code);
      }
    },
    sendToStudentList(id) {
      this.$store.state.openAccordion = id;
    },
    getSubjectValues(obj) {
      console.log(obj);
      this.payload = { ...obj };
    },
    async patchRequest(subject_code) {
      try {
        const grade = await this.$axios.patch(
          `${this.$store.state.BASE_URL}/add/prof/subjects`,
          { subject_code },
          { headers: { Authorization: this.$store.getters.isLoggedIn } }
        );

        if (grade.status === 200) {
          this.$store.dispatch("profSubjects");
          Object.keys(this.payload).forEach((k) => (this.payload[k] = ""));
          this.searchList = "";
        }
      } catch (error) {
        console.log(error.response);
      }
    },
  },
  mounted() {
    this.$store.dispatch("profSubjects").then((d) => (this.listSubjs = d));

    setTimeout(() => {
      this.$store.dispatch("getSubjects");
    }, 2000);
  },
};
</script>

<style lang="css" scoped>
#cards {
  margin-top: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 10px;
}

.card {
  height: 400px;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 10px;
}

@media only screen and (max-width: 1140px) {
  #cards {
    grid-template-columns: 1fr 1fr;
  }
}

@media only screen and (max-width: 720px) {
  #cards {
    grid-template-columns: 1fr;
  }
}
</style>
