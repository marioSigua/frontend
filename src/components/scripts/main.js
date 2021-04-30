import nav from '../navbar'
export default {
     components: {
          navbar: nav,
     },

     computed: {
          remarks() {
               if (this.calculateGrade >= 75) {
                    return 'passed'
               } else if (!this.calculateGrade) {
                    return null
               } else {
                    return 'failed'
               }
          },

          selectSubj() {
               return this.$store.state.subjectList
          },

          selectTerm() {
               return this.Terms
          },

          listStudents() {
               return this.$store.state.calculator.listStudents
          },

          calculateGrade() {
               if (Object.values(this.criterias).some((v) => v === '')) {
                    return ''
               } else {
                    return (
                         ((this.criterias.quiz / this.criterias.tQuiz) * 50 +
                              50) *
                              this.criterias.mQuiz +
                         ((this.criterias.exam / this.criterias.tExam) * 50 +
                              50) *
                              this.criterias.mExam +
                         ((this.criterias.extra / this.criterias.tExtra) * 50 +
                              50) *
                              this.criterias.mExtra
                    ).toFixed(2)
               }
          },
     },

     data: function() {
          return {
               selectStudents: false,

               currentIndex: '',
               selectedTerm: '',

               selectedSubject: '',

               selectedStudent: '',

               Terms: [
                    {
                         name: 'Prelims',
                    },
                    {
                         name: 'Midterm',
                    },
                    {
                         name: 'Finals',
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
               },

               inpSubject: '',
               inpCode: '',

               payload: {
                    student_id: '',
                    date_created: '',
               },

               previousPrice: null,
          }
     },

     methods: {
          handleInput(e) {
               let stringValue = e.target.value.toString()
               let regex = /^\d*(\.\d{1,2})?$/
               if (!stringValue.match(regex) && this.criterias.mQuiz !== '') {
                    this.criterias.mQuiz = this.previousPrice
               }
               this.previousPrice = this.criterias.mQuiz
          },

          newSubject: function(name, code) {
               this.subjects.push({ name, code })
          },

          getStudentInfo(info) {
               this.currentIndex = this.listStudents.indexOf(info)
               this.payload.student_id = info.student_id
               this.payload.date_created = info.created_at

               this.getGrades()
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
                    totalGrade: this.calculateGrade
                         ? this.calculateGrade
                         : this.$store.state.calculator.listGrades,
               }

               console.log(this.$store.state.calculator.listGrades)

               this.$store.dispatch('updateGrade', needs)
          },
     },

     beforeRouteLeave(to, from, next) {
          this.$store.commit('getStudents', [])
          next()
     },

     mounted() {
          if (localStorage.getItem('reloaded')) {
               // The page was just reloaded. Clear the value from local storage
               // so that it will reload the next time this page is visited.
               localStorage.removeItem('reloaded');
           } else {
               // Set a flag so that we know not to reload the page twice.
               localStorage.setItem('reloaded', '1');
               location.reload();
           }
          this.$store.dispatch('profSubjects')
     }
     
     
}
