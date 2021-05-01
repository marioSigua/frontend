<template>
     <div
          class="MCQ"
          :class="{
               'is-correct': isCorrect,
               'is-wrong': !isCorrect,
          }"
     >
          <b-button-close></b-button-close>
          <div class="ui form">
               <div class="grouped fields">
                    <!-- <textarea
                         name=""
                         :value="mcq.question"
                         id=""
                         cols="30"
                         rows="10"
                    ></textarea> -->
                    <img
                         v-if="mcq.question_image"
                         :src="imgurl"
                         height="300"
                         width="300"
                         alt=""
                    />

                    <p v-else>{{ mcq.question_text }}</p>
                    <div class="field">
                         <div class="ui radio checkbox">
                              <b-form-radio-group
                                   id="radio-group-1"
                                   v-model="mcq.student_answer"
                                   name="radio-options"
                                   stacked
                                   :disabled="!isDisabled"
                              >
                                   <b-form-radio
                                        class="mb-2 unselected"
                                        :value="choice.a"
                                        >{{ choice.a }}</b-form-radio
                                   >
                                   <b-form-radio
                                        class="mb-2 unselected"
                                        :value="choice.b"
                                        >{{ choice.b }}</b-form-radio
                                   >
                                   <b-form-radio
                                        class="mb-2 unselected"
                                        :value="choice.c"
                                        >{{ choice.c }}</b-form-radio
                                   >
                                   <b-form-radio
                                        class="mb-2 unselected"
                                        :value="choice.d"
                                        >{{ choice.d }}</b-form-radio
                                   >
                              </b-form-radio-group>
                         </div>
                    </div>
               </div>
          </div>
     </div>
</template>

<script>
     export default {
          props: ['mcq', 'isDisabled'],

          computed: {
               choice() {
                    return JSON.parse(this.mcq.choices)
               },

               isCorrect() {
                    return this.mcq.student_answer === this.mcq.form_answer
                         ? true
                         : false
               },
          },

          data() {
               return {
                    imgUrl: null,
               }
          },

          mounted() {
               console.log(this.mcq.student_answer)
               if (this.mcq.question_image) {
                    this.imgUrl = JSON.parse(this.mcq.question_image)
               }
          },
     }
</script>

<style scoped>
     @import './styles/ExamForm.css';
</style>
