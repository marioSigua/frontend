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
                    : this.$store.state.exam.listStudents.filter(
                           (v) => v.subject_code === this.choiceSubj
                      )[0].students
          },

          topics() {
               return this.questionsValues.filter(
                    (k) =>
                         k.type !== 'Essay' && k.subject_code === this.subjCode
               )
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

               subjCode: '',
          }
     },

     methods: {
          async createForm() {
               const { state } = this.$store
               // const formBody = {
               //      term: this.choiceTerm,
               //      subject_code: this.choiceSubj,
               //      question_form: this.content,
               //      stdEmail: this.stdEmail,
               // }
               let batch = Date.now()
               let formData = new FormData()
               formData.append('batch_number', batch)
               formData.append('term', this.choiceTerm)
               formData.append('subject_code', this.choiceSubj)
               formData.append('question_form', JSON.stringify(this.content))
               formData.append('stdEmail', JSON.stringify(this.stdEmail))
               try {
                    const saveQuestion = await this.$axios.post(
                         `${state.BASE_URL}/create/form/questions`,
                         formData,
                         {
                              headers: {
                                   'content-type': 'multipart/form-data',
                              },
                         }
                    )

                    if (saveQuestion.status === 200) {
                         this.content = []

                         this.resetModal
                    }
               } catch (error) {
                    console.log(error.response.data.stack)
               }
          },

          getSubjectCode(code) {
               this.subjCode = code
          },

          openStudentList(e) {
               if (!this.choiceSubj) {
                    alert('Please Select a Subject')
                    e.preventDefault()
               } else {
                    this.$store.dispatch('getEnrolledStudents')

                    setTimeout(() => {
                         this.$bvModal.show('modal-tall')
                    }, 300)
               }
          },

          async getQuestions() {
               const { state } = this.$store
               try {
                    const questions = await this.$axios.get(
                         `${state.BASE_URL}/exam/question`
                    )

                    console.log(questions)

                    if (questions.status === 200)
                         this.questionsValues = questions.data

                    setTimeout(() => {
                         this.$bvModal.show('modal-xl')
                    }, 300)
               } catch (error) {
                    console.log(error.response)
               }
          },

          getTopics(obj) {
               console.log(obj)
               if (this.content.includes(obj)) {
                    alert('topic is already added')
               } else {
                    delete obj.batch_number
                    this.content.push(obj)
               }
          },

          letsGo() {
               let d = Date.now()
               switch (this.choiceFilter) {
                    case 'Essay':
                         this.content.push({
                              format: 'exam-essay',
                              type: this.choiceFilter,
                              response_name: 'student-essay',
                              question_text: '',
                              question_image: '',
                              student_answer: '',

                              form_number: d,
                         })
                         break

                    case 'Identification':
                         this.content.push({
                              format: 'exam-identification',
                              type: this.choiceFilter,
                              question_text: '',
                              question_image: '',
                              response_name: 'student-identification',
                              student_answer: '',
                              form_answer: '',
                              form_number: d,
                              topic: '',
                         })
                         break

                    case 'Multiple Choice':
                         this.content.push({
                              format: 'exam-mcq',
                              response_name: 'student-mcq',
                              type: this.choiceFilter,
                              question_text: '',
                              question_image: '',
                              student_answer: '',
                              form_answer: '',
                              topic: '',
                              choices: {
                                   a: '',
                                   b: '',
                                   c: '',
                                   d: '',
                              },
                              form_number: d,
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
               this.modalTopics = ''
               this.topicValue = {}
          },
     },

     mounted() {
          this.$store.dispatch('profSubjects')
     },
}
