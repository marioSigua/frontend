import nav from '../navbar'
export default {
      components: {
            navbar: nav,
      },

      computed: {
            selectSubj() {
                  return this.$store.state.subjectList
            },

            selectTerm() {
                  return this.Terms
            },

            listStudents() {
                  console.log(this.$store.state.calculator.listStudents)
                  return this.$store.state.calculator.listStudents
            },

            calculateGrade() {
                  return (this.criterias.totalPoints = (
                        ((this.criterias.quiz / this.criterias.tQuiz) * 50 +
                              50) *
                              this.criterias.mQuiz +
                        ((this.criterias.exam / this.criterias.tExam) * 50 +
                              50) *
                              this.criterias.mExam +
                        ((this.criterias.extra / this.criterias.tExtra) * 50 +
                              50) *
                              this.criterias.mExtra
                  ).toFixed(2))
            },
      },

      data: function() {
            return {
                  selectStudents: false,

                  currentIndex: '',
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

                  criterias: {
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
                  },

                  inpSubject: '',
                  inpCode: '',

                  lists: [],

                  payload: {
                        student_id: '',
                        date_created: '',
                  },
            }
      },

      methods: {
            select: function(category) {
                  this.lists = category.students
            },

            newSubject: function(name, code) {
                  this.subjects.push({ name, code })
            },

            getStudentInfo(info) {
                  this.currentIndex = this.listStudents.indexOf(info)
                  this.payload.student_id = info.student_id
                  this.payload.date_created = info.created_at
            },

            getSubjectCode(code) {
                  this.$store.dispatch('getStudents', code)
            },

            getGrades() {
                  const gradeList = {
                        student_id: this.payload.student_id,
                        created_at: this.payload.date_created,
                        term: this.selectedTerm,
                        subject_code: this.selectedSubject,
                  }

                  this.$store.dispatch('getStudentGrade', gradeList)
            },

            updateGrade() {
                  const needs = {
                        ...this.payload,
                        term: this.selectedTerm,
                        totalGrade: this.calculateGrade,
                  }

                  this.$store.dispatch('updateGrade', needs)
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
            this.$store.dispatch('profSubjects')
            console.log(typeof localStorage.getItem('initGrades'))
      },
}
