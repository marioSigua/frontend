<template>
     <div class="ExamType" id="Identification">
          <b-button-close></b-button-close>
          <h2>Identification</h2>
          <label for="Topic">Topic: </label>
          <input type="text" v-model="identificationValues.topic" />
          <div>
               <p>Question</p>
               <input
                    ref="file"
                    @change="onFileChange"
                    type="file"
                    style="display:none"
               />
               <img
                    class="is-rounded"
                    :src="imgUrl ? imgUrl : 'https://i.imgur.com/bCOd9N0.jpg'"
                    alt="Placeholder image"
                    @click="$refs.file.click()"
               />
               <!-- <textarea
                    v-model="identificationValues.question"
                    rows="4"
                    cols="50"
               ></textarea> -->
               <br />
               <label for="Answer">Answer </label>
               <input
                    v-model="identificationValues.form_answer"
                    type="text"
               /><br /><br />
          </div>
     </div>
</template>

<script>
     export default {
          props: ['identificationValues'],

          data() {
               return {
                    imgUrl: null,
               }
          },

          methods: {
               // addNewLine() {
               //      let splitQuestion = this.identificationValues.question.split(
               //           ' '
               //      )
               //      if (splitQuestion.length % 12 === 0) {
               //           splitQuestion.push('\n')
               //           this.identificationValues.question = splitQuestion.join(
               //                ' '
               //           )
               //      }
               // },

               encodeBase64(file) {
                    return new Promise((resolve, reject) => {
                         const reader = new FileReader()
                         reader.readAsDataURL(file)
                         reader.onload = () => resolve(reader.result)
                         reader.onerror = (error) => reject(error)
                    })
               },

               async onFileChange(e) {
                    let imgFormats = ['jpg', 'jpeg', 'png']
                    const file = e.target.files[0]
                    if (!file) {
                         e.preventDefault()
                         return
                    }
                    if (file.size > 1000 * 1000) {
                         e.preventDefault()
                         this.profileError.image = 'Image must be less than 1mb'
                         return
                    }
                    let fileFormat = file.name.split('.')[1]
                    if (!imgFormats.includes(fileFormat)) {
                         e.preventDefault()
                         this.profileError.image =
                              'jpg, jpeg and png are the only file supported'
                         return
                    }

                    // let obj = {
                    //      lastModified: file.lastModified,
                    //      lastModifiedDate: file.lastModifiedDate,
                    //      name: file.name,
                    //      size: file.size,
                    //      type: file.type,
                    // }
                    this.imgUrl = URL.createObjectURL(file)
                    // let blob = new Blob([file], { type: 'image/png' })
                    // let base64 = await this.encodeBase64(blob)
                    this.identificationValues.question = await this.encodeBase64(
                         file
                    )
               },
          },
     }
</script>
