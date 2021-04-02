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
                                          @input="showSuggest()"
                                    />

                                    <datalist id="subjects">
                                          <option
                                                v-for="subj in autoComplete"
                                                :key="subj.subject_code"
                                                :value="subj.subject_name"
                                          ></option>
                                    </datalist>

                                    Subject code:
                                    <input type="text" />
                              </p>
                              <span>
                                    Subject Course:
                                    <b-form-select
                                          v-model="selected"
                                          :options="options"
                                          class="mb-3 width2"
                                    >
                                          <!-- This slot appears above the options from 'options' prop -->
                                          <!-- These options will appear after the ones from 'options' prop -->
                                          <b-form-select-option value="A"
                                                >BSCpE</b-form-select-option
                                          >
                                          <b-form-select-option value="B"
                                                >BSEE</b-form-select-option
                                          >
                                          <b-form-select-option value="A"
                                                >BSECE</b-form-select-option
                                          >
                                          <b-form-select-option value="B"
                                                >BSIE</b-form-select-option
                                          >
                                          <b-form-select-option value="B"
                                                >BS
                                                Architecture</b-form-select-option
                                          >
                                    </b-form-select>

                                    Subject Desc:
                                    <input type="text" />
                              </span>
                              <p>
                                    Subject Semester:
                                    <b-form-select
                                          v-model="selected"
                                          :options="options"
                                          class="mb-3 width"
                                    >
                                          <!-- This slot appears above the options from 'options' prop -->
                                          <!-- These options will appear after the ones from 'options' prop -->
                                          <b-form-select-option value="A"
                                                >1st
                                          </b-form-select-option>
                                          <b-form-select-option value="B"
                                                >2nd
                                          </b-form-select-option>
                                    </b-form-select>

                                    <span>
                                          Subject Year:
                                          <b-form-select
                                                v-model="selected"
                                                :options="options"
                                                class="mb-3 width1"
                                          >
                                                <!-- This slot appears above the options from 'options' prop -->
                                                <!-- These options will appear after the ones from 'options' prop -->
                                                <b-form-select-option value="A"
                                                      >1st
                                                      Year</b-form-select-option
                                                >
                                                <b-form-select-option value="B"
                                                      >2nd
                                                      Year</b-form-select-option
                                                >
                                                <b-form-select-option value="A"
                                                      >3rd
                                                      Year</b-form-select-option
                                                >
                                                <b-form-select-option value="B"
                                                      >4th
                                                      Year</b-form-select-option
                                                >
                                                <b-form-select-option value="B"
                                                      >5th
                                                      Year</b-form-select-option
                                                >
                                          </b-form-select>
                                    </span>
                                    <button class="addbtn">Add</button>
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
                                    <div class="subjectbox">
                                          <h3>{{ subj.subject_name }}</h3>
                                          <p>{{ subj.subject_code }}</p>
                                          <p>{{ subj.subject_desc }}</p>
                                    </div>
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
