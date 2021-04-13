<template>
     <div>
          <b-button-close></b-button-close>
          <div class="Essay unselected">
               <img :src="imgurl" alt="" />
               <br />
               <textarea
                    @keydown="preventCopy"
                    @copy.prevent
                    @paste.prevent
                    v-model="essay.student_answer"
                    name=""
                    id=""
                    cols="94"
                    rows="1"
               ></textarea>
          </div>
     </div>
</template>
<script>
     export default {
          props: ['essay'],

          data() {
               return {
                    imgurl: '',
               }
          },

          methods: {
               preventCopy(e) {
                    return e
               },
          },

          mounted() {
               var canvas = document.createElement('canvas')
               canvas.width = 620
               canvas.height = 80
               var ctx = canvas.getContext('2d')
               ctx.font = '30px Arial'
               var text = this.essay.question
               ctx.fillText(text, 10, 50)
               var img = document.createElement('img')
               img.src = canvas.toDataURL()
               this.imgurl = img.src

               //$("body").append(canvas);
          },
     }
</script>
<style scoped>
     @import './styles/ExamForm.css';
</style>
