<template lang="html">
     <div>
          <div class="selection">
               <select v-model="selectedTerm">
                    <option value="">-- Select Term --</option>
                    <option value="Preliminary">-- Preliminary --</option>
                    <option value="Midterm">-- Midterm --</option>
                    <option value="Pre-Finals">-- Pre-Finals --</option>
                    <option value="Finals">-- Finals --</option>
               </select>
               <select v-model="selectedSubject">
                    <option value="">-- Select Subject --</option>
                    <option
                         v-for="(subj, s) in subjectList"
                         :key="s"
                         :value="subj.subject_code"
                         >{{ subj.subject_name }}</option
                    >
               </select>
               <button type="button" @click="$router.push({ name: 'history' })">
                    History
               </button>

               <button @click="importQuestion">Import Question</button>
          </div>
          <br />

          <ul>
               <li v-for="(question, q) in questions" :key="q" class="backdrop">
                    <button id="remove" @click="remove(q)">Remove</button>
                    <div v-if="question.type == 'essay'">
                         <h3>Essay</h3>

                         <div>
                              <input
                                   class="ptsInput"
                                   v-model="question.question_score"
                              />
                              <span>pts</span>
                         </div>

                         <textarea v-model="question.question"></textarea>
                    </div>

                    <div v-else-if="question.type == 'identification'">
                         <h3>Identification</h3>

                         <div class="topic">
                              <label for="Topic">Topic:</label>
                              <input type="text" v-model="question.topic" />
                         </div>

                         <div>
                              <input
                                   class="ptsInput"
                                   v-model="question.question_score"
                              />
                              <span>pts</span>
                         </div>

                         Question
                         <div class="wrapper">
                              <tabs :mode="mode" :body="question">
                                   <tab title="Text"
                                        ><textarea
                                             v-model="question.question"
                                        ></textarea
                                   ></tab>

                                   <tab title="Image">
                                        <img
                                             class="is-rounded"
                                             height="300"
                                             width="300"
                                             :src="
                                                  question.question
                                                       ? question.question
                                                       : 'https://i.imgur.com/bCOd9N0.jpg'
                                             "
                                             alt="Placeholder image"
                                             @click="$refs.file[q].click()"
                                        />
                                        <input
                                             ref="file"
                                             @change="onFileChange($event, q)"
                                             type="file"
                                             style="display:none"
                                        />
                                        <span class="danger">
                                             {{ question.error }}
                                        </span>
                                   </tab>
                              </tabs>
                         </div>
                         Answer
                         <input
                              type="text"
                              name=""
                              value=""
                              v-model="question.form_answer"
                         />
                    </div>

                    <div v-else>
                         <h3>Multiple Choice</h3>

                         <div class="topic">
                              <label for="Topic">Topic:</label>
                              <input type="text" v-model="question.topic" />
                         </div>

                         <div>
                              <input
                                   class="ptsInput"
                                   v-model="question.question_score"
                              />
                              <span>pts</span>
                         </div>

                         Question
                         <div class="wrapper">
                              <tabs :mode="mode" :body="question">
                                   <tab title="Text"
                                        ><textarea
                                             v-model="question.question"
                                        ></textarea
                                   ></tab>

                                   <tab title="Image">
                                        <img
                                             class="is-rounded"
                                             height="300"
                                             width="300"
                                             :src="
                                                  question.question
                                                       ? question.question
                                                       : 'https://i.imgur.com/bCOd9N0.jpg'
                                             "
                                             alt="Placeholder image"
                                             @click="$refs.file[q].click()"
                                        />

                                        <input
                                             ref="file"
                                             @change="onFileChange($event, q)"
                                             type="file"
                                             style="display:none"
                                        />

                                        <span class="danger">
                                             {{ question.error }}
                                        </span>
                                   </tab>
                              </tabs>
                         </div>

                         Answer
                         <input
                              v-model="question.form_answer"
                              type="text"
                              name=""
                              value=""
                         />
                         Choices:
                         <input
                              v-model="question.choices.a"
                              type="text"
                              name=""
                              value=""
                         />
                         <input
                              v-model="question.choices.b"
                              type="text"
                              name=""
                              value=""
                         />
                         <input
                              v-model="question.choices.c"
                              type="text"
                              name=""
                              value=""
                         />
                    </div>
               </li>
          </ul>

          <div class="selection">
               <select v-model="newItem">
                    <option value="">-- New Item --</option>
                    <option value="essay">Essay</option>
                    <option value="identification">Identification</option>
                    <option value="mcq">Multiple Choice</option>
               </select>
               <button type="button" @click="add">Add</button>

               <div></div>
               <button type="button" @click="createForm" name="button">
                    Create Form
               </button>
          </div>
     </div>
