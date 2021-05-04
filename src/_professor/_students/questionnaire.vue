<template lang="html">
     <section>
          <h1>yawa</h1>
          <p>{{ description }}</p>

          <ul>
               <li v-for="(li, q) in questions" :key="q" class="backdrop">
                    <div v-if="li.type == 'essay'">
                         <h3>Essay</h3>

                         <textarea
                              v-if="li.question_type === 'text'"
                              v-model="li.question"
                         ></textarea>

                         <img
                              v-else
                              class="is-rounded"
                              height="300"
                              width="300"
                              :src="
                                   li.question
                                        ? li.question
                                        : 'https://i.imgur.com/bCOd9N0.jpg'
                              "
                              alt="Placeholder image"
                         />

                         <input
                              type="text"
                              name=""
                              value=""
                              placeholder="Your answer"
                              v-model="li.student_answer"
                         />
                    </div>

                    <div v-else-if="li.type == 'identification'">
                         <h3>Identification</h3>

                         Question
                         <div class="wrapper">
                              <textarea
                                   v-if="li.question_type === 'text'"
                                   v-model="li.question"
                              ></textarea>

                              <img
                                   v-else
                                   class="is-rounded"
                                   height="300"
                                   width="300"
                                   :src="
                                        li.question
                                             ? li.question
                                             : 'https://i.imgur.com/bCOd9N0.jpg'
                                   "
                                   alt="Placeholder image"
                              />
                         </div>
                         <input
                              type="text"
                              name=""
                              value=""
                              placeholder="Your answer"
                              v-model="li.student_answer"
                         />
                    </div>

                    <div v-else>
                         <h3>Multiple Choice</h3>

                         Question
                         <div class="wrapper">
                              <textarea
                                   v-if="li.question_type === 'text'"
                                   v-model="li.question"
                              ></textarea>

                              <img
                                   v-else
                                   class="is-rounded"
                                   height="300"
                                   width="300"
                                   :src="
                                        li.question
                                             ? li.question
                                             : 'https://i.imgur.com/bCOd9N0.jpg'
                                   "
                                   alt="Placeholder image"
                              />
                         </div>

                         Choices:
                         <div></div>
                         <input type="radio" name="" :value="li.choices.a" />
                         <label>{{ li.choices.a }}</label>
                         <br />

                         <input type="radio" name="" :value="li.choices.b" />
                         <label>{{ li.choices.b }}</label>
                         <br />

                         <input type="radio" name="" :value="li.choices.c" />
                         <label>{{ li.choices.c }}</label>
                         <br />
                    </div>
               </li>
          </ul>

          <button>Submit</button>
     </section>
</template>

<script>
     export default {
          data() {
               return {
                    questions: [],
                    description: 'sample',

                    listStudents: [],

                    stdEmail: [],
               }
          },

          methods: {},

          mounted() {
               const payload = {
                    token: this.$route.params.token,
                    student_id: this.$route.params.student_id,
               }

               this.$store
                    .dispatch('getQuestion', payload)
                    .then((result) => {
                         console.log(result)

                         this.questions = result
                    })
                    .catch((err) => {
                         console.log(err)
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
