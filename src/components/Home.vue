<template>
      <div>
            <navbar />

            <!--button for adding subject-->
            <div class="margin">
                  <!-- Using modifiers -->
                  <!-- <b-button v-b-toggle.collapse-2 class="m-1">Toggle Collapse</b-button>
         -->
                  <!-- Using value -->
                  <b-button v-b-toggle="'collapse-2'" class="m-1"
                        >+ Add subject</b-button
                  >

                  <!-- Element to collapse -->
                  <b-collapse id="collapse-2" class="colp">
                        <b-card>
                              <p>
                                    Subject name:
                                    <input
                                          type="text"
                                          list="subjects"
                                          v-model="searchList"
                                    />

                                    <datalist id="subjects">
                                          <option
                                                v-for="subj in autoComplete"
                                                :key="subj.subject_code"
                                                >{{ subj.subject_name }}</option
                                          >
                                    </datalist>

                                    Subject code:
                                    <input
                                          v-if="!foundData"
                                          v-model="payload.subject_code"
                                          type="text"
                                    />
                                    <input
                                          v-else
                                          :value="
                                                foundData
                                                      ? foundData.subject_code
                                                      : ''
                                          "
                                          type="text"
                                    />
                              </p>
                              <span>
                                    Subject Course:
                                    <b-form-select
                                          class="mb-3 width2"
                                          v-model="payload.subject_course"
                                    >
                                          <b-form-select-option value="">{{
                                                foundData
                                                      ? foundData.subject_course
                                                      : 'Select Course'
                                          }}</b-form-select-option>
                                          <!-- This slot appears above the options from 'options' prop -->
                                          <!-- These options will appear after the ones from 'options' prop -->
                                          <b-form-select-option
                                                v-for="(subj,
                                                index) in options.course"
                                                :key="index"
                                                :value="subj"
                                                >{{
                                                      subj
                                                }}</b-form-select-option
                                          >
                                    </b-form-select>
                                    {{ payload.subject_course }}

                                    Subject Desc:

                                    <input
                                          v-if="!foundData"
                                          v-model="payload.subject_desc"
                                          type="text"
                                    />

                                    <input
                                          v-else
                                          :value="
                                                foundData
                                                      ? foundData.subject_desc
                                                      : ''
                                          "
                                          type="text"
                                    />
                              </span>
                              <p>
                                    Subject Semester:
                                    <b-form-select
                                          v-model="payload.subject_sem"
                                          class="mb-3 width"
                                    >
                                          <b-form-select-option value="">{{
                                                foundData
                                                      ? foundData.subject_sem
                                                      : 'Select Sem'
                                          }}</b-form-select-option>
                                          <!-- This slot appears above the options from 'options' prop -->
                                          <!-- These options will appear after the ones from 'options' prop -->
                                          <b-form-select-option
                                                v-for="(sem,
                                                index) in options.semester"
                                                :key="index"
                                                :value="sem"
                                          >
                                                {{ sem }}
                                          </b-form-select-option>
                                    </b-form-select>

                                    <span>
                                          Subject Year:
                                          <b-form-select
                                                v-model="payload.subject_year"
                                                class="mb-3 width1"
                                          >
                                                <b-form-select-option
                                                      value=""
                                                      >{{
                                                            foundData
                                                                  ? foundData.subject_year
                                                                  : 'Select Year'
                                                      }}</b-form-select-option
                                                >
                                                <!-- This slot appears above the options from 'options' prop -->
                                                <!-- These options will appear after the ones from 'options' prop -->
                                                <b-form-select-option
                                                      v-for="(year,
                                                      index) in options.year"
                                                      :key="index"
                                                      :value="
                                                            foundData
                                                                  ? foundData.subject_year
                                                                  : year
                                                      "
                                                >
                                                      {{ year }}
                                                </b-form-select-option>
                                          </b-form-select>
                                    </span>
                                    <button
                                          class="addbtn"
                                          @click="sendDispatch()"
                                    >
                                          Add
                                    </button>
                              </p>
                        </b-card>
                  </b-collapse>
            </div>
            <!--list of subject-->
            <div class="subject">
                  <div class="container">
                        <div class="row row-cols-3">
                              <div
                                    class="col"
                                    v-for="subj in listSubjs"
                                    :key="subj.subject_code"
                              >
                                    <router-link
                                          to="/auth/professor/studentlist"
                                    >
                                          <div
                                                class="subjectbox"
                                                @click="
                                                      sendToStudentList(
                                                            subj.subject_code
                                                      )
                                                "
                                          >
                                                <h3>{{ subj.subject_name }}</h3>
                                                <p>{{ subj.subject_code }}</p>
                                                <p>{{ subj.subject_desc }}</p>
                                          </div>
                                    </router-link>
                              </div>

                              <!-- <div class="col">
            <div class="subjectbox">
              <h3>Subject name</h3>
              <p>Subject Code</p>
              <p>Schedule</p>
            </div>
          </div>

          <div class="col">
            <div class="subjectbox">
              <h3>Subject name</h3>
              <p>Subject Code</p>
              <p>Schedule</p>
            </div>
          </div> -->
                        </div>
                  </div>
            </div>
      </div>
</template>

<script>
      import app from './scripts/HOME'
      export default app
</script>

<style scoped>
      @import './styles/Home.css';
</style>
