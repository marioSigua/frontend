<template>
     <div class="">
          <div class="ExamType" id="Essay">
               <b-button-close
                    @click="parent.splice(parent.indexOf(essayValues), 1)"
               ></b-button-close>
               <h2>Essay</h2>
               <label for="Topic">Topic: </label>
               <input type="text" />
               <div class="textset">
                    <div>
                         <b-card no-body>
                              <b-tabs card class="ExamType">
                                   <b-tab title="Text" active>
                                        <b-card-text>
                                             <p class="tabt">Question:</p>
                                             <textarea
                                                  v-model="
                                                       essayValues.question_text
                                                  "
                                                  id="EssAnswer"
                                                  name="EssAnswer"
                                                  rows="4"
                                                  cols="50"
                                             ></textarea>
                                        </b-card-text>
                                   </b-tab>

                                   <b-tab title="Upload Image">
                                        <b-card-text>
                                             <p class="tabt">Question:</p>
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
                                                  :src="
                                                       imgUrl
                                                            ? imgUrl
                                                            : 'https://i.imgur.com/bCOd9N0.jpg'
                                                  "
                                                  alt="Placeholder image"
                                                  @click="$refs.file.click()"
                                             />

                                             <span class="danger">
                                                  {{ error }}
                                             </span>
                                        </b-card-text>
                                   </b-tab>
                              </b-tabs>
                         </b-card>
                    </div>

                    <br />
               </div>
          </div>
     </div>
</template>

<script>
     export default {
          props: ['essayValues', 'parent'],

          data() {
               return { imgUrl: null, imgResponse: null, error: '' }
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
                    let imgFormats = ['jpg', 'jpeg', 'png', 'PNG']
                    const file = e.target.files[0]
                    let fileFormat = file.name.split('.')[1]

                    if (!file) {
                         e.preventDefault()
                         return
                    }

                    if (!imgFormats.includes(fileFormat)) {
                         e.preventDefault()
                         this.error =
                              'jpg, jpeg and png are the only file supported'
                         return
                    }

                    if (file.size > 1000 * 1000) {
                         e.preventDefault()
                         this.error = 'Image must be less than 1mb'
                         return
                    }

                    this.error = ''

                    this.imgUrl = URL.createObjectURL(file)

                    this.essayValues.question_image = await this.encodeBase64(
                         file
                    )
               },
          },

          async mounted() {
               if (this.essayValues.question_image) {
                    this.imgResponse = this.essayValues.question_image
               } else {
                    this.imgResponse = 'https://i.imgur.com/SbAMcxP.png'
               }
          },
     }
</script>
