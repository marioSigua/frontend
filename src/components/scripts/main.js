export default {
      computed: {
            selectSubj() {
                  console.log(this.$store.state.calculator.listSubjects)
                  return this.$store.state.calculator.listSubjects
            },

            selectTerm() {
                  return this.Terms
            },

            listStudents() {
                  return this.$store.state.calculator.listStudents
            },

            calculateGrade() {
                  return (this.totalPoints = (
                        ((this.quiz / this.tQuiz) * 50 + 50) * this.mQuiz +
                        ((this.exam / this.tExam) * 50 + 50) * this.mExam +
                        ((this.extra / this.tExtra) * 50 + 50) * this.mExtra
                  ).toFixed(2))
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
                              students: [
                                    {
                                          name: 'Mario Louis Sigua',
                                          studentID: '2015010237',
                                    },
                              ],
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

                  quiz: '',
                  exam: '',
                  extra: '',
                  tQuiz: '',
                  tExam: '',
                  tExtra: '',
                  mQuiz: '',
                  mExam: '',
                  mExtra: '',
                  totalPoints: '',
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

            getSubjectCode(code) {
                  console.log(code)
                  this.$store.dispatch('getStudents', code)
            },
      },

      watch: {
            selectedSubject: function(subj) {
                  this.lists = []
                  this.subjects.map((s) => {
                        if (s.name == subj) {
                              this.lists = s.students
                        }
                  })
            },
      },

      mounted() {
            this.$store.dispatch('getSubjects')
      },
}
