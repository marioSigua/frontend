<template>
     <div class="ExamType" id="Multiple choice" style="margin: 20px;">
          <b-button-close></b-button-close>
          <h2>Multiple Choice</h2>
          <label for="Topic">Topic: </label>
          <input type="text" v-model="mcqValues.topic" />
          <div>
               <div>
                    <b-card no-body>
                      <b-tabs card>
                        <b-tab title="Upload Image" active>
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
                              :src="imgUrl ? imgUrl : 'https://i.imgur.com/bCOd9N0.jpg'"
                              alt="Placeholder image"
                              @click="$refs.file.click()"/>
                        </b-tab>
                        <b-tab title="Text">
                          <b-card-text>  
                              <p class="tabt">Question:</p>
                               <textarea
                              v-model="mcqValues.question_text"
                              id="IdentAnswer"
                              name="IdentAnswer"
                              rows="4"
                              cols="50"
                          ></textarea>
                         </b-card-text>
                        </b-tab>
                      </b-tabs>
                    </b-card>
                  </div>
              
             
               ><br />
               <div>
                    <input
                         type="radio"
                         name="frequency"
                         checked="checked"
                         class="circle"
                    />
                    <label for="A">A) </label>
                    <input v-model="mcqValues.choices.a" type="text" /><br />
               </div>
               <div>
                    <input
                         type="radio"
                         name="frequency"
                         checked="checked"
                         class="circle"
                    />
                    <label for="B">B) </label>
                    <input v-model="mcqValues.choices.b" type="text" /><br />
               </div>
               <div>
                    <input
                         type="radio"
                         name="frequency"
                         checked="checked"
                         class="circle"
                    />
                    <label for="C">C) </label>
                    <input v-model="mcqValues.choices.c" type="text" /><br />
               </div>
               <div>
                    <input
                         type="radio"
                         name="frequency"
                         checked="checked"
                         class="circle"
                    />
                    <label for="D">D) </label>
                    <input v-model="mcqValues.choices.d" type="text" /><br />
               </div>
          </div>
     </div>
</template>

<script>
     export default {
          props: ['mcqValues'],

          data() {
               return {
                    imgUrl: null,
                    imgResponse: null,
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

                    this.mcqValues.question_image = await this.encodeBase64(
                         file
                    )
               },
          },

          async mounted() {
               if (this.mcqValues.question_image) {
                    this.imgResponse = new Buffer.from(
                         this.mcqValues.question_image,
                         'base64'
                    )
               }
          },
     }
</script>
