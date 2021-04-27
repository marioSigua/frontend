<template>
  <div>

    <!-- Term -->
    <label for="name">Select Term:</label>
    <select v-model="selectedTerm" @change="getGrades">
      <option value="">Select Term</option>
      <option v-for="(term, t) in terms" :key="t"> {{ term }} </option>
    </select>


    <article>
      Quiz:
      <input type="number" @input="handleInput" v-model.number="quiz" placeholder="Enter Quiz Score" />
      *
      <input type="number" @input="handleInput" v-model.number="mQuiz" placeholder="0.45" />


      Total:
      <input type="number" @input="handleInput" v-model.number="tQuiz" placeholder="Enter Total Quiz Score" />
    </article>


    <article>
      Exam:
      <input type="number" @input="handleInput" v-model.number="exam" placeholder="Enter Exam Score" />
      *
      <input type="number" @input="handleInput" v-model.number="mExam" placeholder="0.5" />


      Total:
      <input   type="number"   @input="handleInput"   v-model.number="tExam"   placeholder="Enter Total Exam Score" />
    </article>


    <article>
      Extra:
      <input
        type="number"
        @input="handleInput"
        v-model.number="extra"
        placeholder="Enter Participation Grade"
      />
      *
      <input
        type="number"
        @input="handleInput"
        v-model.number="mExtra"
        placeholder="0.05"
      />
      Total:
      <input
        type="number"
        @input="handleInput"
        v-model.number="tExtra"
        placeholder="Enter Total Participation Grade"
      />
    </article>

    <div>
      <h4>Calculated Grade</h4>
      <p v-if="$store.state.calculator.listGrades">
        TOTAL GRADE:
        <input :value="$store.state.calculator.listGrades" disabled />
      </p>

      <p v-else>
        TOTAL GRADE:
        <input :value="grade" disabled />
      </p>
      <p>
        REMARKS:
        <input :value="remarks" disabled />
      </p>
    </div>

    <button type="button" @click="updateGrade"> SAVE </button>
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
  props:{
    // target student
    // needed for database requests
    target:{
      default(){
        return{
          student_id: "",
          date_created: "",
        }
      }
    },
    // subject code?
    // needed for database requests
    subject:{ default(){ return ""} },

  },

  data() {
    return {


      terms: ["Prelims","Midterm","Finals"],
      selectedTerm: "",


      // Criterias
      // input fields
      quiz: "",
      exam: "",
      extra: "",
      tQuiz: "",
      tExam: "",
      tExtra: "",
      mQuiz: "",
      mExam: "",
      mExtra: "",
      grade:"",

      // temporary storage of old data during verification
      previousPrice: null,
    };
  },
  watch:{
    // watch changes in target
    // change in target means change in student
    target(){
      // get new set of grades
      this.getGrades();
    }
  },

  methods: {
    handleInput(e) {
      let stringValue = e.target.value.toString();
      let regex = /^\d*(\.\d{1,2})?$/;
      if (!stringValue.match(regex) && this.mQuiz !== "") { this.mQuiz = this.previousPrice; }
      this.previousPrice = this.mQuiz;
      // new input means new data, and new grade to compute
      this.calculateGrade();
    },

    // Updates after selecting a term
    getGrades() {
      // if there is no subject dont fetch to avoid backend bugs
      if(this.subject=='') return;

      const gradeList = {
        student_id: this.target.student_id,
        created_at: this.target.date_created,
        term: this.selectedTerm,
        subject_code: this.subject,
      };

      // handle data here using then()
      this.$store.dispatch("getStudentGrade", gradeList);

      /* comment database response for better debugging
      {
      prelim_grade:100
      prelim_grade:100
      prelim_grade:100
      }
      */
    },

    updateGrade() {
      const needs = {
        ...this.payload,
        term: this.selectedTerm,
        totalGrade: this.calculateGrade,
      };

      // handle data here using then()
      // example implementation
      this.$store.dispatch("updateGrade", needs).then( grade =>{
        // store data to local
        this.grade = grade;
      })
    },

    calculateGrade() {
      if (Object.values(this.criterias).some((v) => v === "")) {
        this.grade = "";
      } else {
        this.grade =  (
          ((this.quiz / this.tQuiz) * 50 + 50) * this.mQuiz
          +
          ((this.exam / this.tExam) * 50 + 50) * this.mExam
          +
          ((this.extra / this.tExtra) * 50 + 50) * this.mExtra
        ).toFixed(2);
      }
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
