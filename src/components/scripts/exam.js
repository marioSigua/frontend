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

            questionsValues: [],

            btnNames: ['Multiple Choice', 'Identification', 'Essay'],

            selected: [], // Must be an array reference!
            options: [
              { text: 'Orange', value: 'orange' },
              { text: 'Apple', value: 'apple' },
              { text: 'Pineapple', value: 'pineapple' },
              { text: 'Grape', value: 'grape' }
            ]
        }
    },

    methods: {
        async createForm() {
            const { state } = this.$store
            const formBody = {
                term: this.choiceTerm,
                subject_code: this.choiceSubj,
                question_form: JSON.stringify(this.content),
            }
            console.log(formBody)

            try {
                const saveQuestion = await this.$axios.post(
                    `${state.BASE_URL}/create/form/questions`,
                    formBody
                )

                if (saveQuestion.status === 200) {
                    this.content = []
                }
            } catch (error) {
                console.log(error.response)
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

        letsGo() {
            switch (this.choiceFilter) {
                case 'Essay':
                    this.content.push({
                        format: 'exam-essay',
                        type: this.choiceFilter,
                        question: '',
                        student_answer: '',
                    })
                    break

                case 'Identification':
                    this.content.push({
                        format: 'exam-identification',
                        type: this.choiceFilter,
                        question: '',
                        student_answer: '',
                        form_answer: '',
                        topic: '',
                    })
                    break

                case 'Multiple Choice':
                    this.content.push({
                        format: 'exam-mcq',
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
    },

    mounted() {
        this.$store.dispatch('profSubjects')
    },
}
