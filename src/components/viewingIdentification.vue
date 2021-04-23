<template>
     <div class="Eform">
          <div class="Term">
               <div class="clr"></div>
               <h1>Identification</h1>
               <h5>Desciption</h5>
          </div>
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