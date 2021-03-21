<template>
      <div>
            <header>
                  <ul>
                        <li class="float">
                              <div>
                                    <img
                                          src="https://i.imgur.com/qO1REGc.png"
                                          width="85"
                                          height="85"
                                    />
                              </div>
                        </li>
                        <li class="float">
                              <h1>Lyceum of Subic Bay</h1>
                              <h4>College of Engineering</h4>
                        </li>
                  </ul>
            </header>

            <div class="grid">
                  <div class="row">
                        <div class="col-sm-6">
                              <!-- students-->
                              <div id="sidePanel">
                                    <h2>Student</h2>
                                    <h2>Student No.</h2>
                                    <div>
                                          <ul
                                                class="dabid"
                                                v-for="(list,
                                                index) in listStudents"
                                                :key="index"
                                          >
                                                <li id="lname">
                                                      <br /><br />{{
                                                            list.firstname +
                                                                  ' ' +
                                                                  list.lastname
                                                      }}
                                                </li>
                                          </ul>
                                    </div>
                              </div>
                        </div>
                        <!--subjects-->
                        <div class="col-sm-6" id="Ssubjects">
                              <div id="box">
                                    <h2 style="color: maroon; float: left;">
                                          Calculator
                                    </h2>
                                    <div id="sContainer">
                                          <select
                                                name="Subject"
                                                id="subjects"
                                                v-model="selectedSubject"
                                                @change="
                                                      getSubjectCode(
                                                            selectedSubject
                                                      )
                                                "
                                          >
                                                <option value=""
                                                      >Select Subject</option
                                                >
                                                <option
                                                      v-for="(category,
                                                      index) in selectSubj"
                                                      :key="index"
                                                      :value="
                                                            category.subject_code
                                                      "
                                                >
                                                      {{
                                                            category.subject_name
                                                      }}
                                                </option>
                                          </select>
                                    </div>

                                    <div class="container" id="termcontainer">
                                          <label for="name">Select Term:</label>
                                          <select v-model="selectedTerm">
                                                <option value=""
                                                      >Select Term</option
                                                >
                                                <option
                                                      v-for="(category,
                                                      index) in selectTerm"
                                                      :key="index"
                                                >
                                                      {{ category.name }}
                                                </option>
                                          </select>
                                    </div>

                                    <div class="container">
                                          <p>
                                                Quiz:
                                                <input v-model="quiz" />
                                                *
                                                <input v-model="mQuiz" />
                                          </p>
                                          <p>
                                                Total:
                                                <input v-model="tQuiz" />
                                          </p>
                                    </div>

                                    <div class="container">
                                          <p>
                                                Exam:
                                                <input v-model="exam" />
                                                *
                                                <input v-model="mExam" />
                                          </p>
                                          <p>
                                                Total:
                                                <input v-model="tExam" />
                                          </p>
                                    </div>

                                    <div class="container">
                                          <p>
                                                Extra:
                                                <input v-model="extra" />
                                                *
                                                <input v-model="mExtra" />
                                          </p>
                                          <p>
                                                Total:
                                                <input v-model="tExtra" />
                                          </p>
                                    </div>

                                    <div style="padding: 10px;">
                                          <p style="font-size: 25sp;">
                                                <b
                                                      ><u style="color: maroon;"
                                                            >Calculated Grade</u
                                                      ></b
                                                >
                                          </p>
                                          <p>
                                                TOTAL GRADE:
                                                <input
                                                      :value="calculateGrade"
                                                />
                                          </p>
                                          <p>
                                                REMARKS:
                                                <input
                                                      type="text"
                                                      id="remark"
                                                      value=""
                                                />
                                          </p>
                                    </div>

                                    <div>
                                          <button type="button" class="btn">
                                                Save
                                          </button>
                                          <button type="button" class="btn">
                                                Edit
                                          </button>
                                    </div>
                              </div>
                        </div>
                  </div>
            </div>
      </div>
</template>

<script>
      import app from './scripts/main'
      export default app
</script>

<style scoped>
      @import './styles/master.css';
</style>
