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

          <div class="" v-for="(quest, index) in questionList" :key="index">
               <component
                    v-if="quest.type === 'Identification'"
                    :key="`${index}-${quest.batch_number}`"
                    :is="quest.format.replace('exam', 'student')"
                    :identi="quest"
                    :isDisabled="checkRoute"
               >
               </component>

               <component
                    v-if="quest.type === 'Essay'"
                    :key="`${index}-${quest.batch_number}`"
                    :is="quest.format.replace('exam', 'student')"
                    :essay="quest"
                    :isDisabled="checkRoute"
               >
               </component>

               <component
                    v-if="quest.type === 'Multiple Choice'"
                    :key="`${index}-${quest.batch_number}`"
                    :is="quest.format.replace('exam', 'student')"
                    :mcq="quest"
                    :isDisabled="checkRoute"
               >
               </component>
          </div>

          <!--Student Lisst 2-->
          <div>
               <b-button @click="openStudentList" variant="primary"
                    >Student List</b-button
               >
               <b-modal
                    @show="resetModal"
                    @hidden="resetModal"
                    @ok="sendForm"
                    id="modal-lg"
                    title="Student List"
               >
                    <div>
                         <b-form-group
                              @submit.stop.prevent="sendForm"
                              label="Select Student"
                              v-slot="{ ariaDescribedby }"
                         >
                              <b-form-checkbox-group
                                   v-model="stdEmail"
                                   :aria-describedby="ariaDescribedby"
                                   name="flavour-2a"
                                   stacked
                              >
                                   <b-form-checkbox
                                        v-for="student in listStudents"
                                        :key="student.student_id"
                                        :value="student.student_email"
                                        >{{
                                             student.student_id +
                                                  ' ' +
                                                  student.firstname
                                        }}</b-form-checkbox
                                   ></b-form-checkbox-group
                              >
                         </b-form-group>

                         {{ stdEmail }}
                    </div>
               </b-modal>
          </div>
     </div>
</template>

<script>
     import app from './scripts/historyform'
     export default app
</script>

<style scoped>
     @import './styles/HistoryForm.css';
</style>
