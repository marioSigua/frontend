export default {
  computed: {
    selectSubj() {
      return this.subjects;
    },
  },

  data: function() {
    return {
      selectedSubject: "",

      subjects: [
        {
          name: "Seminars and Fieldtrips",
          sCode: "ENGG521",
          students: [{ name: "Mario Louis Sigua", studentID: "2015010237" }],
        },
      ],

      Terms: [
        {
          name: "Prelims",
          criterias: [{ quiz: "", exam: "", extra: "", totalGrade: "" }],
        },
        {
          name: "Midterm",
          criterias: [{ quiz: "", exam: "", extra: "", totalGrade: "" }],
        },
        {
          name: "Finals",
          criterias: [{ quiz: "", exam: "", extra: "", totalGrade: "" }],
        },
      ],

      inpSubject: "",
      inpCode: "",

      lists: [],
    };
  },

  methods: {
    select: function(category) {
      this.lists = category.students;
    },

    newSubject: function(name, code) {
      this.subjects.push({ name, code });
      console.log(this.subjects);
    },
  },

  watch: {
    selectedSubject: function(subj) {
      console.log("subject changed" + subj);
      this.lists = [];
      this.subjects.map((s) => {
        if (s.name == subj) {
          this.lists = s.students;
        }
      });
    },
  },
};
