<template lang="html">
    
     <section>
         <h1>yawa</h1>
         <p>{{description}}</p>
          <ul>
               <li v-for="(question, q) in questions" :key="q" class="backdrop">
                    <p>{{question.question}}</p>
                    <img :src="question.image" alt="">
                    <div v-if="question.type == 'essay'">
                     <textarea name="" id="" cols="30" rows="10" class="text"></textarea>
                    </div>
 
                    <div v-else-if="question.type == 'identification'">
                         <div>
                              <input
                                   class="ptsInput"
                                   v-model="question.question_score"
                              />
                              <span>pts</span>
                         </div>
                     <input type="text" class="input">
                    </div>
 
                    <div v-else>
                     <div >
                          <input type="radio" id="male" name="gender" value="male" >
                          <label for="male">Male</label><br>
                          <input type="radio" id="female" name="gender" value="female">
                          <label for="female">Female</label><br>
                          <input type="radio" id="other" name="gender" value="other">
                          <label for="other">Other</label>
                     </div>
                    </div>
               </li>
          </ul>
 
     </section>
 </template>
 
 <script>
  
 
     export default {
        
 
          data() {
               return {
                    newItem: '',
                    description:"description",
                    questions: [
                    {
                         topic: 'yawa',
                         form_answer: 'diko ',
                         question: 'essay',
                         student_answer: 'diko',
                         question_score: '2',
                         error: '',
                         type: 'essay',
                         choices: { a: '', b: '', c: '' },
                    },
                    {
                         topic: 'yawa',
                         form_answer: 'diko ',
                         question: 'identification',
                         student_answer: 'diko',
                         question_score: '2',
                         error: '',
                         type: 'identification',
                         choices: { a: '', b: '', c: '' },
                    },
                    {
                         topic: 'yawa',
                         form_answer: 'diko ',
                         question: 'mcq',
                         student_answer: 'diko',
                         question_score: '2',
                         error: '',
                         type: 'multiple choice',
                         choices: { a: '', b: '', c: 'd' },
                    }
 
                    ],
 
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
 
     .text,
     .input {
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
 