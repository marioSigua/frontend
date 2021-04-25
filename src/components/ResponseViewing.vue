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
               <input
                    :value="student ? student.firstname : ''"
                    :disabled="student"
               />
               <label for="text">Last Name:</label>
               <input
                    :value="student ? student.lastname : ''"
                    :disabled="student"
               />
          </div>

          <div class="" v-for="(quest, index) in responseList" :key="index">
               <component
                    v-if="quest.type === 'Identification'"
                    :key="`${index}-${quest.batch_number}`"
                    :is="quest.format.replace('exam', 'viewing')"
                    :identi="quest"
               >
               </component>

               <component
                    v-if="quest.type === 'Essay'"
                    :key="`${index}-${quest.batch_number}`"
                    :is="quest.format.replace('exam', 'viewing')"
                    :essay="quest"
               >
               </component>

               <component
                    v-if="quest.type === 'Multiple Choice'"
                    :key="`${index}-${quest.batch_number}`"
                    :is="quest.format.replace('exam', 'viewing')"
                    :mcq="quest"
               >
               </component>
          </div>

          <b-button @click="submitScore" variant="primary">
               Update Score
          </b-button>
     </div>
</template>

<script>
     import app from './scripts/responseviewing'
     export default app
</script>

<style scoped>
     @import './styles/HistoryForm.css';
</style>