</template>

<script>
     import Tab from '../_tabs/tab'
     import Tabs from '../_tabs/tabs'

     export default {
          components: {
               Tab,
               Tabs,
          },

          data() {
               return {
                    newItem: '',
                    questions: [],

                    subjectList: [],

                    kamote: [],

                    mode: '',
                    selectedTerm: '',
                    selectedSubject: '',

                    questionBody: {
                         topic: '',
                         form_answer: '',
                         question: '',
                         student_answer: '',
                         question_score: '',
                         error: '',
                         question_type: '',
                         choices: { a: '', b: '', c: '' },
                    },

                    tobeDeleted: {
                         error: '',
                    },

                    //palitan nalang ng value ng mga email ng student pag meron na ui

                    stdEmail: [
                         'caliljaudiannn@gmail.com',
                         'caliljaudiannnn@gmail.com',
                    ],
               }
          },

          methods: {
               add() {
                    let d = Date.now()
                    switch (this.newItem) {
                         case 'essay':
                              this.questions.push({
                                   type: 'essay',
                                   form_number: d,
                                   ...this.questionBody,
                              })

                              break
                         case 'identification':
                              this.questions.push({
                                   type: 'identification',
                                   form_number: d,
                                   ...this.questionBody,
                              })
                              break
                         case 'mcq':
                              this.questions.push({
                                   type: 'mcq',
                                   form_number: d,
                                   ...this.questionBody,
                              })
                              break
                         default:
                              alert('Please select a type')
                    }
                    this.newItem = ''
               },

               async createForm() {
                    const { state } = this.$store

                    if (!this.selectedSubject)
                         return alert('Please Select a Subject')

                    Object.keys(this.tobeDeleted).forEach(
                         (k) => delete this.questions[k]
                    )

                    let batch = Date.now()
                    let formData = new FormData()

                    formData.append('batch_number', batch)
                    formData.append('term', this.selectedTerm)
                    formData.append('subject_code', this.selectedSubject)
                    formData.append(
                         'question_form',
                         JSON.stringify(this.questions)
                    )
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
                              this.questions = []
                         }
                    } catch (error) {
                         console.log(error.response)
                    }
               },

               remove(s) {
                    this.questions = this.questions.filter((v, i) => {
                         return !(i == s)
                    })
               },

               append(item) {
                    this.questions.push(item)
               },

               importQuestion() {
                    this.$emit('import')
               },

               appendPremade(question) {
                    this.questions.push(question)
               },

               encodeBase64(file) {
                    return new Promise((resolve, reject) => {
                         const reader = new FileReader()
                         reader.readAsDataURL(file)
                         reader.onload = () => resolve(reader.result)
                         reader.onerror = (error) => reject(error)
                    })
               },

               async onFileChange(e, i) {
                    let imgFormats = ['jpg', 'jpeg', 'png', 'PNG']
                    const file = e.target.files[0]
                    let fileFormat = file.name.split('.')[1]

                    if (!file) {
                         e.preventDefault()
                         return
                    }

                    if (!imgFormats.includes(fileFormat)) {
                         e.preventDefault()
                         this.questions[i].error =
                              'jpg, jpeg and png are the only file supported'
                         return
                    }

                    if (file.size > 600 * 600) {
                         e.preventDefault()
                         this.questions[i].error = 'Image must be less than 1mb'
                         return
                    }

                    this.questions[i].error = ''

                    this.questions[i].imgUrl = URL.createObjectURL(file)

                    this.questions[i].question = await this.encodeBase64(file)
               },
          },

          mounted() {
               // call subjects then handle data here
               this.$store.dispatch('profSubjects').then((subjects) => {
                    // save locally
                    this.subjectList = subjects
               })
          },
     }
</script>

<style lang="css" scoped>
     .topic {
          width: 40%;
          margin-bottom: 10px;
     }

     span {
          padding: 10px;
     }

     .ptsInput {
          max-width: 50px;
          max-height: 50px;
          padding: 10px;
     }

     .selection {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr;
          grid-gap: 10px;
     }

     #remove {
          float: right;
     }
     #remove:hover {
          background: rgba(255, 0, 0, 0.4);
     }

     h3 {
          padding-bottom: 10px;
     }

     ul {
          list-style-type: none;
     }

     li {
          padding: 10px;
          background: rgba(0, 0, 0, 0.7);
          border-radius: 10px;
          margin: 10px auto;
     }

     textarea,
     input {
          padding: 10px;
          border: 1px solid #aaa;
          border-radius: 10px;
          background: rgba(0, 0, 0, 0.3);
          color: white;
          font-family: inherit;
          font-size: inherit;
          width: 100%;
          margin-bottom: 5px;
     }
</style>
