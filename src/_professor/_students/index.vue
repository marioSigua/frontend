<template lang="html">
  <div class="backdrop">
    <div
      class="subjects"
      v-for="(subject, s) in subjectList"
      :key="s"
      @click="getSubjectCode(subject)"
    >
      {{
        subject.subject_name + ` Section ${subject.subject_code.split("-")[1]}`
      }}
    </div>

    <div :hide="hide" id="collapse">
      <button class="addBtn" type="button" name="button" v-on:click="showModal">
        Add Student
      </button>

      <button class="addBtn">
        Export Table
      </button>

      <modal ref="importer">
        <template v-slot:header>
          <tabs class="tabs">
            <tab class="tab" title="Add Existing Student">
              Search:
              <input type="text" v-model="searchQuery" />

              <div>
                <ul>
                  <li v-for="(student, s) in searchListModal" :key="s">
                    <input
                      type="checkbox"
                      @change="getStudentInfo($event, student)"
                      :value="student"
                    />
                    {{ student.firstname + " " + student.lastname }}
                  </li>
                </ul>

                <button @click="addOldStudents">
                  Submit
                </button>
              </div>
            </tab>
            <tab class="tab" title="Add New Student">
              <ul>
                <label for="SID">Student ID</label>
                <li>
                  <input v-model="student.student_id" type="text" />
                </li>
                <label for="fname">First Name</label>
                <li>
                  <input v-model="student.firstname" type="text" />
                </li>
                <label for="lname">Last Name</label>
                <li>
                  <input v-model="student.lastname" type="text" />
                </li>
                <label for="email">Student Email</label>
                <li>
                  <input v-model="student.student_email" type="text" />
                </li>
                <label for="course">Course</label>
                <li>
                  <select v-model="student.student_course">
                    <option value="">-- Select Course --</option>
                    <option
                      v-for="(subj, index) in engrCourse"
                      :key="index"
                      :value="subj"
                      >{{ subj }}</option
                    >
                  </select>
                </li>
                <li>{{ error }}</li>

                <li>
                  <button @click="addStudents">
                    Submit
                  </button>
                </li>
              </ul>
            </tab>
          </tabs>
        </template>

        <!-- di ko makita tinatago siya -->
        <!-- <template v-slot:footer>
                         <button @click="addStudents">
                              Submit
                         </button>
                    </template> -->
      </modal>
    </div>
    <div :hide="hide" id="collapse">
      <table>
        <tr>
          <th>Student ID</th>
          <th>Last Name</th>
          <th>First Name</th>
          <th>Course</th>
          <th>Prelim</th>
          <th>Midterm</th>
          <th>Tentative Final Grade</th>
          <th>Final Grade</th>
          <th>Remarks</th>
          <th>Drop</th>
        </tr>
        <tr v-for="(student, s) in studentList" :key="s">
          <td>{{ student.student_id }}</td>
          <td>{{ student.lastname }}</td>
          <td>{{ student.firstname }}</td>
          <td>{{ student.student_course }}</td>
          <td>{{ student.prelim_grade }}</td>
          <td>{{ student.midterm_grade }}</td>
          <td>{{ student.finals_grade }}</td>
          <td>{{ student.gwa }}</td>
          <td>{{ student.remarks }}</td>
          <!-- Ganto sana katabi ng remarks yung lalabas na gpe -->
          <!-- gpe nasa watch at data -->
          <!-- <td>{{ student.remarks + " " + gpe }}</td> -->
          <td>
            <button @click="dropStudent(student)">
              Drop
            </button>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import tab from "../_tabs/tab";
