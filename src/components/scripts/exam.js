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
               const [
                    studentsList,
               ] = this.$store.state.exam.listStudents.map((v) =>
                    v.subject_code === this.choiceSubj ? v.students : []
               )

               return !this.choiceSubj ? [] : studentsList
          },

          topics() {
               return this.questionsValues.filter(
                    (k) =>
                         k.type !== 'Essay' && k.subject_code === this.subjCode
               )
          },

          questionsHistory() {
               return this.questHistory.filter(
                    (k) => k.subject_code === this.sidebarSubj.subject_code
               )
          },

          historyQuestion() {
               return this.objHistory
          },
     },

     data() {
          return {
               choiceFilter: '',
               choiceTerm: '',
               choiceSubj: '',
               sidebarSubj: '',
               fields: [
                    {
                         key: 'student_id',
                         label: 'Stundent ID',
                         sortable: false,
                    },
                    {
                         key: 'lastname',
                         sortable: true,
                    },
                    {
                         key: 'firstname',
                         sortable: false,
                    },
                    {
                         key: 'score',
                         label: 'Score',
                         sortable: true,
                    },
                    {
                         key: 'status',
                         label: 'Status',
                         sortable: false,
                    },

                    {
                         key: 'view',
                         label: 'View',
                         sortable: false,
                    },
               ],

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

               questHistory: [],
               studentRes: [],

               objHistory: {
                    url: '',
                    subject_code: '',
                    batch_number: '',
               },

               listResponses: [],
               toggleHistory: '',
          }
     },

     methods: {
          async createForm() {
               const { state } = this.$store

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
                    }, 1000)
               }
          },

          async getHistory() {
               const { state } = this.$store
               try {
                    const { data, status } = await this.$axios.get(
                         `${state.BASE_URL}/exam/history`
                    )

                    if (status === 200) {
                         this.$store.dispatch('getEnrolledStudents')

                         this.questHistory = data.history
                         this.studentRes = data.studentResponse
                         setTimeout(() => {
                              this.toggleHistory = 'sidebar-history'
                              this.$root.$emit(
                                   'bv::toggle::collapse',
                                   this.toggleHistory
                              )
                         }, 1000)
                    }
               } catch (error) {
                    console.log(error.response)
               }
          },

          openHistory(obj) {
               this.listResponses = []
               for (var k in this.objHistory) this.objHistory[k] = obj[k]

               const [
                    studentsList,
               ] = this.$store.state.exam.listStudents.map((v) =>
                    v.subject_code === this.sidebarSubj.subject_code
                         ? v.students
                         : []
               )

               studentsList.map((k) => {
                    let foundData = this.studentRes.find(
                         (el) =>
                              el.student_id === k.student_id &&
                              el.batch_number === obj.batch_number
                    )
                    this.listResponses.push({
                         student_id: k.student_id,
                         firstname: k.firstname,
                         lastname: k.lastname,
                         score: foundData ? foundData.score : '',
                         student_token: foundData
                              ? foundData.student_token
                              : '',
                         isTaken: foundData ? foundData.isTaken : false,
                    })
               })

               this.$bvModal.show('historyModal')
          },

          async getQuestions() {
               const { state } = this.$store
               try {
                    const questions = await this.$axios.get(
                         `${state.BASE_URL}/exam/question`
                    )

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
                              question_score: '',
                              form_number: d,
                         })
                         break

                    case 'Identification':
                         this.content.push({
                              format: 'exam-identification',
                              type: this.choiceFilter,
                              question_text: '',
                              question_image: '',
                              question_score: '',
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
                              question_score: '',
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
     },
}
