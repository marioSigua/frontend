<template>
     <div>
          <navbar />
          <!--Import Question-->
          <div>
               <div>
                    <b-modal
                         id="historyModal"
                         size="xl"
                         title="Extra Large Modal"
                    >
                         <template #modal-header="">
                              <!-- Emulate built in modal header close button action -->
                              <router-link
                                   target="_blank"
                                   :to="{
                                        name: 'HistoryForm',
                                        params: {
                                             token: objHistory.url,
                                             batch: objHistory.batch_number,
                                             subject_code:
                                                  objHistory.subject_code,
                                        },
                                   }"
                              >
                                   <b-button size="sm" variant="primary">
                                        View Form
                                   </b-button>
                              </router-link>
                              <h5>
                                   {{ sidebarSubj.subject_name }}
                              </h5>
                         </template>
                         <div>
                              <b-table
                                   striped
                                   hover
                                   :items="listResponses"
                                   :fields="fields"
                              >
                                   <template #cell(view)="row">
                                        <router-link
                                             target="_blank"
                                             :to="{
                                                  name: 'ResponseViewing',
                                                  params: {
                                                       token: objHistory.url,

                                                       student_id:
                                                            row.item
                                                                 .student_token,
                                                  },
                                             }"
                                             :disabled="!row.item.score"
                                        >
                                             <b-button
                                                  variant="info"
                                                  :disabled="!row.item.score"
                                                  >Info</b-button
                                             >
                                        </router-link>
                                   </template>

                                   <template #cell(status)="row">
                                        <b-col>{{
                                             row.item.score
                                                  ? 'Submitted'
                                                  : 'Not Taken'
                                        }}</b-col>
                                   </template>
                              </b-table>
                         </div>
                    </b-modal>
               </div>

               <b-button variant="primary" @click="getQuestions"
                    >Import Question</b-button
               >
               <!--Accordian-->
               <b-modal id="modal-xl" size="xl" title="Import Questions">
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
               <b-button @click="getHistory" class="histbtn">History</b-button>

               <b-sidebar id="sidebar-history" title="History" right shadow>
                    <div class="px-3 py-2">
                         <div>
                              <b-form-select
                                   v-model="sidebarSubj"
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
                                        @click="openHistory(quest)"
                                        href="#"
                                        class="flex-column align-items-start"
                                   >
                                        <div
                                             class="d-flex w-100 justify-content-between"
                                        >
                                             <h5 class="mb-1">
                                                  {{ sidebarSubj.subject_name }}
                                             </h5>
                                             <small>{{
                                                  quest.created_at
                                             }}</small>
                                        </div>

                                        <p class="mb-1">
                                             {{ quest.term }}
                                        </p>

                                        <small>Description</small>
                                   </b-list-group-item>
                              </b-list-group>
                         </div>
                    </div>
               </b-sidebar>

               <b-button
                    v-b-modal.modal-xl
                    variant="primary"
                    @click="getQuestions"
                    >Import Question</b-button
               >
          </div>
          <!-- question body -->

          <div
               class=""
               v-for="(essay, index) in listEssay"
               :key="`${index}-${essay.form_number}`"
          >
               <component
                    :is="essay.format"
                    :parent="content"
                    :essayValues="essay"
               >
               </component>
          </div>

          <div
               v-for="(identi, index) in listIdentification"
               :key="`${index}-${identi.form_number}`"
          >
               <component
                    :is="identi.format"
                    :parent="content"
                    :identificationValues="identi"
               >
               </component>
          </div>

          <div
               class=""
               v-for="(mcq, index) in listMCQ"
               :key="`${index}-${mcq.form_number}`"
          >
               <component :is="mcq.format" :parent="content" :mcqValues="mcq">
               </component>
          </div>

          <br />
          <b-button variant="primary" @click="openStudentList">
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
