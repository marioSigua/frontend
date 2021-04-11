<template>
  <div class="Eform">

                    <div class="Term">
                        <div class="clr"></div>
                        <h1>Untitled form</h1>
                        <h5>Desciption</h5>
                    </div>  

                    <div class="Term">
                      <div class="Info"></div>
                      <label for="text">First Name:</label>
                      <input>
                      <label for="text">Last Name:</label>
                      <input>
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
                    <div class="btnx">
                      <b-button variant="primary" class="submit">Submit</b-button>
                    </div>
                    
  </div>

               
</template>

<style scoped>
    @import './styles/ExamForm.css';
</style>
