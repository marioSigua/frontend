<template lang="html">
  <section id="adminHome">
    <h1>Home</h1>
    <addSub :profSubjs="subjects"></addSub>

    <div class="division"></div>

    <div class="backdrop">
      <table>
        <tr>
          <th>Subject Code</th>
          <th>Subject Name</th>
          <th>Subject Schedule</th>
          <th>Subject Semester</th>
          <th>Subject Year</th>
          <th>Subject Course</th>
          <th>Select Subject</th>
        </tr>
        <tr>
          <td>CMPE101</td>
          <td>SAD</td>
          <td>M W F 1:00 - 2:00</td>
          <td>1st SEMESTER</td>
          <td>4th YEAR</td>
          <td>BSCpE</td>
          <td>
            <button>
              Select
            </button>
          </td>
        </tr>
      </table>
    </div>
  </section>
</template>

<script>
import addSub from "@/_professor/_admin/selectSub";

export default {
  components: { addSub },

  computed: {
    subjects() {
      return this.listSubjs;
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
    sendToStudentList(id) {
      this.$store.state.openAccordion = id;
    },

    getSubjectValues(obj) {
      this.payload = { ...obj };
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
.division {
  border-top: white 3px solid;
  margin-top: 10px;
  margin-bottom: 10px;
}

table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}
td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}
</style>
