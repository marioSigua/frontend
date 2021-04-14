xam<template>
     <div>
          <b-button-close></b-button-close>
          <div class="Identification">
               <img height="500" width="500" :src="imgUrl" alt="" />
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
                    imgUrl: null,
               }
          },

          methods: {
               preventCopy(e) {
                    return e
               },

               encodeBase64(file) {
                    return new Promise((resolve, reject) => {
                         const reader = new FileReader()
                         reader.readAsDataURL(file)
                         reader.onload = () => resolve(reader.result)
                         reader.onerror = (error) => reject(error)
                    })
               },

               imageToDataURL: function(image) {
                    const canvas = document.createElement('canvas')
                    const context = canvas.getContext('2d')
                    context.drawImage(image, image.width, image.height)
                    return canvas.toDataURL('image/png')
               },
          },

          async mounted() {
               this.imgUrl = this.identi.question
          },
     }
</script>

<style scoped>
     @import './styles/ExamForm.css';
</style>
