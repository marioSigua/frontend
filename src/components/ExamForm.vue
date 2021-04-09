<template>
  <div class="Eform">
    <div class="accordion" role="tablist">
      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button block v-b-toggle.accordion-1 variant="info"
            >Student List</b-button
          >
        </b-card-header>
        <b-collapse
          id="accordion-1"
          visible
          accordion="my-accordion"
          role="tabpanel"
        >
          <b-card-body>
            <b-card-text>
                <!--checklist-->
                <div>
                    <b-form-group
                      label="Select Students who will recieve"
                      v-slot="{ ariaDescribedby }"
                    >
                      <b-form-checkbox-group
                        v-model="selected"
                        :options="options"
                        :aria-describedby="ariaDescribedby"
                        name="flavour-2a"
                        stacked
                      ></b-form-checkbox-group>
                    </b-form-group>
                  </div>
                  <!--checklist-->

                  
                  
            </b-card-text>
          </b-card-body>
        </b-collapse>
      </b-card>
    </div>
                    <div class="Term">
                        <div class="clr"></div>
                        <h1>Untitled form</h1>
                        <h5>Desciption</h5>
                    </div>  

                    <div class="MCQ">
                       <div class="ui form">
                        <div class="grouped fields">
                          <label style="font-size: 20px">Sino and pinaka YAWA sa apat?</label>
                          <div class="field">
                            <div class="ui radio checkbox">
                              <input type="radio" name="example2" checked="checked">
                              <label>A. Mario</label>
                            </div>
                          </div>
                          <div class="field">
                            <div class="ui radio checkbox">
                              <input type="radio" name="example2">
                              <label>B. Calil</label>
                            </div>
                          </div>
                          <div class="field">
                            <div class="ui radio checkbox">
                              <input type="radio" name="example2">
                              <label>C. David</label>
                            </div>
                          </div>
                          <div class="field">
                            <div class="ui radio checkbox">
                              <input type="radio" name="example2">
                              <label>D. Vincent</label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>  


                    <div class="Essay">
                        <label>Question for essay</label><br>
                        <textarea name="" id="" cols="94" rows="1"></textarea>
                        
                    </div>  

                    <div class="Identification">
                        <label>Question for Identification</label><br>
                        <input type="text" class="idn">
                        
                    </div>  
  </div>

               
</template>

<script>
    export default {
      data() {
        return {
          selected: [], // Must be an array reference!
          options: [
            { text: 'Argarin David', value: 'orange' },
            { text: 'Sigua Mario', value: 'apple' },
            { text: 'Gorospe Vincent', value: 'pineapple' },
            { text: 'Calil San', value: 'grape' }
          ]
        }
      }
    }
  </script>

<style scoped>
    @import './styles/ExamForm.css';
</style>
