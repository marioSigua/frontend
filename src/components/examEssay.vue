<template>
      <div class="">
            <div class="ExamType" id="Essay">
                  <h2>Essay</h2>
                  <div>
                        <label>Question</label>
                        <textarea
                              v-model="essayValues.question"
                              id="EssAnswer"
                              name="EssAnswer"
                              rows="4"
                              cols="50"
                        ></textarea
                        ><br />
                        <input
                              v-model="essayValues.answer"
                              type="Submit"
                              value="submit"
                        />
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
