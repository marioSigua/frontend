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
                <div
                    class="accordion"
                    role="tablist"
                    v-for="(subj, index) in selectSubj"
                    :key="index"
                >
                    <b-card no-body class="mb-1">
                        <b-card-header
                            header-tag="header"
                            class="p-1"
                            role="tab"
                        >
                            <b-button
                                block
                                v-b-toggle="'accordion' + index"
                                variant="info"
                                class="clsbtn"
                                @click="getSubjectCode(subj)"
                            >
                                {{ subj ? subj.subject_name : '' }}
                            </b-button>
                        </b-card-header>

                        <b-collapse
                            :id="'accordion' + index"
                            accordion="my-accordion"
                            role="tabpanel"
                        >
                            <b-card-body>
                                <!--List of topic-->
                                <div class="ctn">
                                    <b-form-select
                                        v-model="modalTopics"
                                        size="sm"
                                        class="mt-3"
                                    >
                                        <option value="">Select Term</option>
                                        <option
                                            v-for="(v, index) in topics"
                                            :key="index"
                                            >{{ v.topic }}</option
                                        >
                                    </b-form-select>

                                    {{ modalTopics }}
                                </div>

                                <b-button
                                    v-for="(btn, index) in btnNames"
                                    :key="index"
                                    v-b-toggle="[btn + index]"
                                    class="btnss"
                                    >{{ btn }}</b-button
                                >

                                <!-- Elements to collapse -->
                                <b-collapse :id="btn + index" class="mt-2">
                                    <b-card>yawa</b-card>
                                </b-collapse>
                                <!-- <b-collapse id="collapse-b" class="mt-2">
                                        <b-card>bobo ml</b-card>
                                    </b-collapse>
                                    <b-collapse id="collapse-c" class="mt-2">
                                        <b-card>dota malakas</b-card>
                                    </b-collapse>
                                    <b-collapse id="collapse-d" class="mt-2">
                                        <b-card>kaso may bisaya YAWA!</b-card>
                                    </b-collapse> -->

                                <!-- Elements to collapse -->
                            </b-card-body>
                        </b-collapse>
                    </b-card>

                    <!-- <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
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
            <b-card-header header-tag="header" class="p-1" role="tab">
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
          </b-card> -->
                </div>
                <!--Accordian-->
            </b-modal>
        </div>
        <!--Import Question-->
        <div>
            <!--Type-->
            <b-form-select
                v-model="choiceFilter"
                size="sm"
                class="mt-3"
                @change="letsGo"
            >
                <!-- <select v-model="choiceFilter" @change="letsGo"> -->
                <option value="">Select a Format</option>
                <option>Essay</option>
                <option>Identification</option>
                <option>Multiple Choice</option>
                <!-- </select> -->
            </b-form-select>

            <!--Purpose-->
            <b-form-select v-model="choicePurpose" size="sm" class="mt-3">
                <!-- <select v-model="choicePurpose"> -->
                <option value="">Purpose of Form</option>
                <option>Activity</option>
                <option>Examamination</option>
                <option>Quiz</option>
                <!-- </select> -->
            </b-form-select>

            <!--Term-->
            <b-form-select v-model="choiceTerm" size="sm" class="mt-3">
                <option value="">Select Term</option>
                <option>Preliminary</option>
                <option>Midterm</option>
                <option>Final</option>
            </b-form-select>
            <!--Subject-->
            <b-form-select v-model="choiceSubj" size="sm" class="mt-3">
                <option value="">Select Subject</option>
                <option
                    :value="subj.subject_code"
                    v-for="(subj, index) in selectSubj"
                    :key="index"
                >
                    {{ subj.subject_name }}
                </option>
            </b-form-select>
            <!-- question body -->

            <div
                class=""
                v-for="(essay, index) in listEssay"
                :key="'Essay' + index"
            >
                <component :is="essay.format" :essayValues="essay"> </component>
            </div>

            <div
                class=""
                v-for="(identi, index) in listIdentification"
                :key="'identi' + index"
            >
                <component :is="identi.format" :identificationValues="identi">
                </component>
            </div>

            <div class="" v-for="(mcq, index) in listMCQ" :key="'mcq' + index">
                {{ index }}
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
    import app from './scripts/exam'
    export default app
</script>

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
