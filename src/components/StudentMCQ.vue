<template>
     <div class="MCQ">
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
                    <img :src="imgUrl" height="300" width="300" alt="" />
                    <div class="field">
                         <div class="ui radio checkbox">
                              <b-form-radio-group
                                   id="radio-group-1"
                                   v-model="mcq.student_answer"
                                   name="radio-options"
                                   stacked
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
          props: ['mcq'],

          computed: {
               choice() {
                    return JSON.parse(this.mcq.choices)
               },
          },

          data() {
               return {
                    imgUrl: null,
               }
          },

          mounted() {
               if (this.mcq.question_image) {
                    this.imgUrl = new Buffer.from(
                         this.mcq.question_image,
                         'base64'
                    )
               }
          },
     }
</script>

<style scoped>
     @import './styles/ExamForm.css';
</style>
