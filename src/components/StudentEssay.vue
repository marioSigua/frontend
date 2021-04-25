<template>
     <div>
          <b-button-close></b-button-close>
          <div class="Essay unselected">
               <img
                    v-if="essay.question_image"
                    :src="imgUrl"
                    height="300"
                    width="300"
                    alt=""
               />

               <p v-else>{{ essay.question_text }}</p>
               <br />
               <textarea
                    @keydown="preventCopy"
                    @copy.prevent
                    @paste.prevent
                    v-model="essay.student_answer"
                    name=""
                    id=""
                    cols="94"
                    rows="1"
                    :disabled="!isDisabled"
               ></textarea>
          </div>
     </div>
</template>
<script>
     export default {
          props: ['essay', 'isDisabled'],

          data() {
               return {
                    imgurl: '',
               }
          },

          methods: {
               preventCopy(e) {
                    return e
               },
          },

          mounted() {
               if (this.essay.question_image) {
                    this.imgurl = this.essay.question_image
               }
          },
     }
</script>
<style scoped>
     @import './styles/ExamForm.css';
</style>
