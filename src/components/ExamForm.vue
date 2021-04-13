<template>
     <div class="Eform">
          <div class="Term">
               <div class="clr"></div>
               <h1>Untitled form</h1>
               <h5>Desciption</h5>
          </div>
          <div class="Term">
               <div class="Info"></div>
               <label for="text">First Name:</label>
               <input />
               <label for="text">Last Name:</label>
               <input />
          </div>

          ,
          <div class="" v-for="(quest, index) in questionList" :key="index">
               <component
                    v-if="quest.type === 'Identification'"
                    :key="`${index}-${quest.batch_number}`"
                    :is="quest.response_name"
                    :identi="quest"
               >
               </component>

               <component
                    v-if="quest.type === 'Essay'"
                    :key="`${index}-${quest.batch_number}`"
                    :is="quest.response_name"
                    :essay="quest"
               >
               </component>

               <component
                    v-if="quest.type === 'Multiple Choice'"
                    :key="`${index}-${quest.batch_number}`"
                    :is="quest.response_name"
                    :mcq="quest"
               >
               </component>
          </div>

          <div class="btnx">
               <b-button
                    @click="createStudentForm"
                    variant="primary"
                    class="submit"
                    >Submit</b-button
               >
          </div>
     </div>
</template>

<script>
     import app from './scripts/examform'
     export default app
</script>

<style scoped>
     @import './styles/ExamForm.css';
</style>
