export default {
  computed: {
    selectSubj() {
      return this.subjects
    },

    selectTerm() {
      return this.Terms
    },

    calculateGrade() {
      console.log((this.exam / this.mExam) * (50 + 50) * this.tExam)
      // this.totalPoints = (this.quiz / this.mQuiz) * (50 + 50) * this.tQuiz
      //   ((this.quiz / this.tQuiz) * 50 + 50) * this.mQuiz +
      //   ((this.exam / this.tExam) * 50 + 50) * this.mExam +
      //   ((this.extra / this.tExtra) * 50 + 50) * this.mExtra.toFixed(2)
      this.totalPoints = (this.quiz / this.tQuiz) * (50 + 50) * this.mQuiz
      return this.totalPoints ? this.totalPoints : 0
    },
  },

  data: function() {
    return {
      selectedTerm: '',

      selectedSubject: '',

      selectedStudent: '',

      subjects: [
        {
          name: 'Seminars and Fieldtrips',
          sCode: 'ENGG521',
          students: [{ name: 'Mario Louis Sigua', studentID: '2015010237' }],
        },
      ],

      Terms: [
        {
          name: 'Prelims',
          //criterias: [{ quiz: "", exam: "", extra: "", totalGrade: "" }],
        },
        {
          name: 'Midterm',
          // criterias: [{ quiz: "", exam: "", extra: "", totalGrade: "" }],
        },
        {
          name: 'Finals',
          //criterias: [{ quiz: "", exam: "", extra: "", totalGrade: "" }],
        },
      ],

      inpSubject: '',
      inpCode: '',

      lists: [],

      quiz: 0,
      exam: 0,
      extra: 0,
      tQuiz: 0,
      tExam: 0,
      tExtra: 0,
      mQuiz: 0,
      mExam: 0,
      mExtra: 0,
      totalPoints: 0,
    }
  },

  methods: {
    select: function(category) {
      this.lists = category.students
    },

    newSubject: function(name, code) {
      this.subjects.push({ name, code })
      console.log(this.subjects)
    },
  },

  watch: {
    selectedSubject: function(subj) {
      console.log('subject changed' + subj)
      this.lists = []
      this.subjects.map((s) => {
        if (s.name == subj) {
          this.lists = s.students
        }
      })
    },
  },
}
