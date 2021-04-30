<template lang="html">
  <section>
    <h1>Exam</h1>
    <creator v-on:import="showModal" ref="creator"></creator>
    <modal ref="importer">
      <template v-slot:header>
        Import
      </template>
      <template v-slot:body>
        <div class="nav">
          <select v-model="selectedSubject">
            <option value="">Select Subject</option>
            <option v-for="(subject,s) in subjects" :key="s" :value="subject.code">{{subject.name}}</option>
          </select>
          <select v-if="selectedSubject!=''" v-model="selectedTopic">
            <option value="">Select Topic</option>
            <option v-for="(topic,s) in topics" :key="s" :value="topic.code">{{topic.name}}</option>

          </select>
          <select v-if="selectedTopic!=''" v-model="selectedType">
            <option value="identification">Identification</option>
            <option value="essay">Essay</option>
            <option value="mcq">Multiple Choice Questions</option>
          </select>
        </div>



        <ul>
          <li v-for="(question,q) in questions" :key="q">
            <h3>{{question.question}}</h3>
            <p>Answer:{{question.answer}}</p>
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
  data(){
    return{
      subjects:[
        {name:'Memory IO', code:'MEMIO'}
      ],
      selectedSubject:'',

      topics:[
        {name:'RAM/ROM', code:'ramrom'}
      ],
      selectedTopic:'',
      selectedType:'identification',

      questions:[
        {type:'identification', question:'Is this a question?', answer:'Maybe?'}
      ]
    }

  },
  methods:{
    showModal(){
      this.$refs.importer.open();
    },
    importQuestion(q){
      console.log('Importing Question to Creator');
      console.log(q);
      this.$refs.creator.append(this.questions[q]);
    }
  },
  mounted(){
    console.log('Mounted');
    /*
    fetch nyo subjects para pag nag import may pagpilian
    save nyo sa this.subjects


    format:
    array ng ganito
    {name:'Memory IO', code:'MEMIO'}

    */
  },
  watch:{
    selectedSubject(val){
      console.log(val);
      if (val=='') {
        return
      }
      /*
      pag nag select ng subject yung user, gamitin nyo yung val para pang fetch ng data para sa topics
      */
    },
    selectedTopic(val){
      console.log(val);
      if (val=='') {
        return
      }
      /*
      pag nag select ng topic yung user, gamitin nyo yung val at this.selectedType para pang fetch ng mga questions
      */
    },
    selectedType(val){
      console.log(val);
      if (val=='') {
        return
      }
      /*
      pag nag select ng type yung user,
      gamitin nyo yung val at this.selectedTopic para pang fetch ng mga questions
      halos pareho lang din pero magkaiba ng watcher
      */
    },



  }
};
</script>

<style lang="css" scoped>
  .nav{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap:10px;

    position: sticky;
    top: 0;
  }

  li{
    border-top: 1px solid #333;
  }



</style>
