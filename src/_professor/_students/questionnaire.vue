<template lang="html">
  <section>
    <div class="boset" v-if="error !== ''">
      <span id="thisError" class="backdrop">
        {{ error }}
      </span>
    </div>

    <ul v-else>
      <li v-for="(li, q) in questions" :key="q" class="backdrop">
        <div v-if="li.type == 'essay'">
          <h3>Essay</h3>

          <p v-if="li.question_type === 'text'">{{ li.question }}</p>

          <img
            v-else
            class="is-rounded"
            height="300"
            width="300"
            :src="li.question ? li.question : 'https://i.imgur.com/bCOd9N0.jpg'"
            alt="Placeholder image"
          />

          <tabs :mode="mode">
            <tab title="Text">
              <input
                type="text"
                name=""
                value=""
                placeholder="Your answer"
                v-model="li.student_answer"
              />
            </tab>

            <tab title="Image">
              <img
                class="is-rounded"
                height="300"
                width="300"
                alt="Placeholder image"
                @click="$refs.file[e].click()"
              />
            </tab>
          </tabs>
        </div>

        <div v-else-if="li.type == 'identification'">
          <h3>Identification</h3>

          Question
          <div class="wrapper">
            <p v-if="li.question_type === 'text'">{{ li.question }}</p>

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
          <input
            type="text"
            name=""
            value=""
            placeholder="Your answer"
            v-model="li.student_answer"
          />
        </div>

        <div v-else>
          <h3>Multiple Choice</h3>

          Question
          <div class="wrapper">
            <p v-if="li.question_type === 'text'">{{ li.question }}</p>

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

          Choices:
          <div></div>
          <div
            class="thisChoices"
            v-for="(choice, c) in li.choices"
            :key="li.form_number + '' + c"
          >
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
      <button @click="submitForm">Submit</button>
    </ul>
  </section>
</template>

<script>
import Tab from "../_tabs/tab";
import Tabs from "../_tabs/tabs";

export default {
  components: {
    Tab,
    Tabs,
  },

  data() {
    return {
      questions: [],
      description: "sample",

      listStudents: [],

      stdEmail: [],
      error: "",
    };
  },

  methods: {
    async submitForm() {
      const { state } = this.$store;

      const dispatch = this.questions.map((k) => {
        let isCorrect = "";

        if (k.type === "essay") {
          isCorrect = "";
        } else {
          isCorrect =
            k.form_answer.toLowerCase() === k.student_answer.toLowerCase() ||
            k.form_answer.toUpperCase() === k.student_answer.toUpperCase()
              ? true
              : false;
        }

        return {
          student_answer: k.student_answer,
          student_score: isCorrect
            ? k.question_score
            : k.type === "essay"
            ? null
            : 0,
          student_id: this.$route.params.student_id,
          batch_number: k.batch_number,
          form_number: k.form_number,
          subject_code: k.subject_code,
        };
      });
      try {
        const isSuccess = await this.$axios.post(
          `${state.BASE_URL}/student/response`,
          { questionList: dispatch }
        );

        if (isSuccess.status === 200) window.location.reload();
      } catch (error) {
        console.log(error.response);
      }
    },
  },

  mounted() {
    const payload = {
      token: this.$route.params.token,
      student_id: this.$route.params.student_id,
    };

    this.$store
      .dispatch("getQuestion", payload)
      .then((result) => {
        this.questions = result;
      })
      .catch((err) => {
        if (err.data !== undefined) {
          this.error = err.data.message;
        }
      });
  },
};
</script>

<style lang="css" scoped>
.thisChoices {
  -webkit-user-select: none; /* Safari */
  -webkit-touch-callout: none; /* iOS Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -ms-user-select: none; /* Internet Explorer/Edge */
  -moz-user-select: none; /* Old versions of Firefox */
  user-select: none; /* Non-prefixed version*/
}

.backdrop {
  background: rgba(0, 0, 0, 0.7);
  box-sizing: content-box;
}

#thisError {
  display: flex;
  justify-content: center;
  border-radius: 10px;
  padding: 20px;
  font-size: 25px;
}

.mcqChoice {
  margin-right: 10px;
}

p {
  margin-top: 15px;
  margin-left: 15px;
  -webkit-user-select: none; /* Safari */
  -webkit-touch-callout: none; /* iOS Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -ms-user-select: none; /* Internet Explorer/Edge */
  -moz-user-select: none; /* Old versions of Firefox */
  user-select: none; /* Non-prefixed version*/
}

.topic {
  width: 40%;
  margin-bottom: 10px;
}

span {
  padding: 10px;
}

.ptsInput {
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
