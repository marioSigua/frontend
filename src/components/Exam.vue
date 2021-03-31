<template>
      <div>
            <header>
                  <ul>
                        <li class="float">
                              <div>
                                    <img
                                          src="https://i.imgur.com/qO1REGc.png"
                                          width="85"
                                          height="85"
                                    />
                              </div>
                        </li>
                        <li class="float">
                              <h1>Lyceum of Subic Bay</h1>
                              <h4>College of Engineering</h4>
                        </li>
                  </ul>
            </header>
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
            <div
                  class=""
                  v-for="(components, index) in listComponents"
                  :key="index"
            >
                  <component
                        v-if="
                              components.type === 'Essay' &&
                                    userValues[index].type === 'Essay'
                        "
                        :is="components.format"
                        :essayValues="userValues[index]"
                  >
                  </component>

                  <component
                        v-if="
                              components.type === 'Identification' &&
                                    userValues[index].type === 'Identification'
                        "
                        :is="components.format"
                        :identificationValues="userValues[index]"
                  >
                  </component>

                  <component
                        v-if="
                              components.type === 'Multiple Choice' &&
                                    userValues[index].type === 'Multiple Choice'
                        "
                        :is="components.format"
                        :mcqValues="userValues[index]"
                  >
                  </component>
            </div>

            <button @click="createForm()">
                  Create {{ choicePurpose ? choicePurpose : 'Form' }}
            </button>
      </div>
</template>

<script>
      export default {
            components: {},

            computed: {
                  listComponents() {
                        return this.content
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
                  }
            },

            methods: {
                  createForm() {
                        console.log(this.userValues)
                  },

                  letsGo() {
                        switch (this.choiceFilter) {
                              case 'Essay':
                                    this.userValues.push({
                                          question: '',
                                          student_input: '',
                                          form_number: `${this.choiceFilter}-${this.formNumber}`,
                                          type: this.choiceFilter,
                                    })

                                    this.content.push({
                                          format: 'exam-essay',
                                          type: this.choiceFilter,
                                    })
                                    this.formNumber++
                                    break

                              case 'Identification':
                                    this.userValues.push({
                                          question: '',
                                          student_input: '',
                                          form_number: `${this.choiceFilter}-${this.formNumber}`,
                                          form_answer: '',
                                          type: this.choiceFilter,
                                    })

                                    this.content.push({
                                          format: 'exam-identification',
                                          type: this.choiceFilter,
                                    })
                                    this.formNumber++
                                    break

                              case 'Multiple Choice':
                                    this.userValues.push({
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

                                          type: this.choiceFilter,
                                    })

                                    this.content.push({
                                          format: 'exam-mcq',
                                          type: this.choiceFilter,
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
