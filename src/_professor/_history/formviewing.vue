<template lang="html">
  <section>
    <h1>{{ title }}</h1>
    <p>{{ $route.params.subject_code }}</p>
    <button type="button" name="button" v-on:click="showModal">
      Resend To Students
    </button>

    <ul>
      <modal ref="importer">
        <template v-slot:header>Send to Students</template>
        <template v-slot:body>
          <div class="modalList">
            <ul class="list">
              <li v-for="(student, s) in listStudents" :key="s">
                <input
                  type="checkbox"
                  ref="studentEmail"
                  @change="getEmails($refs.studentEmail, s)"
                  :value="student.student_email"
                />
                {{ student.firstname }}
              </li>
            </ul>
          </div>
        </template>

        <template v-slot:footer>
          <button @click="resendForm()">
            Send
          </button>
        </template>
      </modal>

      <li v-for="(li, q) in questions" :key="q" class="backdrop">
        <div v-if="li.type == 'essay'">
          <h3>Essay</h3>

          <div>
            <input class="ptsInput" v-model="li.question_score" />
            <span>pts</span>
          </div>

          Question
          <div class="wrapper">
            <textarea
              v-if="li.question_type === 'text'"
              v-model="li.question"
            ></textarea>

            <img
              v-else
              class="is-rounded"
              height="300"
              width="300"
              :src="
                li.question ? li.question : 'https://i.imgur.com/bCOd9N0.jpg'
              "
              alt="Placeholder image"
            />
          </div>
        </div>

        <div v-else-if="li.type == 'identification'">
          <h3>Identification</h3>

          <div class="topic">
            <label for="Topic">Topic:</label>
            <input type="text" v-model="li.topic" />
          </div>

          <div>
            <input class="ptsInput" v-model="li.question_score" />
            <span>pts</span>
          </div>

          Question
          <div class="wrapper">
            <textarea
              v-if="li.question_type === 'text'"
              v-model="li.question"
            ></textarea>

            <img
              v-else
              class="is-rounded"
              height="300"
              width="300"
              :src="
                li.question ? li.question : 'https://i.imgur.com/bCOd9N0.jpg'
              "
              alt="Placeholder image"
            />
          </div>
          Question Answer
          <input type="text" name="" value="" v-model="li.form_answer" />
        </div>

        <div v-else>
          <h3>Multiple Choice</h3>

          <div class="topic">
            <label for="Topic">Topic:</label>
            <input type="text" v-model="li.topic" />
          </div>

          <div>
            <input class="ptsInput" v-model="li.question_score" />
            <span>pts</span>
          </div>

          Question
          <div class="wrapper">
            <textarea
              v-if="li.question_type === 'text'"
              v-model="li.question"
            ></textarea>

            <img
              v-else
              class="is-rounded"
              height="300"
              width="300"
              :src="
                li.question ? li.question : 'https://i.imgur.com/bCOd9N0.jpg'
              "
              alt="Placeholder image"
            />
          </div>

          Question Answer
          <div v-for="(choice, c) in li.choices" :key="li.form_number + '' + c">
            <input
              class="mcqChoice"
              type="radio"
              v-model="li.student_answer"
              :key="c"
              :id="c"
              :value="choice.value"
            />
            <label>{{ choice.value }}</label>
            <br />
          </div>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
import modal from "@/modals/empty";
export default {
  components: {
    modal,
  },

  data() {
    return {
      questions: [],
      description: "sample",

      listStudents: [],

      stdEmail: [],

      title: "",
    };
  },

  methods: {
    getEmails(ref, index) {
      this.stdEmail.push(ref[index].value);
    },

    showModal() {
      this.$store
        .dispatch("getStudents", this.$route.params.subject_code)
        .then((result) => {
          this.listStudents = result.filter(
            (o) => o.EnrolledSubjects.isDropped === 0
          );
          this.$refs.importer.open();
        })
        .catch((err) => {
          console.log(err);
        });
    },

    async resendForm() {
      const { state } = this.$store;
      try {
        const isSuccess = await this.$axios.post(
          `${state.BASE_URL}/resend/question`,
          {
            batch_number: this.$route.params.batch,
            stdEmail: JSON.stringify(this.stdEmail),
          }
        );

        if (isSuccess.status === 200) {
          this.$refs.importer.close();
          this.stdEmail = [];
        }
      } catch (error) {
        console.log(error);
      }
    },
  },

  mounted() {
    this.$store
      .dispatch("getResponse", this.$route.params.token)
      .then((result) => {
        this.questions = result;
      })
      .catch((err) => {
        console.log(err);
      });

    this.$store.dispatch("profSubjects").then((res) => {
      const { subject_name } = res.find(
        (el) => el.subject_code === this.$route.params.subject_code
      );

      this.title = subject_name;
    });
  },
};
</script>

<style lang="css" scoped>
.list {
  color: white;
}

.mcqChoice {
  margin-right: 10px;
}

.wrapper textarea {
  margin-top: 10px;
  padding: 10px;
  border-radius: 10px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
}

.topic {
  width: 50%;
  max-width: 300px;
  margin-bottom: 10px;
}

span {
  padding: 10px;
}

.ptsInput {
  border-radius: 10px;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  max-width: 50px;
  max-height: 50px;
  padding: 10px;
}

.selection {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 10px;
}

#remove {
  float: right;
}
#remove:hover {
  background: rgba(255, 0, 0, 0.4);
}

h3 {
  padding-bottom: 10px;
}

ul {
  list-style-type: none;
}

li {
  padding: 10px;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 10px;
  margin: 10px auto;
}

.text,
.input {
  padding: 10px;
  border: 1px solid #aaa;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.3);
  color: white;
  font-family: inherit;
  font-size: inherit;
  width: 100%;
  margin-bottom: 5px;
}
</style>
