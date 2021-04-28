<template>



</template>

<script>
export default {
  props: {
    student: Object
  },
  data(){
    return {
      // subjects
      subjectList:[],
      subjectSelected:'',

      //students
      studentsList:[],
      studentSelected:'',
    }
  },
  mounted(){
    this.$store.dispatch('getSubjects').then(subjects=>{
      this.subjectList = subjects
    })
  },
  methods:{
    select(s){
      console.log(this.studentsList[s]);
    },
  }
  watch:{
    subjectSelected(selected){
      if(selected==''){
        this.studentList = [];
      }
      else {
        this.$store.dispatch('getStudents').then(students=>{
          this.studentList = students
        })
      }
    },



  }

};
</script>

<style scoped>
li {
  list-style-type: none;
}
</style>
