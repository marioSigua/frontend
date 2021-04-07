<template>
  <div>
    <navbar />
    <!--List of student dropdown-->

    <div class="accordion" role="tablist">
      <b-card
        no-body
        class="mb-1"
        v-for="(subj, index) in subjectList"
        :key="subj.subject_code"
      >
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button block variant="info" v-b-toggle="'accordion' + index">{{
            subj.subject_name
          }}</b-button>
        </b-card-header>

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
                                    variant="info"
                                    v-b-toggle="'accordion' + subj.subject_code"
                                    >{{ subj.subject_name }}</b-button
                              >
                        </b-card-header>

                        <b-collapse
                              :visible="
                                    $store.state.openAccordion ===
                                          subj.subject_code
                              "
                              :id="'accordion' + subj.subject_code"
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
                                                                        class="mr-2 mr2btn"
                                                                        @click="
                                                                              row.toggleDetails
                                                                        "
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

                    <template #row-details="row">
                      <b-card>
                        <b-row class="mb-2">
                          <b-col sm="3" class="text-sm-right"
                            ><b>Prelim:</b></b-col
                          >
                          <b-col>{{ row.item.prelim_grade }}</b-col>
                        </b-row>

                        <b-row class="mb-2">
                          <b-col sm="3" class="text-sm-right"
                            ><b>Midterm:</b></b-col
                          >
                          <b-col>{{ row.item.midterm_grade }}</b-col>
                        </b-row>

                        <b-row
                          class="mb-2"
                          style="  border-bottom: 1px white solid;"
                        >
                          <b-col sm="3" class="text-sm-right"
                            ><b>Finals:</b></b-col
                          >
                          <b-col>{{ row.item.finals_grade }}</b-col>
                        </b-row>

                        <b-row class="mb-2">
                          <b-col sm="3" class="text-sm-right"
                            ><b>GWA:</b></b-col
                          >
                          <b-col>{{
                            (
                              row.item.prelim_grade * 0.3 +
                              row.item.midterm_grade * 0.3 +
                              row.item.finals_grade * 0.4
                            ).toFixed(2)
                          }}</b-col>
                        </b-row>
                      </b-card>
                    </template>
                  </b-table>
                </div>
              </div>
            </b-card-text>
          </b-card-body>
        </b-collapse>
      </b-card>
    </div>
    <!--List of student dropdown-->
  </div>
</template>

<script>
import app from "./scripts/Studentlist";
export default app;
</script>

<style scoped>
@import "./styles/Studentlist.css";
</style>
