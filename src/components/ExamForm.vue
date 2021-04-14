<template>
     <div class="Eform">
          <div class="Term">
               <div class="clr"></div>
               <h1>Untitled form</h1>
               <h5>Desciption</h5>
          </div>
          <div class="Term">
               <div class="Info"></div>
               <label for="text">Student ID:</label>
               <input v-model="student_id" />
               <div class="Info"></div>
               <label for="text">First Name:</label>
               <input v-model="fname" />
               <label for="text">Last Name:</label>
               <input v-model="lname" />
          </div>

          ,
          <div class="" v-for="(quest, index) in questionList" :key="index">
               <component
                    v-if="quest.type === 'Identification'"
                    :key="`${index}-${quest.batch_number}`"
                    :is="quest.format.replace('exam', 'student')"
                    :identi="quest"
               >
               </component>

               <component
                    v-if="quest.type === 'Essay'"
                    :key="`${index}-${quest.batch_number}`"
                    :is="quest.format.replace('exam', 'student')"
                    :essay="quest"
               >
               </component>

               <component
                    v-if="quest.type === 'Multiple Choice'"
                    :key="`${index}-${quest.batch_number}`"
                    :is="quest.format.replace('exam', 'student')"
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
