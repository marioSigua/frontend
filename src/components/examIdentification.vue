<template>
     <div class="ExamType" id="Identification" style="margin: 20px;">
          <b-button-close
               @click="parent.splice(parent.indexOf(identificationValues), 1)"
          ></b-button-close>
          <h2>Identification</h2>

          <label for="Topic">Topic:</label>
          <input type="text" v-model="identificationValues.topic" />
          <!--pts-->
          <b-input-group class="mt-3 pts">
               <template #append>
                    <b-input-group-text
                         ><strong>pts.</strong></b-input-group-text
                    >
               </template>
               <b-form-input
                    v-model="identificationValues.question_score"
               ></b-form-input>
          </b-input-group>
          <!--pts-->

          <div>
               <div>
                    <b-card no-body>
                         <b-tabs card>
                              <b-tab title="Upload Image" active>
                                   <b-card-text>
                                        <p class="tabt">Question:</p>
                                        <img
                                             class="is-rounded"
                                             height="300"
                                             width="300"
                                             :src="
                                                  imgUrl ? imgUrl : imgResponse
                                             "
                                             alt="Placeholder image"
                                             @click="$refs.file.click()"
                                        />
                                        <input
                                             ref="file"
                                             @change="onFileChange"
                                             type="file"
                                             style="display:none"
                                        />
                                   </b-card-text>
                              </b-tab>
                              <b-tab title="Text">
                                   <b-card-text>
                                        <p class="tabt">Question:</p>
                                        <textarea
                                             v-model="
                                                  identificationValues.question_text
                                             "
                                             rows="4"
                                             cols="50"
                                        ></textarea>
                                   </b-card-text>
                              </b-tab>
                         </b-tabs>

                         <span class="danger"> {{ error }}</span>
                    </b-card>
               </div>
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
          props: ['identificationValues', 'parent'],

          data() {
               return {
                    imgUrl: null,
                    imgResponse: null,

                    error: '',
               }
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

                    this.identificationValues.question_image = await this.encodeBase64(
                         file
                    )
               },
          },

          async mounted() {
               if (this.identificationValues.question_image) {
                    this.imgResponse = this.identificationValues.question_image
               } else {
                    this.imgUrl = 'https://i.imgur.com/SbAMcxP.png'
               }
          },
     }
</script>
