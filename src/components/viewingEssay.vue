<template>
     <div>
          <b-button-close></b-button-close>
          <div
               class="Essay unselected"
               :class="{
                    'is-correct': essay.student_score,
                    'is-wrong': !essay.student_score,
               }"
          >
               <img
                    v-if="essay.question_image"
                    :src="imgurl"
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
          <!--pts-->
          <b-input-group class="mt-3 pts">
               <template #append>
                    <b-input-group-text
                         ><strong>pts.</strong></b-input-group-text
                    >
               </template>
               <b-form-input></b-form-input>
          </b-input-group>
          <!--pts-->
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
                    this.imgurl = JSON.parse(this.essay.question_image)
               }
          },
     }
</script>
<style scoped>
     @import './styles/ExamForm.css';
</style>
