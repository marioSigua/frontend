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

            <div class="" v-for="(components, index) in content" :key="index">
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

            <button @click="showValues()">Eut</button>
      </div>
</template>

<script>
      export default {
            components: {},

            data() {
                  return {
                        content: [],
                        choiceFilter: '',

                        userValues: [],

                        value: [],
                  }
            },

            methods: {
                  letsGo() {
                        switch (this.choiceFilter) {
                              case 'Essay':
                                    this.userValues.push({
                                          question: '',
                                          answer: '',
                                          type: this.choiceFilter,
                                    })

                                    this.content.push({
                                          format: 'exam-essay',
                                          type: this.choiceFilter,
                                    })

                                    break
                              case 'Identification':
                                    this.userValues.push({
                                          question: '',
                                          userInput: '',
                                          answer: '',
                                          type: this.choiceFilter,
                                    })

                                    this.content.push({
                                          format: 'exam-identification',
                                          type: this.choiceFilter,
                                    })
                                    break

                              case 'Multiple Choice':
                                    this.userValues.push({
                                          question: '',
                                          answer: '',
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

                                    break
                        }

                        this.choiceFilter = ''
                        console.log(this.content)
                  },

                  showValues() {
                        this.value.push(this.userValues)
                        console.log(this.value)
                  },
            },
      }
</script>
ExamEssay

<style scoped>
      @import './styles/Exam.css';
</style>
