<template>
     <div class="ExamType" id="Identification">
          <b-button-close></b-button-close>
          <h2>Identification</h2>
          <label for="Topic">Topic: </label>
          <input type="text" v-model="identificationValues.topic" />
          <div>
               <p>Question</p>
               <textarea
                    v-model="identificationValues.question"
                    rows="4"
                    cols="50"
               ></textarea
               ><br />
               <label for="Answer">Answer </label>
               <input
                    v-model="identificationValues.form_answer"
                    type="text"
               /><br /><br />
          </div>
     </div>
</template>

<script>
     export default {
          props: ['identificationValues'],

          methods: {
               addNewLine() {
                    let splitQuestion = this.identificationValues.question.split(
                         ' '
                    )

                    if (splitQuestion.length % 12 === 0) {
                         splitQuestion.push('\n')
                         this.identificationValues.question = splitQuestion.join(
                              ' '
                         )
                    }
               },
          },
     }
</script>
