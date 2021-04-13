<template>
     <div class="MCQ">
          <b-button-close></b-button-close>
          <div class="ui form">
               <div class="grouped fields">
                    <textarea
                         name=""
                         :value="mcq.question"
                         id=""
                         cols="30"
                         rows="10"
                    ></textarea>
                    <img :src="imgUrl" alt="" />
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
                                        :value="mcq.choices.a"
                                        >{{ mcq.choices.a }}</b-form-radio
                                   >
                                   <b-form-radio
                                        class="mb-2 unselected"
                                        :value="mcq.choices.b"
                                        >{{ mcq.choices.b }}</b-form-radio
                                   >
                                   <b-form-radio
                                        class="mb-2 unselected"
                                        :value="mcq.choices.c"
                                        >{{ mcq.choices.c }}</b-form-radio
                                   >
                                   <b-form-radio
                                        class="mb-2 unselected"
                                        :value="mcq.choices.d"
                                        >{{ mcq.choices.d }}</b-form-radio
                                   >
                              </b-form-radio-group>
                         </div>
                    </div>
                    <!-- <div class="field">
                         <div class="ui radio checkbox">
                              <b-form-group v-slot="{ ariaDescribedby }">
                                   <b-form-radio-group
                                        v-model="mcq.student_answer"
                                        :aria-describedby="ariaDescribedby"
                                        name="plain-inline"
                                        plain
                                        >{{ mcq.choices.b }}</b-form-radio-group
                                   >
                              </b-form-group>
                         </div>
                    </div>
                    <div class="field">
                         <div class="ui radio checkbox">
                              <b-form-group v-slot="{ ariaDescribedby }">
                                   <b-form-radio-group
                                        v-model="mcq.student_answer"
                                        :aria-describedby="ariaDescribedby"
                                        name="plain-inline"
                                        plain
                                        >{{ mcq.choices.c }}</b-form-radio-group
                                   >
                              </b-form-group>
                         </div>
                    </div>
                    <div class="field">
                         <div class="ui radio checkbox">
                              <b-form-group v-slot="{ ariaDescribedby }">
                                   <b-form-radio-group
                                        v-model="mcq.student_answer"
                                        :aria-describedby="ariaDescribedby"
                                        name="plain-inline"
                                        plain
                                        >{{ mcq.choices.d }}</b-form-radio-group
                                   >
                              </b-form-group>
                         </div>
                    </div> -->
               </div>
          </div>
     </div>
</template>

<script>
     export default {
          props: ['mcq'],

          data() {
               return {
                    imgUrl: '',
               }
          },

          mounted() {
               var canvas = document.createElement('canvas')
               canvas.width = 620
               canvas.height = 80
               var ctx = canvas.getContext('2d')
               ctx.font = '30px Arial'
               var text = this.mcq.question
               ctx.fillText(text, 10, 50)
               var img = document.createElement('img')
               img.src = canvas.toDataURL()
               this.imgUrl = img.src
          },
     }
</script>

<style scoped>
     @import './styles/ExamForm.css';
</style>
