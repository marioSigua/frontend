<template>
  <div>
    <navbar />

    <!-- <header>
      <ul>
        <li class="float">
          <div>
            <img src="https://i.imgur.com/qO1REGc.png" width="85" height="85" />
          </div>
        </li>
        <li class="float">
          <h1>Lyceum of Subic Bay</h1>
          <h4>College of Engineering</h4>
        </li>
      </ul>
    </header> -->

    <div class="grid">
      <div class="row">
        <div class="col-sm-6">
          <div id="sidePanel">
            <div class="container">
              <div class="row row-cols-1">
                <div class="col">
                  <h4 style="color: #503918; float: left;">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="28"
                      height="28"
                      fill="currentColor"
                      class="bi bi-people-fill icon"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"
                      />
                      <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
                    </svg>
                    Student
                  </h4>
                </div>
                <div class="col">
                  <div>
                    <ul
                      class="dabid"
                      v-for="(list, index) in listStudents"
                      :key="index"
                    >
                      <li
                        @click="getStudentInfo(list)"
                        :class="{
                          'select-students': currentIndex === index,
                        }"
                      >
                        <br />{{ list.firstname + " " + list.lastname }}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <!-- <h2>Student</h2>
          
            <div>
              <ul
                class="dabid"
                v-for="(list, index) in listStudents"
                :key="index"
              >
                <li id="lname" @click="getStudentInfo(list)">
                  <br />{{ list.firstname + " " + list.lastname }}
                </li>
              </ul>
            </div> -->
          </div>
        </div>

        <!--subjects-->
        <div class="col-sm-6" id="Ssubjects">
          <div id="box">
            <h4 style="color: #503918; float: left;">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="currentColor"
                class="bi bi-calculator-fill"
                viewBox="0 0 16 16"
              >
                <path
                  d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm2 .5v2a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 0-.5-.5h-7a.5.5 0 0 0-.5.5zm0 4v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5zM4.5 9a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zM4 12.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5zM7.5 6a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zM7 9.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5zm.5 2.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zM10 6.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5zm.5 2.5a.5.5 0 0 0-.5.5v4a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 0-.5-.5h-1z"
                />
              </svg>
              Calculator
            </h4>
            <div id="sContainer">
              <select
                name="Subject"
                id="subjects"
                v-model="selectedSubject"
                @change="getSubjectCode(selectedSubject)"
              >
                <option value="">Select Subject</option>
                <option
                  v-for="(category, index) in selectSubj"
                  :key="index"
                  :value="category.subject_code"
                >
                  {{ category.subject_name }}
                </option>
              </select>
            </div>

            <div class="container" id="termcontainer">
              <label for="name">Select Term:</label>
              <select v-model="selectedTerm" @change="getGrades">
                <option value="">Select Term</option>
                <option v-for="(category, index) in selectTerm" :key="index">
                  {{ category.name }}
                </option>
              </select>
            </div>

            <div class="container">
              <p>
                Quiz:
                <input v-model="criterias.quiz" title="Quiz Score" />
                *
                <input v-model="criterias.mQuiz" title="Multiplier" />
              </p>
              <p>
                Total:
                <input v-model="criterias.tQuiz" title="Total Quiz Score" />
              </p>
            </div>

            <div class="container">
              <p>
                Exam:
                <input v-model="criterias.exam" title="Exam Score" />
                *
                <input v-model="criterias.mExam" title="Multiplier" />
              </p>
              <p>
                Total:
                <input v-model="criterias.tExam" title="Total Exam Score" />
              </p>
            </div>

            <div class="container">
              <p>
                Extra:
                <input v-model="criterias.extra" />
                *
                <input v-model="criterias.mExtra" />
              </p>
              <p>
                Total:
                <input v-model="criterias.tExtra" />
              </p>
            </div>

            <div style="padding: 10px;">
              <p style="font-size: 25sp;">
                <b><u style="color: #685f52;">Calculated Grade</u></b>
              </p>
              <p v-if="$store.state.calculator.listGrades">
                TOTAL GRADE:
                <input :value="$store.state.calculator.listGrades" />
              </p>

              <p v-else>
                TOTAL GRADE:
                <input :value="calculateGrade" />
              </p>
              <p>
                REMARKS:
                <input type="text" id="remark" value="" />
              </p>
            </div>
            <div>
              <!-- <button  type="button" class="btn" @click="updateGrade">
                Save
              </button>
              <button type="button" class="btn" style="margin: 10px;">
                Edit
              </button> -->
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Save Calculated Grades"
              >
                SAVE
              </button>
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Edit Grades"
                style="margin: 10px;"
              >
                EDIT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import app from "./scripts/main";
export default app;
</script>

<style scoped>
@import "./styles/master.css";
</style>
