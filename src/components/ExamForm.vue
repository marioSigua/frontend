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

          <div class="btnx">
               <b-button variant="primary" class="submit">Submit</b-button>
          </div>
     </div>
</template>

<script>
     import app from './scripts/examform'
     export default app
</script>

<style scoped>
     @import './styles/ExamForm.css';
</style>
