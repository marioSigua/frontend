<template>
      <div class="">
            <div class="ExamType" id="Essay">
                 <b-button-close></b-button-close>
                  <h2>Essay</h2>
                  <div class="textset">
                        <p>Question</p>
                        <textarea
                              v-model="essayValues.question"
                              id="EssAnswer"
                              name="EssAnswer"
                              rows="4"
                              cols="50"
                        ></textarea
                        ><br />
                        <!-- <input
                              v-model="essayValues.student_input"
                              type="Submit"
                              value="submit"
                        /> -->
                  </div>
          
            </div>
      </div>
</template>

<script>
      export default {
            props: ['essayValues'],

            data() {
                  return {}
            },

            mounted() {},
      }
</script>

