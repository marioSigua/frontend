<template>
     <div>
          <navbar />
          <!--List of student dropdown-->

          <div class="accordion" role="tablist">
               <b-card
                    no-body
                    class="mb-1"
                    v-for="subj in subjectList"
                    :key="subj.subject_code"
               >
                    <b-card-header header-tag="header" class="p-1" role="tab">
                         <b-button
                              block
                              variant="info"
                              v-b-toggle="'accordion' + subj.subject_code"
                              @click="getSubjectCode(subj)"
                              >{{ subj.subject_name }}</b-button
                         >
                    </b-card-header>

                    <b-collapse
                         :visible="loadAccordion(subj)"
                         :id="'accordion' + subj.subject_code"
                         accordion="my-accordion"
                         role="tabpanel"
                    >
                         <b-card-body>
                              <b-card-text>
                                   <div class="studentlist">
                                        <span>
                                             <div>
                                                  <!--Button-->
                                                  <div class="bottons">
                                                       <b-button
                                                            v-b-modal.modal-prevent-closing
                                                            class="botton"
                                                       >
                                                            <svg
                                                                 xmlns="http://www.w3.org/2000/svg"
                                                                 width="22"
                                                                 height="22"
                                                                 fill="currentColor"
                                                                 class="bi bi-person-plus-fill"
                                                                 viewBox="0 0 16 16"
                                                            >
                                                                 <path
                                                                      d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
                                                                 />
                                                                 <path
                                                                      fill-rule="evenodd"
                                                                      d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"
                                                                 />
                                                            </svg>
                                                       </b-button>
                                                  </div>
                                                  <!--Button-->
                                             </div>
                                        </span>
                                        <h2>Student List</h2>

                                        <div class="Studentlist">
                                             <b-table
                                                  :items="
                                                       subj.students.filter(
                                                            (v) =>
                                                                 v.isDropped ===
                                                                 0
                                                       )
                                                  "
                                                  :fields="fields"
                                                  striped
                                                  hover
                                                  responsive="sm"
                                             >
                                                  <template #cell(GWA)="row">
                                                       <b-row class="mb-2">
                                                            <b-col
                                                                 v-if="
                                                                      row.item
                                                                           .finals_grade ===
                                                                           null
                                                                 "
                                                            >
                                                                 {{ null }}
                                                            </b-col>
                                                            <b-col v-else>{{
                                                                 (
                                                                      row.item
                                                                           .prelim_grade *
                                                                           0.3 +
                                                                      row.item
                                                                           .midterm_grade *
                                                                           0.3 +
                                                                      row.item
                                                                           .finals_grade *
                                                                           0.4
                                                                 ).toFixed(2)
                                                            }}</b-col>
                                                       </b-row>
                                                  </template>

                                                  <template
                                                       #cell(Remarks)="grade"
                                                  >
                                                       <b-row class="mb-2">
                                                            <b-col
                                                                 v-if="
                                                                      (
                                                                           grade
                                                                                .item
                                                                                .prelim_grade *
                                                                                0.3 +
                                                                           grade
                                                                                .item
                                                                                .midterm_grade *
                                                                                0.3 +
                                                                           grade
                                                                                .item
                                                                                .finals_grade *
                                                                                0.4
                                                                      ).toFixed(
                                                                           2
                                                                      ) >= 75
                                                                 "
                                                            >
                                                                 passed
                                                            </b-col>
                                                            <b-col v-else>
                                                            </b-col>

                                                            <b-col> </b-col>
                                                       </b-row>
                                                  </template>

                                                  <template
                                                       #cell(drop_students)="student"
                                                  >
                                                       <button
                                                            @click="
                                                                 dropStudent(
                                                                      student.item
                                                                 )
                                                            "
                                                            style="color: rgb(7, 7, 7);"
                                                       >
                                                            <svg
                                                                 xmlns="http://www.w3.org/2000/svg"
                                                                 width="16"
                                                                 height="16"
                                                                 fill="currentColor"
                                                                 class="bi bi-trash-fill"
                                                                 viewBox="0 0 16 16"
                                                            >
                                                                 <path
                                                                      d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"
                                                                 />
                                                            </svg>
                                                       </button>
                                                  </template>
                                             </b-table>
                                        </div>
                                   </div>
                              </b-card-text>
                         </b-card-body>
                    </b-collapse>
               </b-card>
          </div>

          <b-modal
               id="modal-prevent-closing"
               ref="modal"
               title="Submit Your Name"
               @show="resetModal"
               @hidden="resetModal"
               @ok="handleOk"
          >
               <form ref="form" @submit.stop.prevent="handleSubmit">
                    <!------------------------->

                    <b-form-group
                         label="Student ID"
                         label-for="name-input"
                         invalid-feedback="Name is required"
                    >
                         <b-form-input
                              id="SID-input"
                              v-model="payload.student_id"
                              required
                         ></b-form-input>
                    </b-form-group>
                    <!------------------------->

                    <!------------------------->

                    <b-form-group
                         label="Student Email"
                         label-for="name-input"
                         invalid-feedback="Name is required"
                    >
                         <b-form-input
                              type="email"
                              id="SID-input"
                              v-model="payload.student_email"
                              required
                         ></b-form-input>
                    </b-form-group>
                    <!------------------------->

                    <b-form-group
                         label="Last Name"
                         label-for="name-input"
                         invalid-feedback="Last Name is required"
                    >
                         <b-form-input
                              id="Lastname-input"
                              v-model="payload.lastname"
                              required
                         ></b-form-input>
                    </b-form-group>
                    <!------------------------->
                    <b-form-group
                         label="First Name"
                         label-for="name-input"
                         invalid-feedback="First Name is required"
                    >
                         <b-form-input
                              id="Firstname-input"
                              v-model="payload.firstname"
                              required
                         ></b-form-input>
                    </b-form-group>
                    <!------------------------->
                    <b-form-group
                         label="Course"
                         label-for="name-input"
                         invalid-feedback="Course is required"
                    >
                         <b-form-select
                              class="mb-3 width2"
                              v-model="payload.student_course"
                         >
                              <b-form-select-option value=""
                                   >Select Course</b-form-select-option
                              >
                              <!-- This slot appears above the options from 'options' prop -->
                              <!-- These options will appear after the ones from 'options' prop -->
                              <b-form-select-option
                                   v-for="(subj, index) in engrCourse"
                                   :key="index"
                                   :value="subj"
                                   >{{ subj }}</b-form-select-option
                              >
                         </b-form-select>
                    </b-form-group>
                    <!------------------------->
               </form>
          </b-modal>

          <!--List of student dropdown-->
     </div>
</template>

<script>
     import app from './scripts/Studentlist'
     export default app
</script>

<style scoped>
     @import './styles/Studentlist.css';
</style>
