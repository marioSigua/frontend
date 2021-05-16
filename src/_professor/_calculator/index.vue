<template lang="html">
     <div class="grid-container">
          <div id="sList">
               <h4>Student List</h4>
               <!-- Subjects -->
               <label for="name">Select Subject:</label>
               <select v-model="selectedSubject">
                    <option value="" hidden>-- Select Subject --</option>
                    <option
                         v-for="(category, i) in subjectList"
                         :key="i"
                         :value="category.subject_code"
                    >
                         {{ category.subject_name }}
                    </option>
               </select>

               <!-- Students -->
               <ul>
                    <li
                         v-for="(student, s) in studentList"
                         :key="s"
                         @click="selectStudent(student)"
                         :class="{ 'color-li': currentIndex === s }"
                    >
                         {{ student.firstname + ' ' + student.lastname }}
                    </li>
               </ul>
          </div>

          <div id="calc">
               <h4>Calculator</h4>

               <inputGrade
                    ref="calculatorMain"
                    :target="payload"
                    :subject="selectedSubject"
               ></inputGrade>
          </div>
     </div>
</template>

<script>
     import inputGrade from '@/_professor/_calculator/inputGrade'

     export default {
          components: { inputGrade },

          computed: {
               selectSubj() {
                    return this.$store.state.subjectList
                    /*
      sample expectations
      [{subject_name:'', subject_code:0 }]
      */
               },

               listStudents() {
                    return this.$store.state.calculator.listStudents
               },
          },

          data: function() {
               return {
                    selectStudents: false,

                    currentIndex: '',

                    subjectSelected: '',
                    // local data
                    subjectList: [],
                    studentList: [],
                    // selection
                    selectedStudent: '',
                    selectedSubject: '',

                    inpSubject: '',
                    inpCode: '',

                    // selected student
                    payload: {
                         student_id: '',
                         date_created: '',
                    },
               }
          },

          methods: {
               selectStudent(info) {
                    this.currentIndex = this.studentList.indexOf(info)
                    this.payload.student_id = info.student_id
                    this.payload.date_created = info.created_at
                    this.$refs.calculatorMain.getGrades()
               },

               newSubject: function(name, code) {
                    this.subjects.push({ name, code })
               },
          },

          mounted() {
               // call subjects then handle data here
               this.$store.dispatch('profSubjects').then((subjects) => {
                    // save locally
                    this.subjectList = subjects
               })
          },

          watch: {
               selectedSubject(selected) {
                    if (selected == '') {
                         this.studentList = []
                    } else {
                         this.$store
                              .dispatch('getStudents', selected)
                              .then((students) => {
                                   this.studentList = students.filter(
                                        (k) =>
                                             k.EnrolledSubjects.isDropped === 0
                                   )
                              })
                    }
               },
          },
     }
</script>

<style lang="css" scoped>
     .grid-container {
          display: grid;
          grid-template-areas:
               'header header header header header '
               'menu main main main right '
               'menu footer footer footer footer ';
          grid-gap: 10px;
          padding: 10px;
     }
     #sList {
          grid-area: menu;
     }
     #calc {
          grid-area: main;
     }

     li:hover {
          cursor: pointer;
     }

     .color-li {
          border-radius: 10px;
          background-color: rgb(58, 3, 1);
          color: white;
     }
</style>
