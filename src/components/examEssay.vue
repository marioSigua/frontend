<template>
     <div class="">
          <div class="ExamType" id="Essay">
               <b-button-close></b-button-close>
               <h2>Essay</h2>
               <div class="textset">
                    <p>Question</p>
                    <input
                         ref="file"
                         @change="onFileChange"
                         type="file"
                         style="display:none"
                    />
                    <img
                         class="is-rounded"
                         height="300"
                         width="300"
                         :src="imgUrl ? imgUrl : imgResponse"
                         alt="Placeholder image"
                         @click="$refs.file.click()"
                    />
                    <!-- <textarea
                              v-model="essayValues.question_text"
                              id="EssAnswer"
                              name="EssAnswer"
                              rows="4"
                              cols="50"
                        ></textarea -->
                    ><br />
               </div>
          </div>
     </div>
</template>

<script>
     export default {
          props: ['essayValues'],

          data() {
               return { imgUrl: null, imgResponse: null }
          },

          methods: {
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

                    this.imgUrl = URL.createObjectURL(file)

                    this.essayValues.question_image = await this.encodeBase64(
                         file
                    )
               },
          },

          async mounted() {
               if (this.essayValues.question_image) {
                    this.imgResponse = await this.encodeBase64(
                         this.essayValues.question_image
                    )
               } else {
                    this.imgResponse = 'https://i.imgur.com/SbAMcxP.png'
               }
          },
     }
</script>
