<template lang="html">
     <section>
          <h1>yawa</h1>
          <p>{{ description }}</p>
          <ul>
               <li v-for="(list, q) in questions" :key="q" class="backdrop">
                    <p v-if="list.question_type === 'text'">
                         {{ list.question }}
                    </p>
                    <img v-else :src="list.question" alt="" />
                    <!-- end of if -->

                    <div v-if="list.type == 'essay'">
                         <textarea name="" id="" cols="30" rows="10"></textarea>
                    </div>

                    <div v-else-if="list.type == 'identification'">
                         <input type="text" />
                    </div>

                    <div v-else>
                         Choices:
                         <input :value="list.choices.a" type="radio" name="" />
                         {{ list.choices.a }}
                         <input :value="list.choices.b" type="radio" name="" />
                         {{ list.choices.b }}
                         <input
                              :value="list.choices.c"
                              type="radio"
                              name=""
                         />{{ list.choices.c }}
                    </div>
               </li>
          </ul>
     </section>
</template>

<script>
     export default {
          data() {
               return {
                    questions: [],
                    description: 'sample',
               }
          },
          methods: {},

          mounted() {
               this.$store
                    .dispatch('getResponse', this.$route.params.token)
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
