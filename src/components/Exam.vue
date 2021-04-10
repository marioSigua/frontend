<template>
  <div>
    <navbar />
    <!--Import Question-->
    <div>
      <!--Accordian-->
      <b-modal id="modal-xl" size="xl" title="Extra Large Modal">
        <div class="accordion" role="tablist">
          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
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
                    class="mt-3 dtn"
                  ></b-form-select>
                </div>
                <b-button v-b-toggle="['collapse-a']" class="btnss"
                  >Multiple Choice</b-button
                >
                <b-button v-b-toggle="['collapse-b']" class="btnss"
                  >Identification</b-button
                >
                <b-button v-b-toggle="['collapse-c']" class="btnss"
                  >Essay</b-button
                >
                <b-button v-b-toggle="['collapse-d']" class="btnss"
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
          </b-card>
        </div>
        <!--Accordian-->
      </b-modal>
    </div>
    <!--Import Question-->
    <div>
      <div>
        <!--Type-->
        <b-form-select
          v-model="choiceFilter"
          :options="options"
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
        <b-form-select
          v-model="choicePurpose"
          :options="options"
          size="sm"
          class="mt-3"
        >
          <!-- <select v-model="choicePurpose"> -->
          <option value="">Purpose of Form</option>
          <option>Activity</option>
          <option>Examamination</option>
          <option>Quiz</option>
          <!-- </select> -->
        </b-form-select>

        <!--Term-->
        <b-form-select
          v-model="choicePurpose"
          :options="options"
          size="sm"
          class="mt-3"
        >
          <option value="">Select Term</option>
          <option>Preliminary</option>
          <option>Midterm</option>
          <option>Final</option>
        </b-form-select>

        <!--Subject-->
        <b-form-select
          v-model="choicePurpose"
          :options="options"
          size="sm"
          class="mt-3"
        >
          <option value="">Select Subject</option>
          <option>Subject1</option>
          <option>Subject2</option>
          <option>Subject3</option>
        </b-form-select>

        <!-- <b-form-select v-model="choicePurpose" :options="options" size="sm" class="mt-3">                    
                        <option value="">Select Topic</option>
                        <option>topic1</option>
                        <option>topic2</option>
                        <option>topic3</option>
                  </b-form-select> -->

        <!--MODAL BUTTON-->
        <b-button v-b-modal.modal-xl variant="primary" class="modbtn"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-box-arrow-down"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M3.5 10a.5.5 0 0 1-.5-.5v-8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 0 0 1h2A1.5 1.5 0 0 0 14 9.5v-8A1.5 1.5 0 0 0 12.5 0h-9A1.5 1.5 0 0 0 2 1.5v8A1.5 1.5 0 0 0 3.5 11h2a.5.5 0 0 0 0-1h-2z"
            />
            <path
              fill-rule="evenodd"
              d="M7.646 15.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 14.293V5.5a.5.5 0 0 0-1 0v8.793l-2.146-2.147a.5.5 0 0 0-.708.708l3 3z"
            />
          </svg>
          Import Question</b-button
        >
      </div>

      <!-- question body -->
      <div
        class="qBody"
        v-for="(components, index) in listComponents"
        :key="index"
      >
        <component
          v-if="
            components.type === 'Essay' && userValues[index].type === 'Essay'
          "
          :is="components.format"
          :essayValues="userValues[index]"
        >
        </component>

        <div
          v-else-if="
            components.type === 'Identification' &&
              userValues[index].type === 'Identification'
          "
        >
          <component
            :is="components.format"
            :identificationValues="userValues[index]"
          >
          </component>
        </div>

        <div v-else>
          <component :is="components.format" :mcqValues="userValues[index]">
          </component>
        </div>
      </div>
      <br />
      <button @click="createForm()" style="margin-left: 10px">
        Create {{ choicePurpose ? choicePurpose : "Form" }}
      </button>
    </div>
  </div>
</template>

<script>
import Navbar from "./navbar.vue";
export default {
  components: { Navbar },

  computed: {
    listComponents() {
      return this.content;
    },
  },

  data() {
    return {
      choiceFilter: "",
      choicePurpose: "",

      formNumber: 1,
      //question body
      content: [],

      userValues: [],

      selected: [],

      options: [],
    };
  },

  methods: {
    createForm() {
      console.log(this.userValues);
    },

    letsGo() {
      console.log(this.listComponents);
      switch (this.choiceFilter) {
        case "Essay":
          this.userValues.push({
            question: "",
            student_input: "",
            form_number: `${this.choiceFilter}-${this.formNumber}`,
            type: this.choiceFilter,
          });

          this.content.push({
            format: "exam-essay",
            type: this.choiceFilter,
          });
          this.formNumber++;
          break;

        case "Identification":
          this.userValues.push({
            question: "",
            student_input: "",
            form_number: `${this.choiceFilter}-${this.formNumber}`,
            form_answer: "",
            type: this.choiceFilter,
          });

          this.content.push({
            format: "exam-identification",
            type: this.choiceFilter,
          });
          this.formNumber++;
          break;

        case "Multiple Choice":
          this.userValues.push({
            question: "",
            student_input: "",
            form_number: `${this.choiceFilter}-${this.formNumber}`,
            form_answer: "",
            choices: {
              a: "",
              b: "",
              c: "",
              d: "",
            },

            type: this.choiceFilter,
          });

          this.content.push({
            format: "exam-mcq",
            type: this.choiceFilter,
          });
          this.formNumber++;
          break;

        default:
          return "";
      }
    },
  },
};
</script>
ExamEssay

<style scoped>
@import "./styles/Exam.css";
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
