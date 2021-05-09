<template>
  <section>
    <ul>
      <h1>{{ `Student ID: ${info.student_id}` }}</h1>
      <p>{{ `Student Name: ${info.firstname}  ${info.lastname}` }}</p>

      <li v-for="(li, q) in questions" :key="q" class="backdrop">
        <div v-if="li.type == 'essay'">
          <h3>Essay</h3>

          <div>
            <input class="ptsInput" v-model="li.student_score" />
            /
            {{ li.question_score }}
            <span>pts</span>
          </div>

          <p v-if="li.question_type === 'text'">
            {{ li.question }}
          </p>

          <img
            v-else
            class="is-rounded"
            height="300"
            width="300"
            :src="li.question ? li.question : 'https://i.imgur.com/bCOd9N0.jpg'"
            alt="Placeholder image"
          />

          <input
            type="text"
            name=""
            value=""
            placeholder="Your answer"
            v-model="li.student_answer"
          />
        </div>

        <div v-else-if="li.type == 'identification'">
          <h3>Identification</h3>

          Question
          <div class="wrapper">
            <p v-if="li.question_type === 'text'">
              {{ li.question }}
            </p>

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
            <p v-if="li.question_type === 'text'">
              {{ li.question }}
            </p>

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
          <div v-for="(choice, c) in li.choices" :key="li.form_number + '' + c">
            <input
              @change="getChoiceValue($event)"
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
export default {
  computed: {
    batchToken() {
      return this.$route.params.token;
    },

    idToken() {
      return this.$route.params.student_id;
    },

    state() {
      return this.$store.state;
    },

    responseList() {
      return this.questions;
    },

    listFormNum() {
      return this.responseList.map((k) => {
        if (k.type === "essay") {
          return k.form_number;
        }
      });
    },
  },

  data() {
    return {
      questions: [],

      info: {
        firstname: "",
        lastname: "",
        student_id: "",
      },
    };
  },

  methods: {
    async submitForm() {
      try {
        const mappedList = this.questions
          .filter((v) => v.type === "essay")
          .map((k) => {
            return {
              student_score: parseInt(k.student_score),
              form_number: k.form_number,
            };
          });

        const { status } = await this.$axios.patch(
          `${this.state.BASE_URL}/essay/score`,
          {
            batch_token: this.batchToken,
            id_token: this.idToken,
            formNumber: this.listFormNum,
            formList: mappedList,
          }
        );

        if (status === 201) window.location.reload();
      } catch (error) {
        console.log(error.response);
      }
    },
  },

  async mounted() {
    const { token, student_id } = this.$route.params;

    try {
      const { data, status } = await this.$axios.get(
        `${this.$store.state.BASE_URL}/viewing/student/form/${token}/${student_id}`
      );

      if (status === 200) {
        this.questions = data.list;
        this.info = { ...data.profile };
      }
    } catch (error) {
      console.log(error.response);
    }
  },
};
</script>

<style lang="css" scoped>
p {
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