import tabs from "../_tabs/tabs";
import modal from "@/modals/empty";
export default {
  components: {
    tab,
    tabs,
    modal,
  },

  computed: {
    studentList() {
      let [list] = this.subjectList
        .filter((k) => k.subject_code === this.needs.subject_code)
        .map((v) => v.students);

      return !list
        ? []
        : list
            .filter((k) => k.isDropped === 0)
            .map((k) => {
              let computeGwa =
                k.prelim_grade * 0.3 +
                k.midterm_grade * 0.3 +
                k.finals_grade * 0.4;

              let isGradeEmpty =
                !k.prelim_grade || !k.midterm_grade || !k.finals_grade;

              return {
                ...k,
                gwa: computeGwa === 0 ? null : isGradeEmpty ? null : computeGwa,

                remarks:
                  computeGwa >= 75 ? "Passed" : isGradeEmpty ? null : "Failed",
              };
            });
    },

    openCollapse() {
      return this.$store.state.openAccordion === this.needs.subject_code;
    },

    searchListModal() {
      return !this.searchQuery
        ? this.modalStudents
        : this.modalStudents.filter((item) => {
            return this.searchQuery
              .toLowerCase()
              .split(" ")
              .every(
                (v) =>
                  item.firstname.toLowerCase().includes(v) ||
                  item.lastname.toLowerCase().includes(v)
              );
          });
    },

    //check if data property of student is empty
    isEmpty() {
      return Object.values(this.student).every((v) => v === "");
    },
  },

  data() {
    return {
      hide: true,

      gpe: "",

      engrCourse: ["BSCpE", "BSEE", "BSECE", "BSIE", "BS Architecture"],
      subjectList: [],

      students: [],

      searchQuery: "",

      needs: {
        student_id: "",
        created_at: "",
        subject_code: "",
        subject_sem: "",
      },

      student: {
        student_id: "",
        firstname: "",
        lastname: "",
        student_email: "",
        student_course: "",
      },

      modalStudents: [],

      payloadStudent: [],

      emailValidation: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,

      error: "",
    };
  },

  methods: {
    showModal() {
      this.$refs.importer.open();
      this.$axios
        .get(`${this.$store.state.BASE_URL}/list/all/students`)
        .then(({ data }) => {
          this.modalStudents = data;
        });
    },

    getStudentInfo(e, std) {
      if (e.target.checked) {
        this.payloadStudent.push(std);
      } else {
        this.payloadStudent.splice(this.payloadStudent.indexOf(std), 1);
      }
    },

    getSubjectCode(code) {
      this.hide = !this.hide;

      this.needs.subject_code = code.subject_code;
      this.needs.subject_sem = code.subject_sem;
    },

    async addOldStudents() {
      try {
        let dispatch = this.payloadStudent.map((k) => {
          return k.student_id;
        });

        const { status } = await this.$axios.post(
          `${this.$store.state.BASE_URL}/add/old/students`,
          {
            listStudents: dispatch,
            subject_code: this.needs.subject_code,
            subject_sem: this.needs.subject_sem,
          }
        );

        if (status === 200) {
          this.initEnrolledStudents();
          this.$refs.importer.close();
          this.payloadStudent = [];
          dispatch = [];
        }
      } catch (error) {
        if (error.response !== undefined) {
          alert(
            `Students ${error.response.data.message} are already included in the classroom`
          );
        }
      }
    },

    async addStudents() {
      try {
        if (this.isEmpty) {
          this.error = "Please Fill up all the Student Information";
          return;
        }

        if (!this.error) {
          const { status } = await this.$axios.post(
            `${this.$store.state.BASE_URL}/add/students`,
            {
              ...this.student,
              subject_code: this.needs.subject_code,
              subject_sem: this.needs.subject_sem,
            }
          );

          if (status === 200) {
            Object.keys(this.student).forEach((k) => (this.student[k] = ""));
            this.initEnrolledStudents();
            this.$refs.importer.close();
          }
        }
      } catch (error) {
        if (error.response !== undefined) {
          if (error.response.data.message.includes("Student Email")) {
            this.error = error.response.data.message;
          } else if (error.response.data.message.includes("Student ID")) {
            this.error = error.response.data.message;
          } else if (error.response.data.message.includes("class")) {
            this.error = error.response.data.message;
          } else {
            console.log(error.response);
          }
        }
      }
    },

    async dropStudent(student) {
      const { state } = this.$store;
      delete this.needs.subject_sem;

      let prompt = this.askUser(student);

      if (prompt) {
        this.needs.student_id = student.student_id;
        this.needs.created_at = student.created_at;

        try {
          const deactStudent = await this.$axios.patch(
            `${state.BASE_URL}/drop/students`,
            this.needs
          );
          if (deactStudent.status === 200) this.initEnrolledStudents();
        } catch (error) {
          console.log(error.response);
        }
      } else {
        return;
      }
    },

    askUser(name) {
      let foundData = this.subjectList.find(
        (el) => el.subject_code === this.needs.subject_code
      );

      const answer = window.confirm(
        `Do you really want to Drop ${name.firstname} ${name.lastname} from ${foundData.subject_name} ?`
      );

      return answer ? true : false;
    },

    initEnrolledStudents() {
      this.$store
        .dispatch("getEnrolledStudents")
        .then((result) => {
          this.subjectList = result;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },

  mounted() {
    this.initEnrolledStudents();
  },

  watch: {
    // Lils paganahin mo nga to HAHAHA
    // computeGwa(val) {
    //   if (val >= 97 && val <= 100) {
    //     this.gpe = 1.0;
    //   } else if (val >= 94.25 && val <= 96.99) {
    //     this.gpe = 1.25;
    //   } else if (val >= 91.5 && val <= 94.24) {
    //     this.gpe = 1.5;
    //   } else if (val >= 88.75 && val <= 91.49) {
    //     this.gpe = 1.75;
    //   } else if (val >= 86 && val <= 88.74) {
    //     this.gpe = 2.0;
    //   } else if (val >= 83.25 && val <= 85.99) {
    //     this.gpe = 2.25;
    //   } else if (val >= 80.5 && val <= 83.24) {
    //     this.gpe = 2.5;
    //   } else if (val >= 77.75 && val <= 80.49) {
    //     this.gpe = 2.75;
    //   } else if (val >= 75 && val <= 77.74) {
    //     this.gpe = 3.0;
    //   } else if (val < 75) {
    //     this.gpe = 5.0;
    //   } else {
    //     this.gpe = "";
    //   }
    // },

    "student.student_id"(val) {
      if (!val) {
        this.error = "student id is required";
        return;
      }

      this.error = "";
    },

    "student.student_email"(val) {
      if (!val) {
        this.error = "student email is required";
        return;
      } else if (!this.emailValidation.test(val)) {
        this.error = "Please enter a valid email";
        return;
      }

      this.error = "";
    },

    "student.firstname"(val) {
      if (!val) {
        this.error = "student firstname is required";
        return;
      }
    },

    "student.lastname"(val) {
      if (!val) {
        this.error = "student lastname is required";
        return;
      }

      this.error = "";
    },

    "student.student_course"(val) {
      if (!val) {
        this.error = "student course is required";
        return;
      }

      this.error = "";
    },
  },
};
</script>

<style lang="css" scoped>
.addBtn {
  margin-left: 10px;
  margin-bottom: 5px;
  padding: 15px;
  font-size: 20px;
}

.tab {
  border: 8px solid #555;
  background-color: white;
  font-size: 18px;
}

.tab li {
  background-color: white;
  font-size: 20px;
}

.subjects {
  margin: 10px;
  border-radius: 10px;
  text-align: center;
  font-size: 30px;
  padding: 10px;
  background: rgba(0, 0, 0, 0.7);
}
#collapse {
  height: auto;
  overflow: hidden;
  transition: 0.3s height;
}

#collapse[hide] {
  height: 0;
}
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}
td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}
tr:nth-child(even) {
  background-color: #dddddd;
  color: black;
}
</style>
