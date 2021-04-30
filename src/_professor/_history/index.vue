<template lang="html">
  <section>
    <h1>History</h1>

    <div class="">
      <aside class="">
        <select v-model="subjectSelected">
          <!-- subjectSelected is being watched (more details in watch function )-->

          <option value="">-- Select Subject --</option>
          <!-- Loop for subjects after fetching from database (check mounted function for details) -->
          <option
            v-for="(subject, s) in subjectList"
            :key="s"
            :value="subject.code"
          >
            {{ subject.name }}</option
          >
        </select>
        <ul>
          <!-- Loop for history after changing the subject -->
          <li v-for="(form, i) in historyList" :key="i" @click="selectForm(i)">
            <h3>{{ form.name }}</h3>
            <span>{{ form.time }}</span
            ><br />
            <em>{{ form.term }}</em>
            <hr />
            <p>{{ form.description }}</p>
          </li>
        </ul>
      </aside>

      <article class="">
        <a @click="$router.go(-1)">x</a>
        <div class="right">
          <button>Form Link</button>
        </div>
        <table>
          <tr>
            <th>Student Id</th>
            <th>Last Name</th>
            <th>First Name</th>
            <th>Score</th>
            <th>Status</th>
            <th>View</th>
          </tr>

          <tr v-for="(student, s) in table" :key="s">
            <td>{{ student.id }}</td>
            <td>{{ student.lastname }}</td>
            <td>{{ student.firstname }}</td>
            <td>{{ student.score }}</td>
            <td>{{ student.status }}</td>
            <td>{{ student.view }}</td>
          </tr>
        </table>

        sdad
      </article>
    </div>
  </section>
</template>

<script>
export default {
  // filipino comments are crucial!!!
  // filipino comments are crucial!!!
  // filipino comments are crucial!!!
  // filipino comments are crucial!!!

  data() {
    return {
      subjectList: [{ name: "Memory IO", code: "MEMIO" }],
      subjectSelected: "",

      historyList: [
        {
          name: "Memory IO",
          term: "Preliminary",
          time: "2021-04-27T07:28:54.000Z",
          description: "Sample description",
        },
        {
          name: "Memory IO",
          term: "Midterm",
          time: "2021-04-27T07:28:54.000Z",
          description: "Sample description",
        },
      ],

      link: "",
      table: [
        {
          id: 32133212,
          firstname: "Mario",
          lastname: "Sigua",
          score: 100,
          status: "Taken",
          view: "",
        },
        {
          id: 12312312,
          firstname: "Vincent",
          lastname: "Gorospe",
          score: 99,
          status: "Taken",
          view: "",
        },
        {
          id: 54354354,
          firstname: "David",
          lastname: "Argarin",
          score: 98,
          status: "Not Taken",
          view: "",
        },
      ],
    };
  },

  methods: {
    selectForm(i) {
      console.log("Select " + i.name);
      // pag nag select ng list

      /*
      fetch nyo yung data ng mga students dito kasama yung link ng form
      sa this.table nakalagay yung data ng students

      kung papalitan nyo format na nagawa ko iedit nyo din yung html sa taas para maging compatible

      yung maseselect na subject yung value ng i na ibig sabihin yung index nya kung pang ilan yung form sa array

      */
    },
  },
  mounted() {
    /*
    fetch nyo mga subjects sa database
    tapos iupdate nyo yung this.subjectList na array

    format
    [{name:'Memory IO', code:'MEMIO'}],
    kung papalitan nyo format na nagawa ko iedit nyo din yung html sa taas para maging compatible

    sample case: yung --> code:'MEMIO' <-- yung magiging basehan kung ano ifefetch pag nagpalit ng subject yung user
    */
  },
  watch: {
    selectedSubject(sub) {
      // if nothing selected, clear all data
      if (sub == "") {
        // uncomment code if connected to database
        //this.historyList=[]
        // this.link=''
        // this.table = []
        return;
      }

      /*
      fetch nyo yung history na ilalagay sa list
      update nyo yung this.historyList na array, sundan nyo na lang format para gumana agad

      format
      {name:'Memory IO', term:'Preliminary', time:'2021-04-27T07:28:54.000Z', description:'Sample description'},
      kung papalitan nyo format na nagawa ko iedit nyo din yung html sa taas para maging compatible
      */
    },
  },
};
</script>

<style lang="css" scoped>
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
