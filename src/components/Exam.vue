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
                                        @change="getTopicValue(modalTopics)"
                                    >
                                        <option value="">Select Term</option>
                                        <option
                                            v-for="(v, index) in topics.filter(
                                                (v) => v.type !== 'Essay'
                                            )"
                                            :key="index"
                                            :value="v"
                                            >{{ v.topic }}</option
                                        >
                                    </b-form-select>
                                </div>
                                <b-card-body
                                    class="grid"
                                    v-for="(btn, index) in btnNames"
                                    :key="index"
                                    v-b-toggle="[btn + index]"
                                >
                                    <b-button class="btnss col">{{
                                        btn
                                    }}</b-button>

                                    <!-- Elements to collapse -->
                                    <b-collapse
                                        :visible="topicValue.type === btn"
                                        class="mt-2 btnss col"
                                    >
                                        <b-card
                                            v-if="
                                                Object.values(topicValue)
                                                    .length > 0
                                            "
                                            @click="content.push(topicValue)"
                                        >
                                            <component
                                                class="highlight-card"
                                                v-if="
                                                    topicValue.type ===
                                                        'Identification'
                                                "
                                                :is="topicValue.format"
                                                :identificationValues="
                                                    topicValue
                                                "
                                            >
                                            </component>

                                            <component
                                                v-if="
                                                    topicValue.type ===
                                                        'Multiple Choice'
                                                "
                                                :is="topicValue.format"
                                                :mcqValues="topicValue"
                                            >
                                            </component>
                                        </b-card>
                                    </b-collapse>
                                </b-card-body>
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
                    v-for="(subj, index) in selectSubj"
                    :key="index"
                    :value="subj.subject_code"
                >
                    {{ subj.subject_name }}
                </option>
            </b-form-select>
        </div>
        <!-- question body -->

        <div
            class=""
            v-for="(essay, index) in listEssay"
            :key="'Essay' + index"
        >
            <component :is="essay.format" :essayValues="essay"> </component>
        </div>

        <div
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
        <b-button variant="primary" @click="createForm()" v-b-modal.modal-tall>
        <!-- <button @click="createForm()" v-b-modal.modal-tall style="margin-left: 10px"> -->
            Create Form
            <div> 
                <b-modal id="modal-tall" title="Student List">
                    <div>
                    
                        <b-form-group
                          label="Select Student"
                          v-slot="{ ariaDescribedby }"
                        >
                          <b-form-checkbox-group
                            v-model="selected"
                            :options="options"
                            :aria-describedby="ariaDescribedby"
                            name="flavour-2a"
                            stacked
                          ></b-form-checkbox-group>
                        </b-form-group>
                      </div>
                </b-modal>
            </div>
        </b-button>
        <!-- </button> -->

        <!-- <div
            class="accordion"
            role="tablist"
            style="width: 47%; margin-left: 10px;"
        >
            <b-card no-body class="mb-1">
                <b-card-header header-tag="header" class="p-1" role="tab">
                    <b-button block v-b-toggle.accordion-1 variant="info"
                        >Student List</b-button
                    >
                </b-card-header>
                <b-collapse
                    id="accordion-1"
                    visible
                    accordion="my-accordion"
                    role="tabpanel"
                >
                    <b-card-body>
                        <b-card-text>
                         
                            <div>
                                <b-form-group
                                    label="Select Students who will recieve"
                                >
                                    <b-form-checkbox-group
                                        name="flavour-2a"
                                        stacked
                                    ></b-form-checkbox-group>
                                </b-form-group>
                            </div>
                          
                        </b-card-text>
                    </b-card-body>
                </b-collapse>
            </b-card>
        </div> -->
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

<!-- <script>
      export default {
        data() {
          return {
            selected: [], // Must be an array reference!
            options: [
              { text: 'Argarin David', value: 'orange' },
              { text: 'Sigua Mario', value: 'apple' },
              { text: 'Gorospe Vincent', value: 'pineapple' },
              { text: 'Calil San', value: 'grape' }
            ]
          }
        }
      }
    </script> -->
