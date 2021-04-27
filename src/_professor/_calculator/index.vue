<template lang="html">
  <div class="grid-container">
    <div id="sList">
      <sList
        v-for="(list, index) in listStudents"
        :key="index"
        :firstname="list.firstname"
        :lastname="list.lastname"
      ></sList>

      <sList firstname="list.firstname" lastname="list.lastname"></sList>
    </div>

    <div id="calc">
      <h4>Calculator</h4>

      <div id="getSubj">
        <label for="name">Select Subject:</label>
        <select
          v-model="selectedSubject"
          @change="getSubjectCode(selectedSubject)"
        >
          <option value="">Select Subject</option>
          <option
            v-for="(category, index) in selectSubj"
            :key="index"
            :value="category.subject_code"
          >
          </option>

          <getSubj subject_code="category.subject_name"></getSubj>
        </select>
      </div>

      <div>
        <label for="name">Select Term:</label>
        <select v-model="selectedTerm" @change="getGrades">
          <option value="">Select Term</option>
          <option v-for="(category, index) in selectTerm" :key="index">
            {{ category.name }}
          </option>
        </select>
      </div>

      <inputGrade></inputGrade>

      <button type="button" @click="updateGrade">
        SAVE
      </button>
    </div>
  </div>
</template>

<script>
import sList from "@/_professor/_calculator/studentList";
import getSubj from "@/_professor/_calculator/getSubj";
import inputGrade from "@/_professor/_calculator/inputGrade";

export default {
  components: { sList, getSubj, inputGrade },

  computed: {
    selectSubj() {
      return this.$store.state.subjectList;
    },

    selectTerm() {
      return this.Terms;
    },

    listStudents() {
      return this.$store.state.calculator.listStudents;
    },
  },

  data: function() {
    return {
      selectStudents: false,

      currentIndex: "",
      selectedTerm: "",

      selectedSubject: "",

      selectedStudent: "",

      Terms: [
        {
          name: "Prelims",
        },
        {
          name: "Midterm",
        },
        {
          name: "Finals",
        },
      ],

      inpSubject: "",
      inpCode: "",

      payload: {
        student_id: "",
        date_created: "",
      },
    };
  },

  methods: {
    getStudentInfo(info) {
      this.currentIndex = this.listStudents.indexOf(info);
      this.payload.student_id = info.student_id;
      this.payload.date_created = info.created_at;
    },

    newSubject: function(name, code) {
      this.subjects.push({ name, code });
    },

    getSubjectCode(code) {
      this.$store.dispatch("getStudents", code);
    },

    getGrades() {
      const gradeList = {
        student_id: this.payload.student_id,
        created_at: this.payload.date_created,
        term: this.selectedTerm,
        subject_code: this.selectedSubject,
      };

      this.$store.dispatch("getStudentGrade", gradeList);
    },

    updateGrade() {
      const needs = {
        ...this.payload,
        term: this.selectedTerm,
        totalGrade: this.calculateGrade,
      };

      this.$store.dispatch("updateGrade", needs);
    },
  },

  beforeRouteLeave(to, from, next) {
    this.$store.commit("getStudents", []);
    next();
  },

  mounted() {
    this.$store.dispatch("profSubjects");
  },
};
</script>

<style lang="css" scoped>
.grid-container {
  display: grid;
  grid-template-areas:
    "header header header header header "
    "menu main main main right "
    "menu footer footer footer footer ";
  grid-gap: 10px;
  padding: 10px;
}
#sList {
  grid-area: menu;
}
#calc {
  grid-area: main;
}
</style>
