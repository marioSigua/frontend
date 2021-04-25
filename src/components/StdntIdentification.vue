<template>
     <div>
          <b-button-close></b-button-close>
          <div class="Identification">
               <img
                    v-if="identi.question_image"
                    :src="imgUrl"
                    height="300"
                    width="300"
                    alt=""
               />

               <p v-else>{{ identi.question_text }}</p>
               <br />
               <input
                    v-model="identi.student_answer"
                    @keydown="preventCopy"
                    @copy.prevent
                    @paste.prevent
                    type="text"
                    class="idn"
                    :disabled="!isDisabled"
               />
          </div>
     </div>
</template>

<script>
     export default {
          props: ['identi', 'isDisabled'],

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
               if (this.identi.question_image) {
                    this.imgUrl = this.identi.question_image
               }
          },
     }
</script>

<style scoped>
     @import './styles/ExamForm.css';
</style>
