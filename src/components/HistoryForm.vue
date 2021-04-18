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
               <b-button v-b-modal.modal-lg variant="primary"
                    >Student List</b-button
               >
               <b-modal id="modal-lg" size="md" title="Student List">
                    <div>
                         <b-form-group
                              label="Select Student"
                              v-slot="{ ariaDescribedby }"
                         >
                              <b-form-checkbox-group
                                   v-model="selected"
                                   :options="options"
                                   :aria-describedby="ariaDescribedby"
                                   name="flavour-2a"
                                   stacked
                              ></b-form-checkbox-group>
                         </b-form-group>
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
