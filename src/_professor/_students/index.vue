<template lang="html">
     <div class="backdrop">
          <div
               class="subjects"
               v-for="(subject, s) in subjectList"
               :key="s"
               @click="getSubjectCode(subject.subject_code)"
          >
               {{ subject.subject_name }}
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
                         <th>Finals</th>
                         <th>GWA</th>
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
     export default {
          computed: {
               studentList() {
                    let [list] = this.subjectList
                         .filter(
                              (k) => k.subject_code === this.needs.subject_code
                         )
                         .map((v) => v.students)

                    return !list
                         ? []
                         : list
                                .filter((k) => k.isDropped === 0)
                                .map((k) => {
                                     let computeGwa =
                                          k.prelim_grade * 0.3 +
                                          k.midterm_grade * 0.3 +
                                          k.finals_grade * 0.4

                                     let isGradeEmpty =
                                          !k.prelim_grade ||
                                          !k.midterm_grade ||
                                          !k.finals_grade

                                     return {
                                          ...k,
                                          gwa:
                                               computeGwa === 0
                                                    ? null
                                                    : isGradeEmpty
                                                    ? null
                                                    : computeGwa,

                                          remarks:
                                               computeGwa >= 75
                                                    ? 'Passed'
                                                    : isGradeEmpty
                                                    ? null
                                                    : 'Failed',
                                     }
                                })
               },
          },

          data() {
               return {
                    hide: true,

                    subjectList: [],

                    students: [],

                    needs: {
                         student_id: '',
                         created_at: '',
                         subject_code: '',
                    },
               }
          },

          methods: {
               getSubjectCode(code) {
                    this.hide = !this.hide

                    this.needs.subject_code = code
               },

               async dropStudent(student) {
                    const { state } = this.$store
                    this.needs.student_id = student.student_id
                    this.needs.created_at = student.created_at
                    try {
                         console.log(this.needs)
                         const deactStudent = await this.$axios.patch(
                              `${state.BASE_URL}/drop/students`,
                              this.needs
                         )

                         if (deactStudent.status === 200)
                              this.initEnrolledStudents()
                    } catch (error) {
                         console.log(error.response)
                    }
               },

               initEnrolledStudents() {
                    this.$store
                         .dispatch('getEnrolledStudents')
                         .then((result) => {
                              this.subjectList = result
                         })
                         .catch((err) => {
                              console.log(err)
                         })
               },
          },

          mounted() {
               this.initEnrolledStudents()
          },
     }
</script>

<style lang="css" scoped>
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
