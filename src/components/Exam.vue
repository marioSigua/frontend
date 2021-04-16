<template>
     <div>
          <navbar />
          <!--Import Question-->
          <div>
               <b-button variant="primary" @click="getQuestions"
                    >Import Question</b-button
               >
               <!--Accordian-->
               <b-modal
                    @show="resetModal"
                    @hidden="resetModal"
                    id="modal-xl"
                    size="xl"
                    title="Extra Large Modal"
               >
                    <div
                         class="accordion"
                         role="tablist"
                         v-for="(subj, index) in selectSubj"
                         :key="index"
                    >
                         <b-card no-body class="mb-1">
                              <b-card-header
                                   header-tag="header"
                                   class="p-1"
                                   role="tab"
                              >
                                   <b-button
                                        block
                                        v-b-toggle="'accordion' + index"
                                        variant="info"
                                        class="clsbtn"
                                        @click="
                                             getSubjectCode(subj.subject_code)
                                        "
                                   >
                                        {{ subj ? subj.subject_name : '' }}
                                   </b-button>
                              </b-card-header>

                              <b-collapse
                                   :id="'accordion' + index"
                                   accordion="my-accordion"
                                   role="tabpanel"
                              >
                                   <b-card-body>
                                        <!--List of topic-->
                                        <div class="ctn">
                                             <b-form-select
                                                  v-model="modalTopics"
                                                  size="sm"
                                                  class="mt-3"
                                                  @change="
                                                       getTopicValue(
                                                            modalTopics
                                                       )
                                                  "
                                             >
                                                  <option value=""
                                                       >Select Topic</option
                                                  >
                                                  <option
                                                       v-for="(v,
                                                       index) in topics"
                                                       :key="v + index"
                                                       :value="v"
                                                       >{{ v.topic }}</option
                                                  >
                                             </b-form-select>
                                        </div>
                                        <b-card-body
                                             class="grid"
                                             v-for="(btn, index) in btnNames"
                                             :key="index"
                                             v-b-toggle="[btn + index]"
                                        >
                                             <b-button class="btnss col">{{
                                                  btn
                                             }}</b-button>

                                             <!-- Elements to collapse -->
                                             <b-collapse
                                                  :visible="
                                                       topicValue.type === btn
                                                  "
                                                  class="mt-2 btnss col"
                                             >
                                                  <b-card
                                                       v-if="
                                                            Object.values(
                                                                 topicValue
                                                            ).length > 0
                                                       "
                                                       @click="
                                                            getTopics(
                                                                 topicValue
                                                            )
                                                       "
                                                  >
                                                       <component
                                                            class="highlight-card"
                                                            v-if="
                                                                 topicValue.type ===
                                                                      'Identification'
                                                            "
                                                            :is="
                                                                 topicValue.format
                                                            "
                                                            :identificationValues="
                                                                 topicValue
                                                            "
                                                       >
                                                       </component>

                                                       <component
                                                            v-if="
                                                                 topicValue.type ===
                                                                      'Multiple Choice'
                                                            "
                                                            :is="
                                                                 topicValue.format
                                                            "
                                                            :mcqValues="
                                                                 topicValue
                                                            "
                                                       >
                                                       </component>
                                                  </b-card>
                                             </b-collapse>
                                        </b-card-body>
                                   </b-card-body>
                              </b-collapse>
                         </b-card>
                    </div>
                    <!--Accordian-->
               </b-modal>
          </div>
          <!--Import Question-->
          <div>
               <!--Type-->
               <b-form-select
                    v-model="choiceFilter"
                    size="sm"
                    class="mt-3"
                    @change="letsGo"
               >
                    <!-- <select v-model="choiceFilter" @change="letsGo"> -->
                    <option value="">Select a Format</option>
                    <option>Essay</option>
                    <option>Identification</option>
                    <option>Multiple Choice</option>
                    <!-- </select> -->
               </b-form-select>

               <!--Term-->
               <b-form-select v-model="choiceTerm" size="sm" class="mt-3">
                    <option value="">Select Term</option>
                    <option>Preliminary</option>
                    <option>Midterm</option>
                    <option>Final</option>
               </b-form-select>

               <!--Subject-->
               <b-form-select v-model="choiceSubj" size="sm" class="mt-3">
                    <option value="">Select Subject</option>
                    <option
                         v-for="(subj, index) in selectSubj"
                         :key="index"
                         :value="subj.subject_code"
                    >
                         {{ subj.subject_name }}
                    </option>
               </b-form-select>

               <!--sidebar-->
               <b-button @click="getHistory">History</b-button>

               <b-sidebar id="sidebar-history" title="History" right shadow>
                    <div class="px-3 py-2">
                         <div>
                              <b-form-select
                                   v-model="choiceSubj"
                                   size="sm"
                                   class="mt-3"
                              >
                                   <option value="">Select Subject</option>
                                   <option
                                        v-for="(subj, index) in selectSubj"
                                        :key="index"
                                        :value="subj"
                                   >
                                        {{ subj.subject_name }}
                                   </option>
                              </b-form-select>

                              <b-list-group>
                                   <b-list-group-item
                                        v-for="(quest,
                                        index) in questionsHistory"
                                        :key="index"
                                        href="#"
                                        class="flex-column align-items-start"
                                   >
                                        <router-link
                                             :to="
                                                  '/student/question/form/' +
                                                       quest.url
                                             "
                                        >
                                             <div
                                                  class="d-flex w-100 justify-content-between"
                                             >
                                                  <h5 class="mb-1">
                                                       {{
                                                            choiceSubj.subject_name
                                                       }}
                                                  </h5>
                                                  <small>{{
                                                       quest.created_at
                                                  }}</small>
                                             </div>

                                             <p class="mb-1">
                                                  {{ quest.term }}
                                             </p>

                                             <small>Description</small>
                                        </router-link>
                                   </b-list-group-item>
                              </b-list-group>
                         </div>
                    </div>
               </b-sidebar>

               <b-button v-b-modal.modal-xl variant="primary"
                    >Import Question</b-button
               >
          </div>
          <!-- question body -->

          <div
               class=""
               v-for="(essay, index) in listEssay"
               :key="`${index}-${essay.form_number}`"
          >
               <component :is="essay.format" :essayValues="essay"> </component>
          </div>

          <div
               v-for="(identi, index) in listIdentification"
               :key="`${index}-${identi.form_number}`"
          >
               <component :is="identi.format" :identificationValues="identi">
               </component>
          </div>

          <div
               class=""
               v-for="(mcq, index) in listMCQ"
               :key="`${index}-${mcq.form_number}`"
          >
               <component :is="mcq.format" :mcqValues="mcq"> </component>
          </div>

          <br />
          <b-button variant="primary" @click="openStudentList">
               <!-- <button @click="createForm()" v-b-modal.modal-tall style="margin-left: 10px"> -->
               Create Form
          </b-button>

          <div>
               <b-modal
                    @show="resetModal"
                    @hidden="resetModal"
                    @ok="createForm"
                    id="modal-tall"
                    title="Student List"
               >
                    <div>
                         <b-form-group
                              @submit.stop.prevent="createForm"
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
     import app from './scripts/exam'
     export default app
</script>

<style scoped>
     @import './styles/Exam.css';
</style>

<!-- <script>
  export default {
  data() {
    return {
      selected: null,
      options: [
        { value: null, text: 'Please select an option' },
        { value: 'a', text: 'This is First option' },
        { value: 'b', text: 'Selected Option' },
        { value: { C: '3PO' }, text: 'This is an option with object value' },
        { value: 'd', text: 'This one is disabled', disabled: true }
      ]
    }
  }
}
</script> -->

<!-- <script>
      export default {
        data() {
          return {
            selected: [], // Must be an array reference!
            options: [
              { text: 'Argarin David', value: 'orange' },
              { text: 'Sigua Mario', value: 'apple' },
              { text: 'Gorospe Vincent', value: 'pineapple' },
              { text: 'Calil San', value: 'grape' }
            ]
          }
        }
      }
    </script> -->
