<template>
  <div>
    <div class="container">
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
    </div>

    <div class="container">
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
    </div>

    <div class="container">
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
    </div>

    <div>
      <h4>Calculated Grade</h4>
      <p v-if="$store.state.calculator.listGrades">
        TOTAL GRADE:
        <input :value="$store.state.calculator.listGrades" disabled />
      </p>

      <p v-else>
        TOTAL GRADE:
        <input :value="calculateGrade" disabled />
      </p>
      <p>
        REMARKS:
        <input :value="remarks" disabled />
      </p>
    </div>
  </div>
</template>

<script>
export default {
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
      if (Object.values(this.criterias).some((v) => v === "")) {
        return "";
      } else {
        return (
          ((this.criterias.quiz / this.criterias.tQuiz) * 50 + 50) *
            this.criterias.mQuiz +
          ((this.criterias.exam / this.criterias.tExam) * 50 + 50) *
            this.criterias.mExam +
          ((this.criterias.extra / this.criterias.tExtra) * 50 + 50) *
            this.criterias.mExtra
        ).toFixed(2);
      }
    },
  },

  data() {
    return {
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

      previousPrice: null,
    };
  },

  methods: {
    handleInput(e) {
      let stringValue = e.target.value.toString();
      let regex = /^\d*(\.\d{1,2})?$/;
      if (!stringValue.match(regex) && this.criterias.mQuiz !== "") {
        this.criterias.mQuiz = this.previousPrice;
      }
      this.previousPrice = this.criterias.mQuiz;
    },
  },
};
</script>

<style scoped>
.container {
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
