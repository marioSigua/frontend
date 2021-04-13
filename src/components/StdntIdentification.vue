xam<template>
     <div>
          <b-button-close></b-button-close>
          <div class="Identification">
               <img :src="imgUrl" alt="" />
               <br />
               <input
                    v-model="identi.student_answer"
                    @keydown="preventCopy"
                    @copy.prevent
                    @paste.prevent
                    type="text"
                    class="idn"
               />
          </div>
     </div>
</template>

<script>
     export default {
          props: ['identi'],

          data() {
               return {
                    imgUrl: '',
               }
          },

          methods: {
               preventCopy(e) {
                    return e
               },
          },

          mounted() {
               var canvas = document.createElement('canvas')

               canvas.width = 1000
               canvas.height = 200
               let lineHeight = 30
               var ctx = canvas.getContext('2d')
               ctx.font = '30px Arial'
               var text = this.identi.question
               let lines = text.split('\n')
               console.log(lines)
               for (let i = 0; i < lines.length; i++) {
                    ctx.fillText(lines[i] + '\n', 10, 20 + i * lineHeight)
               }

               var img = document.createElement('img')
               img.src = canvas.toDataURL()
               this.imgUrl = img.src
          },
     }
</script>

<style scoped>
     @import './styles/ExamForm.css';
</style>
