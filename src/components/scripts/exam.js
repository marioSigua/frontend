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
            console.log(
                this.questionsValues.length >= 1
                    ? this.questionsValues[0].questionTopics.map(
                          ({ question_form }) => JSON.parse(question_form)
                      )
                    : []
            )
            return this.questionsValues.length >= 1
                ? this.questionsValues[0].questionTopics.map((subarray) =>
                      console.log(JSON.parse(subarray.question_form))
                  )
                : []
        },
    },

    data() {
        return {
            choiceFilter: '',
            choicePurpose: '',
            choiceTerm: '',
            choiceSubj: '',

            modalTopics: '',
            //question body
            content: [],

            questionsValues: [],
        }
    },

    methods: {
        async createForm() {
            const { state } = this.$store

            try {
                const saveQuestion = await this.$axios.post(
                    `${state.BASE_URL}/create/form/questions`,
                    {
                        subject_code: this.choiceSubj,
                        term: this.choiceTerm,
                        question_form: JSON.stringify(this.content),
                    }
                )

                if (saveQuestion.status === 200) {
                    console.log(1)
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
                console.log(questions)

                if (questions.status === 200)
                    console.log(questions.data[0].questionTopics)
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
                        student_input: '',
                    })
                    break

                case 'Identification':
                    this.content.push({
                        format: 'exam-identification',
                        type: this.choiceFilter,
                        question: '',
                        student_input: '',
                        form_answer: '',
                        topic: '',
                    })
                    break

                case 'Multiple Choice':
                    this.content.push({
                        format: 'exam-mcq',
                        type: this.choiceFilter,
                        question: '',
                        student_input: '',
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
    },

    mounted() {
        this.$store.dispatch('profSubjects')
    },
}
