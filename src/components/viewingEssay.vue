<template>
     <div class="Eform">
          <div class="Term">
               <div class="clr"></div>
               <h1>Essay</h1>
               <h5>Desciption</h5>
          </div>
               <!--pts-->
               <b-input-group class="mt-3 pts">
                    <template #append>
                      <b-input-group-text><strong>pts.</strong></b-input-group-text>
                    </template>
                    <b-form-input></b-form-input>
                  </b-input-group>
               <!--pts-->

          <div class="btnx" v-if="checkRoute">
               <b-button
                    @click="createStudentForm"
                    variant="primary"
                    class="submit"
                    >Submit</b-button
               >
          </div>
          
     </div>
</template>

<script>
     import app from './scripts/examform'
     export default app
</script>