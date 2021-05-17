<template lang="html">
  <section @click="isModalClosed">
    <h1>Exam</h1>
    <creator v-on:import="showModal" ref="creator"></creator>
    <modal ref="importer">
      <template v-slot:header>
        Select
      </template>
      <template v-slot:body>
        <div class="nav">
          <select v-model="selectedSubject">
            <option value="">-- Select Subject -- </option>

            <option
              v-for="(subject, s) in subjects"
              :key="s"
              :value="subject.subject_code"
              >{{ subject.subject_name }}</option
            >
          </select>

          <select v-if="selectedSubject != ''" v-model="selectedTopic">
            <option value="" hidden>-- Select Topic --</option>
            <option v-for="(topic, s) in listTopics" :key="s" :value="topic">{{
              topic
            }}</option>
          </select>

          <select v-if="selectedTopic != ''" v-model="selectedType">
            <option value="" hidden>-- Select Type --</option>
            <option value="identification">Identification</option>
            <option value="mcq">Multiple Choice Questions</option>
          </select>
        </div>

        <ul>
          <li v-for="(question, q) in questions" :key="q">
            <h3 v-if="question.question_type === 'text'">
              {{ question.question }}
            </h3>

            <img
              v-else
              class="is-rounded"
              height="300"
              width="300"
              :src="question.question"
              alt="Placeholder image"
            />

            <p>Answer: {{ question.form_answer }}</p>
            <button @click="importQuestion(q)">Import</button>
          </li>
        </ul>
      </template>
    </modal>
  </section>
</template>

<script>
import creator from "@/_professor/_exam/creator";
import modal from "@/modals/empty";

export default {
  components: { creator, modal },

  computed: {
    listTopics() {
      const list = [];

      this.topics.forEach((k) => {
        if (!list.includes(k.topic)) {
          list.push(k.topic);
        }
      });

      return list;
    },
  },

  data() {
    return {
      // subjects: [{ name: 'Memory IO', code: 'MEMIO' }],
      subjects: [],

      selectedSubject: "",

      // topics: [{ name: 'RAM/ROM', code: 'ramrom' }],
      topics: [],

      selectedTopic: "",
      selectedType: "",

      // questions: [
      //      {
      //           type: 'identification',
      //           question: 'Is this a question?',
      //           answer: 'Maybe?',
      //      },
      // ],

      questions: [],
      temp_RequestHolder: [],

      temp_creatorSelected: "",
    };
  },

  methods: {
    isModalClosed() {
      if (!this.$refs.importer.$data.show) {
        this.selectedSubject = "";
        this.selectedTopic = "";
        this.selectedType = "";
        this.questions = [];
        this.temp_creatorSelected = "";
      }
    },

    showModal() {
      this.$refs.importer.open();

      this.$axios
        .get(`${this.$store.state.BASE_URL}/exam/topics`)
        .then(({ data }) => {
          this.temp_RequestHolder = data.map((k) => {
            return {
              batch_number: k.batch_number,
              topic: k.topic,
              subject_code: k.subject_code,
              form_number: k.form_number,
              question: k.question,
              question_type: k.question_type,
              form_answer: k.form_answer,
              type: k.type,
              student_answer: "",
              question_score: k.question_score,
              error: "",
              choices: k.choices,
            };
          });
        })
        .catch((err) => {
          console.log(err);
        });

      //kinuha ko yung list of subjects sa my creator.vue
      if (this.$refs.creator.$data.selectedSubject) {
        this.temp_creatorSelected = this.$refs.creator.$data.selectedSubject;
        this.subjects = this.$refs.creator.subjectList.filter(
          (el) => el.subject_code === this.temp_creatorSelected
        );
        this.selectedSubject = this.temp_creatorSelected;
      } else {
        this.subjects = this.$refs.creator.subjectList;
      }
    },

    importQuestion(q) {
      if (this.$refs.creator.questions.includes(this.questions[q])) {
        alert("Topic is already Added");
        return;
      } else {
        delete this.questions[q].batch_number;
        this.questions[q].type = this.selectedType;
        this.$refs.creator.appendPremade(this.questions[q]);
      }
    },
  },
  mounted() {
    // questions for getting the topic
    /*
          fetch nyo subjects para pag nag import may pagpilian
          save nyo sa this.subjects


          format:
          array ng ganito
          {name:'Memory IO', code:'MEMIO'}

          */
  },
  watch: {
    selectedSubject(val) {
      if (val == "") {
        return;
      }

      this.topics = this.temp_RequestHolder.filter(
        (k) => k.subject_code === val
      );

      /*
            pag nag select ng subject yung user, gamitin nyo yung val para pang fetch ng data para sa topics
            */
    },

    selectedTopic(val) {
      if (val == "") {
        return;
      }

      /*
            pag nag select ng topic yung user, gamitin nyo yung val at this.selectedType para pang fetch ng mga questions
            */
    },
    selectedType(val) {
      if (val == "") {
        this.questions = [];
        return;
      }

      this.questions = this.temp_RequestHolder.filter(
        (k) => k.topic === this.selectedTopic && k.type === val
      );

      /*
            pag nag select ng type yung user,
            gamitin nyo yung val at this.selectedTopic para pang fetch ng mga questions
            halos pareho lang din pero magkaiba ng watcher


            */
    },
  },
};
</script>

<style lang="css" scoped>
.nav {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 10px;

  position: sticky;
  top: 0;
}

li {
  border-top: 1px solid #333;
}
</style>
