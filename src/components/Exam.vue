<template>
    <div>
        <navbar />
        <!--Import Question-->
        <div>
            <b-button v-b-modal.modal-xl variant="primary"
                >Import Question</b-button
            >
            <!--Accordian-->
            <b-modal id="modal-xl" size="xl" title="Extra Large Modal">
                <div class="accordion" role="tablist">
                    <b-card no-body class="mb-1">
                        <b-card-header
                            header-tag="header"
                            class="p-1"
                            role="tab"
                        >
                            <b-button
                                block
                                v-b-toggle.accordion-1
                                variant="info"
                                class="clsbtn"
                                >Subject 1</b-button
                            >
                        </b-card-header>
                        <b-collapse
                            id="accordion-1"
                            visible
                            accordion="my-accordion"
                            role="tabpanel"
                        >
                            <b-card-body>
                                <!--List of topic-->
                                <div class="ctn">
                                    <b-form-select
                                        v-model="selected"
                                        :options="options"
                                        size="sm"
                                        class="mt-3"
                                    ></b-form-select>
                                </div>
                                <b-button
                                    v-b-toggle="['collapse-a']"
                                    class="btnss"
                                    >Multiple Choice</b-button
                                >
                                <b-button
                                    v-b-toggle="['collapse-b']"
                                    class="btnss"
                                    >Identification</b-button
                                >
                                <b-button
                                    v-b-toggle="['collapse-c']"
                                    class="btnss"
                                    >Essay</b-button
                                >
                                <b-button
                                    v-b-toggle="['collapse-d']"
                                    class="btnss"
                                    >Toggle Collapse A and B</b-button
                                >
                                <!-- Elements to collapse -->
                                <b-collapse id="collapse-a" class="mt-2">
                                    <b-card>yawa</b-card>
                                </b-collapse>
                                <b-collapse id="collapse-b" class="mt-2">
                                    <b-card>bobo ml</b-card>
                                </b-collapse>
                                <b-collapse id="collapse-c" class="mt-2">
                                    <b-card>dota malakas</b-card>
                                </b-collapse>
                                <b-collapse id="collapse-d" class="mt-2">
                                    <b-card>kaso may bisaya YAWA!</b-card>
                                </b-collapse>
                                <!-- Elements to collapse -->
                            </b-card-body>
                        </b-collapse>
                    </b-card>

                    <b-card no-body class="mb-1">
                        <b-card-header
                            header-tag="header"
                            class="p-1"
                            role="tab"
                        >
                            <b-button
                                block
                                v-b-toggle.accordion-2
                                variant="info"
                                class="clsbtn"
                                >Subject 2</b-button
                            >
                        </b-card-header>
                        <b-collapse
                            id="accordion-2"
                            accordion="my-accordion"
                            role="tabpanel"
                        >
                            <b-card-body>
                                <b-card-text>bobo ni w33</b-card-text>
                            </b-card-body>
                        </b-collapse>
                    </b-card>

                    <b-card no-body class="mb-1">
                        <b-card-header
                            header-tag="header"
                            class="p-1"
                            role="tab"
                        >
                            <b-button
                                block
                                v-b-toggle.accordion-3
                                variant="info"
                                class="clsbtn"
                                >Subject 3</b-button
                            >
                        </b-card-header>
                        <b-collapse
                            id="accordion-3"
                            accordion="my-accordion"
                            role="tabpanel"
                        >
                            <b-card-body>
                                <b-card-text>Nigma.sumail</b-card-text>
                            </b-card-body>
                        </b-collapse>
                    </b-card>
                </div>
                <!--Accordian-->
            </b-modal>
        </div>
        <!--Import Question-->
        <div>
            <select v-model="choiceFilter" @change="letsGo">
                <option value="">Select a Format</option>
                <option>Essay</option>
                <option>Identification</option>
                <option>Multiple Choice</option>
            </select>

            <select v-model="choicePurpose">
                <option value="">Purpose of Form</option>
                <option>Activity</option>
                <option>Exam</option>
                <option>Quiz</option>
            </select>

            <!-- question body -->

            <div class="" v-for="(essay, index) in listEssay" :key="index">
                <component :is="essay.format" :essayValues="essay"> </component>
            </div>

            <div
                class=""
                v-for="(identi, index) in listIdentification"
                :key="index"
            >
                <component :is="identi.format" :identificationValues="identi">
                </component>
            </div>

            <div class="" v-for="(mcq, index) in listMCQ" :key="index">
                <component :is="mcq.format" :mcqValues="mcq"> </component>
            </div>

            <br />
            <button @click="createForm()" style="margin-left: 10px">
                Create {{ choicePurpose ? choicePurpose : 'Form' }}
            </button>
        </div>
    </div>
</template>

<script>
    import Navbar from './navbar.vue'
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
        },

        data() {
            return {
                choiceFilter: '',
                choicePurpose: '',

                formNumber: 1,
                //question body
                content: [],

                userValues: [],

                options: [],
                selected: [],
            }
        },

        methods: {
            createForm() {
                console.log(this.content)
            },

            letsGo() {
                switch (this.choiceFilter) {
                    case 'Essay':
                        this.content.push({
                            format: 'exam-essay',
                            type: this.choiceFilter,
                            question: '',
                            student_input: '',
                            form_number: `${this.choiceFilter}-${this.formNumber}`,
                        })
                        this.formNumber++
                        break

                    case 'Identification':
                        this.content.push({
                            format: 'exam-identification',
                            type: this.choiceFilter,
                            question: '',
                            student_input: '',
                            form_number: `${this.choiceFilter}-${this.formNumber}`,
                            form_answer: '',
                        })
                        this.formNumber++
                        break

                    case 'Multiple Choice':
                        this.content.push({
                            format: 'exam-mcq',
                            type: this.choiceFilter,
                            question: '',
                            student_input: '',
                            form_number: `${this.choiceFilter}-${this.formNumber}`,
                            form_answer: '',
                            choices: {
                                a: '',
                                b: '',
                                c: '',
                                d: '',
                            },
                        })
                        this.formNumber++
                        break

                    default:
                        return ''
                }

                this.choiceFilter = ''
            },
        },
    }
</script>
ExamEssay

<style scoped>
    @import './styles/Exam.css';
</style>

<!-- <script>
  export default {
  data() {
    return {
      selected: null,
      options: [
        { value: null, text: 'Please select an option' },
        { value: 'a', text: 'This is First option' },
        { value: 'b', text: 'Selected Option' },
        { value: { C: '3PO' }, text: 'This is an option with object value' },
        { value: 'd', text: 'This one is disabled', disabled: true }
      ]
    }
  }
}
</script> -->
