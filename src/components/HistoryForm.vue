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
                  <input />
                  <label for="text">Last Name:</label>
                  <input />
             </div>

            
                
                <div class="Identification">
                    <b-button-close></b-button-close>
                     <img height="20" width="20" :src="imgUrl" alt="" />
                     <br/>
                     <input class="idn"
                     />
                </div>

                                          <!--Student Lisst 2-->
                          <div>
                              <b-button v-b-modal.modal-lg variant="primary">Student List</b-button>
                              <b-modal id="modal-lg" size="md" title="Student List">
                                   <div>
                                    
                                        <b-form-group
                                          label="Select Student"
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
                              </b-modal>

                            </div>
           </div>
         
             
   </template>
   
   <style scoped>
        @import './styles/HistoryForm.css';
   </style>
