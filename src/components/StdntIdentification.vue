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

               wrapText: function(context, text, x, y, maxWidth, lineHeight) {
                    var words = text
                    var line = ''
                    for (var n = 0; n < words.length; n++) {
                         var testLine = line + words[n] + ' '
                         var metrics = context.measureText(testLine)

                         var testWidth = metrics.width
                         if (testWidth > maxWidth && n > 0) {
                              context.fillText(line, x, y)
                              line = words[n] + ' '
                              y += lineHeight
                         } else {
                              line = testLine
                         }
                    }
                    context.fillText(line, x, y)
               },

               fragmentText: function(text, maxWidth, ctx) {
                    var words = text.split(' '),
                         lines = [],
                         line = ''
                    if (ctx.measureText(text).width < maxWidth) {
                         return [text]
                    }
                    while (words.length > 0) {
                         while (ctx.measureText(words[0]).width >= maxWidth) {
                              var tmp = words[0]
                              words[0] = tmp.slice(0, -1)
                              if (words.length > 1) {
                                   words[1] = tmp.slice(-1) + words[1]
                              } else {
                                   words.push(tmp.slice(-1))
                              }
                         }
                         if (
                              ctx.measureText(line + words[0]).width < maxWidth
                         ) {
                              line += words.shift() + ' '
                         } else {
                              lines.push(line)
                              line = ''
                         }
                         if (words.length === 0) {
                              lines.push(line)
                         }
                    }
                    return lines
               },
          },

          mounted() {
               var canvas = document.createElement('canvas')
               var ctx = canvas.getContext('2d')
               canvas.width = 600
               canvas.height = 250

               // //spacing between words in row
               let lineHeight = 30
               ctx.font = '16px Arial'

               let lines = this.fragmentText(this.identi.question, 500, ctx)
               for (let i = 0; i < lines.length; i++) {
                    ctx.fillText(lines[i] + '\n', 10, 20 + i * lineHeight)
               }

               this.imgUrl = canvas.toDataURL()
          },
     }
</script>

<style scoped>
     @import './styles/ExamForm.css';
</style>
