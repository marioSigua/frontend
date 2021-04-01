<template>
      <div>
            <navbar />
            <!--List of student dropdown-->

            <div class="accordion" role="tablist">
                  <!-- <b-card
                        no-body
                        class="mb-1"
                        v-for="(subj, index) in subjectList"
                        :key="index"
                  >
                        <b-card-header
                              header-tag="header"
                              class="p-1"
                              role="tab"
                        >
                              <b-button
                                    block
                                    v-b-toggle.accordion-1
                                    variant="info"
                                    >{{ subj.subject_name }}</b-button
                              >
                        </b-card-header>
                        <b-collapse
                              id="accordion-1"
                              visible
                              accordion="my-accordion"
                              role="tabpanel"
                        >
                              <b-card-body>
                                    <b-card-text>Yawa</b-card-text>
                              </b-card-body>
                        </b-collapse>
                  </b-card> -->

                  <b-card
                        no-body
                        class="mb-1"
                        v-for="subj in subjectList"
                        :key="subj.subject_code"
                  >
                        <b-card-header
                              header-tag="header"
                              class="p-1"
                              role="tab"
                        >
                              <b-button
                                    block
                                    v-b-toggle.accordion-2
                                    variant="info"
                                    >{{ subj.subject_name }}</b-button
                              >
                        </b-card-header>

                        <b-collapse
                              id="accordion-2"
                              accordion="my-accordion"
                              role="tabpanel"
                        >
                              <b-card-body>
                                    <b-card-text>
                                          <div class="studentlist">
                                                <h2>Student List</h2>
                                                <div class="Studentlist">
                                                      <b-table
                                                            :items="
                                                                  subj.students
                                                            "
                                                            :fields="fields"
                                                            striped
                                                            hover
                                                            responsive="sm"
                                                      >
                                                            <template
                                                                  #cell(show_details)="row"
                                                            >
                                                                  <b-button
                                                                        size="sm"
                                                                        @click="
                                                                              row.toggleDetails
                                                                        "
                                                                        class="mr-2 mr2btn"
                                                                  >
                                                                        {{
                                                                              row.detailsShowing
                                                                                    ? 'Hide'
                                                                                    : 'Show'
                                                                        }}
                                                                        Details
                                                                  </b-button>
                                                            </template>

                                                            <template
                                                                  #row-details="row"
                                                            >
                                                                  <b-card>
                                                                        <b-row
                                                                              class="mb-2"
                                                                        >
                                                                              <b-col
                                                                                    sm="3"
                                                                                    class="text-sm-right"
                                                                                    ><b
                                                                                          >Prelim:</b
                                                                                    ></b-col
                                                                              >
                                                                              <b-col
                                                                                    >{{
                                                                                          row
                                                                                                .item
                                                                                                .prelim_grade
                                                                                    }}</b-col
                                                                              >
                                                                        </b-row>

                                                                        <b-row
                                                                              class="mb-2"
                                                                        >
                                                                              <b-col
                                                                                    sm="3"
                                                                                    class="text-sm-right"
                                                                                    ><b
                                                                                          >Midterm:</b
                                                                                    ></b-col
                                                                              >
                                                                              <b-col
                                                                                    >{{
                                                                                          row
                                                                                                .item
                                                                                                .midterm_grade
                                                                                    }}</b-col
                                                                              >
                                                                        </b-row>

                                                                        <b-row
                                                                              class="mb-2"
                                                                        >
                                                                              <b-col
                                                                                    sm="3"
                                                                                    class="text-sm-right"
                                                                                    ><b
                                                                                          >Finals:</b
                                                                                    ></b-col
                                                                              >
                                                                              <b-col
                                                                                    >{{
                                                                                          row
                                                                                                .item
                                                                                                .finals_grade
                                                                                    }}</b-col
                                                                              >
                                                                        </b-row>

                                                                        <b-row
                                                                              class="mb-2"
                                                                        >
                                                                              <b-col
                                                                                    sm="3"
                                                                                    class="text-sm-right"
                                                                                    ><b
                                                                                          >GWA:</b
                                                                                    ></b-col
                                                                              >
                                                                              <b-col
                                                                                    >{{
                                                                                          row
                                                                                                .item
                                                                                                .age
                                                                                    }}</b-col
                                                                              >
                                                                        </b-row>
                                                                  </b-card>
                                                            </template>
                                                      </b-table>
                                                      <!-- <b-table
                                                            striped
                                                            hover
                                                            :items="
                                                                  subj.students
                                                            "
                                                            :fields="fields"
                                                      >
                                                      </b-table> -->
                                                </div>
                                          </div>
                                    </b-card-text>
                              </b-card-body>
                        </b-collapse>
                  </b-card>

                  <!-- <b-card no-body class="mb-1">
                        <b-card-header
                              header-tag="header"
                              class="p-1"
                              role="tab"
                        >
                              <b-button
                                    block
                                    v-b-toggle.accordion-3
                                    variant="info"
                                    >Subject 3</b-button
                              >
                        </b-card-header>
                        <b-collapse
                              id="accordion-3"
                              accordion="my-accordion"
                              role="tabpanel"
                        >
                              <b-card-body>
                                    <b-card-text>Yawa</b-card-text>
                              </b-card-body>
                        </b-collapse>
                  </b-card> -->
            </div>
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
