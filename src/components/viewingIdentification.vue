<template>
     <div>
          <b-button-close></b-button-close>
          <div
               class="Identification"
               :class="{
                    'is-correct': isCorrect,
                    'is-wrong': !isCorrect,
               }"
          >
               <img height="300" width="300" :src="imgUrl" alt="" />
               <br />
               <input
                    v-model="identi.student_answer"
                    @keydown="preventCopy"
                    @copy.prevent
                    @paste.prevent
                    type="text"
                    class="idn"
               />
          </div>
     </div>
</template>

<script>
     export default {
          props: ['identi'],

          computed: {
               isCorrect() {
                    return this.identi.student_answer ===
                         this.identi.form_answer
                         ? true
                         : false
               },
          },

          data() {
               return {
                    imgUrl: null,
               }
          },

          methods: {
               preventCopy(e) {
                    return e
               },
          },

          mounted() {
               console.log(this.identi.student_answer)
               if (this.identi.question_image) {
                    this.imgUrl = JSON.parse(this.identi.question_image)
               }
          },
     }
</script>

<style scoped>
     @import './styles/ExamForm.css';
</style>
