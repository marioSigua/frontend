<template lang="html">
     <section id="home">
          <h1>Home</h1>
          <addSub :profSubjs="subjects"></addSub>
          <button type="button" @click="endSem" name="button">
               End Sem
          </button>
          <h3>Semester: 2nd Sem</h3>
          <h3>Academic Year: {{ academicYear }}</h3>
          <div id="cards">
               <card
                    v-for="subj in subjects"
                    :key="subj.subject_code"
                    :title="subj.subject_name"
                    :code="subj.subject_code"
                    :time="subj.subject_desc"
                    :acadYear="academicYear"
                    :sem="subj.subject_sem"
                    @click="$store.state.openAccordion = subj.subject_code"
               ></card>
          </div>
     </section>
</template>

<script>
     import card from '@/_professor/_home/card'
     import addSub from '@/_professor/_home/addSub'

     export default {
          components: { card, addSub },

          computed: {
               subjects() {
                    return this.listSubjs
               },

               academicYear() {
                    let past = new Date(
                              new Date().setFullYear(
                                   new Date().getFullYear() - 1
                              )
                         ).getFullYear(),
                         current = new Date().getFullYear()
                    return `${past} - ${current}`
               },
          },

          data() {
               return {
                    initSuggest: false,

                    options: {
                         semester: ['1st SEMESTER', '2nd SEMESTER'],
                         course: [
                              'BSCpE',
                              'BSEE',
                              'BSECE',
                              'BSIE',
                              'BS Architecture',
                         ],
                         year: [
                              '1st Year',
                              '2nd Year',
                              '3rd Year',
                              '4th Year',
                              '5th Year',
                         ],
                    },

                    searchList: '',
                    payload: {
                         subject_code: '',
                         subject_course: '',
                         subject_desc: '',
                         subject_sem: '',
                         subject_year: '',
                    },

                    listSubjs: [],

                    sizeChangedBy: null,
                    optionVal: '',
               }
          },
          methods: {
               endSem() {
                    const account_id = this.$store.state.token_name.split(
                         '-'
                    )[1]

                    const answer = window.confirm(
                         `Do you really want to End the Current Semester of ${new Date().getFullYear()}?`
                    )

                    if (answer) {
                         this.$axios
                              .patch(
                                   `${this.$store.state.BASE_URL}/students/dropall`,
                                   {
                                        account_id,
                                   }
                              )
                              .then(() => {
                                   window.location.reload()
                              })
                              .catch((err) => {
                                   console.log(err.response)
                              })
                    }
               },

               sendToStudentList(id) {
                    this.$store.state.openAccordion = id
               },

               getSubjectValues(obj) {
                    this.payload = { ...obj }
               },
          },
          mounted() {
               this.$store
                    .dispatch('profSubjects')
                    .then((d) => (this.listSubjs = d))

               setTimeout(() => {
                    this.$store.dispatch('getSubjects')
               }, 2000)
          },
     }
</script>

<style lang="css" scoped>
     #cards {
          margin-top: 10px;
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          grid-gap: 10px;
     }

     .card {
          height: 400px;
          background-color: rgba(83, 78, 78, 0.7);
          padding: 10px;
          color: white;
          border-radius: 5%;
     }

     @media only screen and (max-width: 1140px) {
          #cards {
               grid-template-columns: 1fr 1fr;
          }
     }

     @media only screen and (max-width: 720px) {
          #cards {
               grid-template-columns: 1fr;
          }
     }
</style>
