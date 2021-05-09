<template>
  <div>
    <!-- Term -->
    <label for="name">Select Term:</label>
    <select v-model="selectedTerm">
      <option value="" hidden>-- Select Term --</option>
      <option v-for="(term, t) in terms" :value="term" :key="t">
        {{ term }}
      </option>
    </select>

    <article>
      Quiz:
      <input
        type="number"
        @input="handleInput"
        v-model.number="criterias.quiz"
        placeholder="Enter Quiz Score"
      />
      *
      <input
        type="number"
        @input="handleInput"
        v-model.number="criterias.mQuiz"
        placeholder="0.45"
      />

      Total:
      <input
        type="number"
        @input="handleInput"
        v-model.number="criterias.tQuiz"
        placeholder="Enter Total Quiz Score"
      />
    </article>

    <article>
      Exam:
      <input
        type="number"
        @input="handleInput"
        v-model.number="criterias.exam"
        placeholder="Enter Exam Score"
      />
      *
      <input
        type="number"
        @input="handleInput"
        v-model.number="criterias.mExam"
        placeholder="0.5"
      />

      Total:
      <input
        type="number"
        @input="handleInput"
        v-model.number="criterias.tExam"
        placeholder="Enter Total Exam Score"
      />
    </article>

    <article>
      Extra:
      <input
        type="number"
        @input="handleInput"
        v-model.number="criterias.extra"
        placeholder="Enter Participation Grade"
      />
      *
      <input
        type="number"
        @input="handleInput"
        v-model.number="criterias.mExtra"
        placeholder="0.05"
      />
      Total:
      <input
        type="number"
        @input="handleInput"
        v-model.number="criterias.tExtra"
        placeholder="Enter Total Participation Grade"
      />
    </article>

    <div>
      <h4>Calculated Grade</h4>
      <p v-if="calculateGrade === 0">
        TOTAL GRADE:
        <input v-model="existingGrade" />
      </p>

      <p v-else>
        TOTAL GRADE:

        <input :value="calculateGrade" />
      </p>

      <p>
        REMARKS:
        <input :value="remarks" disabled />
      </p>
    </div>

    <button type="button" @click="updateGrade">SAVE</button>
  </div>
</template>

<script>
/*

     index.vue

     - select subject
         - loop -> subjectLists
     - select student
         - loop -> studentList


         <input :subject="selectedSubject" :target="selectedStudent">  - > inputGrade.vue
           - term
           - grades

           button





     */

export default {
  props: {
    // target student
    // needed for database requests
    target: {
      default() {
        return {
          student_id: "",
          date_created: "",
        };
      },
    },

    // subject code?
    // needed for database requests
    subject: {
      default() {
        return "";
      },
    },
  },

  data() {
    return {
      terms: ["Prelims", "Midterm", "Finals"],
      selectedTerm: "",

      existingGrade: "",

      inputGrade: "",
      // Criterias
      // input fields
      criterias: {
        quiz: "",
        exam: "",
        extra: "",
        tQuiz: "",
        tExam: "",
        tExtra: "",
        mQuiz: "",
        mExam: "",
        mExtra: "",
      },

      grade: "",

      // temporary storage of old data during verification
      previousPrice: null,
    };
  },
  watch: {
    // watch changes in target
    // change in target means change in student
    // target() {
    //   // get new set of grades
    //   this.getGrades();
    // },
  },

  methods: {
    handleInput(e) {
      let stringValue = e.target.value.toString();
      let regex = /^\d*(\.\d{1,2})?$/;
      if (!stringValue.match(regex) && this.mQuiz !== "") {
        this.criterias.mQuiz = this.previousPrice;
      }
      this.previousPrice = this.criterias.mQuiz;
      // // new input means new data, and new grade to compute
      //  this.calculateGrade;
    },

    // Updates after selecting a term
    getGrades() {
      // if there is no subject dont fetch to avoid backend bugs
      // if (this.subject == '') return

      const gradeList = {
        student_id: this.target.student_id,
        created_at: this.target.date_created,
        term: this.selectedTerm,
        subject_code: this.subject,
      };

      // handle data here using then()
      this.$store
        .dispatch("getStudentGrade", gradeList)
        .then((result) => {
          this.existingGrade = result.prelim_grade
            ? result.prelim_grade
            : result.midterm_grade
            ? result.midterm_grade
            : result.finals_grade
            ? result.finals_grade
            : "";
        })
        .catch((err) => {
          console.log(err);
        });

      /* comment database response for better debugging
           {
           prelim_grade:100
           prelim_grade:100
           prelim_grade:100
           }
           */
    },

    updateGrade() {
      if (this.calculateGrade > 0) {
        this.existingGrade = this.calculateGrade;
      }
      const needs = {
        ...this.target,
        term: this.selectedTerm,
        totalGrade: this.existingGrade,
      };

      // handle data here using then()
      // example implementation
      // patch protocol in store
      this.$store
        .dispatch("updateGrade", needs)
        .then((status) => {
          if (status === 200) window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },

  computed: {
    remarks() {
      if (this.calculateGrade >= 75) {
        return "passed";
      } else if (!this.calculateGrade) {
        return null;
      } else {
        return "failed";
      }
    },

    calculateGrade() {
      if (Object.values(this.criterias).some((v) => !v)) {
        return 0;
      } else {
        return (
          ((this.criterias.quiz / this.criterias.tQuiz) * 50 + 50) *
            this.criterias.mQuiz +
          ((this.criterias.exam / this.criterias.tExam) * 50 + 50) *
            this.criterias.mExam +
          ((this.criterias.extra / this.criterias.tExtra) * 50 + 50) *
            this.criterias.mExtra.toFixed(2)
        );
      }
    },
  },
};
</script>

<style scoped>
article {
  padding: 10px;
  border-bottom: 1px white solid;
}

input {
  border-radius: 5px;
  padding-left: 5px;
  color: black;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}

::placeholder {
  color: #8f8475;
  opacity: 1;
  font-style: italic;
}

:-ms-input-placeholder {
  color: #8f8475;
  font-style: italic;
}

::-ms-input-placeholder {
  color: #8f8475;
  font-style: italic;
}
</style>
