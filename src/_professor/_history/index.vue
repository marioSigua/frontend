<template lang="html">
  <section>
    <h1>History</h1>

    <div class="">
      <aside class="">
        Filter by:
        <div>
          <select>
            <option hidden>-- Term --</option>
            <option>Prelims</option>
            <option>Midterms</option>
            <option>Pre-Finals</option>
            <option>Finals</option>
          </select>
          <select>
            <option hidden>-- Type of Form --</option>
            <option>Quiz</option>
            <option>Exam</option>
          </select>
        </div>

        <select v-model="subjectSelected">
          <!-- subjectSelected is being watched (more details in watch function )-->

          <option value="">-- Select Subject --</option>
          <!-- Loop for subjects after fetching from database (check mounted function for details) -->
          <option v-for="(subject, s) in subjectList" :key="s" :value="subject">
            {{ subject.subject_name }}</option
          >
        </select>

        <ul>
          <!-- Loop for history after changing the subject -->
          <li
            v-for="(form, i) in historyList"
            :key="i"
            @click="selectForm(form)"
          >
            <h3>{{ form.subject_name }}</h3>
            <span>{{ form.date_end + " " + form.time_end }}</span>
            <br />
            <em>{{ form.term }}</em>
            <hr />
            <p>{{ form.description }}</p>
          </li>
        </ul>
      </aside>

      <article class="">
        <a @click="$router.go(-1)">x</a>
        <div class="right">
          <button @click="checkForm()" :disabled="!link.token">
            Form Link
          </button>
        </div>
        <table>
          <tr>
            <th>Student Id</th>
            <th>Last Name</th>
            <th>First Name</th>
            <th>Score</th>
            <th>Status</th>
            <th>Email Sent</th>
            <th>View</th>
          </tr>

          <tr v-for="(student, s) in table" :key="s">
            <td>{{ student.student_id }}</td>
            <td>{{ student.lastname }}</td>
            <td>{{ student.firstname }}</td>
            <td>{{ student.score }}</td>
            <td>
              {{ student.isTaken ? "Submitted" : "Not Submitted" }}
            </td>

            <td>
              {{ student.emailStat }}
            </td>
            <td>
              <button
                v-if="student.isTaken"
                @click="checkResponse(student.student_token)"
              >
                Check Form
              </button>
            </td>
          </tr>
        </table>
      </article>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      // subjectList: [{ name: 'Memory IO', code: 'MEMIO' }],
      subjectList: [],
      subjectSelected: "",

      historyList: [],

      link: {
        token: "",
        batch: "",
        subject_code: "",
      },

      table: [],

      temp_studentResponse: [],

      temp_email: [],
    };
  },

  methods: {
    selectForm(i) {
      this.link.batch = i.batch_number;
      this.link.token = i.url;
      this.link.subject_code = i.subject_code;

      this.getStudents(this.subjectSelected);
    },

    checkForm() {
      let routeData = this.$router.resolve({
        name: "HistoryForm",
        params: { ...this.link },
      });
      window.open(routeData.href, "_blank");
    },

    checkResponse(token) {
      console.log(token);
      let routeData = this.$router.resolve({
        name: "reponseviewing",
        params: { token: this.link.token, student_id: token },
      });

      window.open(routeData.href, "_blank");
    },

    getStudents(sub) {
      this.$store.dispatch("getStudents", sub.subject_code).then((students) => {
        const responses = students
          .filter((o) => o.EnrolledSubjects.isDropped === 0)
          .map((k) => {
            let foundData = this.temp_studentResponse.find(
              (el) =>
                el.student_id === k.student_id &&
                el.batch_number === this.link.batch
            );

            let isEmailSent = this.temp_email.find(
              (dt) =>
                dt.student_id === k.student_id &&
                dt.batch_number === this.link.batch
            );

            return {
              student_id: k.student_id,
              firstname: k.firstname,
              lastname: k.lastname,
              score: foundData ? foundData.score : "",

              student_token: foundData ? foundData.student_token : "",

              isTaken: foundData ? foundData.isTaken : false,

              emailStat: isEmailSent ? "Sent" : "Not Sent",
            };
          });
        this.table = responses;
      });
    },
  },
  mounted() {
    // call subjects then handle data here
    this.$store.dispatch("profSubjects").then((subjects) => {
      // save locally
      this.subjectList = subjects;
    });
  },
  watch: {
    subjectSelected(sub) {
      // if nothing selected, clear all data
      if (sub === "") {
        // uncomment code if connected to database
        this.historyList = [];
        // this.link=''
        this.table = [];
        return;
      }
      this.table = [];

      this.$axios
        .get(`${this.$store.state.BASE_URL}/exam/history`, {
          params: { subject_code: sub.subject_code },
        })
        .then(({ data }) => {
          this.historyList = data.history.map((k) => {
            return {
              ...k,
              subject_name: sub.subject_name,
            };
          });

          this.temp_email = data.emailStatus;
          this.temp_studentResponse = data.studentResponse;
        });
    },
  },
};
</script>

<style lang="css" scoped>
select:hover,
button:hover,
li:hover {
  cursor: pointer;
}

div {
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-gap: 10px;
}

aside {
  border-radius: 10px;
  padding: 10px;
  background: rgba(0, 0, 0, 0.7);
}

li {
  background: white;
  color: #444;
  border-radius: 10px;
}
li:hover {
  background: rgba(255, 255, 255, 0.9);
}
li > span {
  font-weight: 300;
}

article {
  border-radius: 10px;
  padding: 10px;
  background: rgba(0, 0, 0, 0.7);
}

table {
  width: 100%;
}

a {
  text-align: center;
  width: 30px;
  height: 30px;
  float: right;
  font-size: 20px;
}

a:hover {
  border-radius: 50%;
  background: rgba(44, 44, 44, 0.9);
  cursor: pointer;
}
</style>
