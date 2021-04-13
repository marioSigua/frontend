import { setTimeout } from 'core-js'
import Navbar from '../navbar.vue'
export default {
     components: { Navbar },

     computed: {
          listEssay() {
               return this.content.filter((v) => v.type === 'Essay')
          },

          listIdentification() {
               return this.content.filter((v) => v.type === 'Identification')
          },

          listMCQ() {
               return this.content.filter((v) => v.type === 'Multiple Choice')
          },

          selectSubj() {
               return this.$store.state.subjectList
          },

          listStudents() {
               return !this.choiceSubj
                    ? []
                    : this.$store.state.calculator.listStudents.filter(
                           (v) => v.subject_code === this.choiceSubj
                      )[0].students
          },

          topics() {
               const list = []

               this.questionsValues.length >= 1
                    ? this.questionsValues[0].questionTopics.map((v) =>
                           JSON.parse(v.question_form).map((col) => {
                                list.push(col)
                           })
                      )
                    : []

               return list
          },
     },

     data() {
          return {
               choiceFilter: '',
               choiceTerm: '',
               choiceSubj: '',

               topicValue: {},

               modalTopics: '',
               //question body
               content: [],
               formNumber: 1,

               stdEmail: [],

               questionsValues: [],

               btnNames: ['Multiple Choice', 'Identification', 'Essay'],

               selected: [], // Must be an array reference!
          }
     },

     methods: {
          async createForm() {
               const { state } = this.$store
               const formBody = {
                    term: this.choiceTerm,
                    subject_code: this.choiceSubj,
                    question_form: JSON.stringify(this.content),
                    stdEmail: this.stdEmail,
               }

               try {
                    const saveQuestion = await this.$axios.post(
                         `${state.BASE_URL}/create/form/questions`,
                         formBody
                    )

                    console.log(formBody)
                    if (saveQuestion.status === 200) {
                         this.content = []

                         this.resetModal
                    }
               } catch (error) {
                    console.log(error.response)
               }
          },

          openStudentList(e) {
               if (!this.choiceSubj) {
                    alert('Please Select a Subject')
                    e.preventDefault()
               } else {
                    this.$bvModal.show('modal-tall')
               }
          },

          async getSubjectCode(subj) {
               const { state } = this.$store
               try {
                    const questions = await this.$axios.get(
                         `${state.BASE_URL}/exam/question/${subj.subject_code}`
                    )

                    if (questions.status === 200)
                         this.questionsValues = questions.data
               } catch (error) {
                    console.log(error)
               }
          },

          getTopics(obj) {
               let d = new Date().getTime()
               obj['batch_number'] = d
               if (this.content.includes(obj)) {
                    alert('topic is already added')
               } else {
                    this.content.push(obj)
               }
          },

          letsGo() {
               let d = new Date().getTime()
               switch (this.choiceFilter) {
                    case 'Essay':
                         this.content.push({
                              format: 'exam-essay',
                              type: this.choiceFilter,
                              response_name: 'student-essay',
                              question: '',
                              student_answer: '',
                              batch_number: d,
                         })
                         break

                    case 'Identification':
                         this.content.push({
                              format: 'exam-identification',
                              type: this.choiceFilter,
                              question: '',
                              response_name: 'student-identification',
                              student_answer: '',
                              form_answer: '',
                              topic: '',
                              batch_number: d,
                         })
                         break

                    case 'Multiple Choice':
                         this.content.push({
                              format: 'exam-mcq',
                              response_name: 'student-mcq',
                              type: this.choiceFilter,
                              question: '',
                              student_answer: '',
                              form_answer: '',
                              topic: '',
                              choices: {
                                   a: '',
                                   b: '',
                                   c: '',
                                   d: '',
                              },
                              batch_number: d,
                         })
                         break

                    default:
                         return ''
               }

               this.choiceFilter = ''
          },

          getTopicValue(val) {
               this.topicValue = { ...val }
          },

          resetModal() {
               this.$nextTick(() => {
                    this.$bvModal.hide('modal-prevent-closing')
               })
          },
     },

     mounted() {
          this.$store.dispatch('profSubjects')

          setTimeout(() => {
               this.$store.dispatch('getEnrolledStudents')
          }, 2000)
     },
}
