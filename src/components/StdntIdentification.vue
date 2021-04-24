<template>
     <div>
          <b-button-close></b-button-close>
          <div class="Identification">
               <img height="300" width="300" :src="imgUrl" alt="" />
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


     <div>
          <b-button-close></b-button-close>
          <div class="Identification">
              <p>Question goes here</p>
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
