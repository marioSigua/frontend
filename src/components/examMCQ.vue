<template>
      <div class="ExamType" id="Multiple choice">
            <h2>Multiple Choice</h2>
            <div>
                  <label>Question</label>
                  <textarea
                        v-model="mcqValues.question"
                        id="IdentAnswer"
                        name="IdentAnswer"
                        rows="4"
                        cols="50"
                  ></textarea
                  ><br />
                  <label for="A">A)</label>
                  <input
                        v-model="mcqValues.choices.a"
                        type="text"
                        id="A"
                        name="A"
                  /><br />
                  <label for="B">B)</label>
                  <input
                        v-model="mcqValues.choices.b"
                        type="text"
                        id="B"
                        name="B"
                  /><br />
                  <label for="C">C)</label>
                  <input
                        v-model="mcqValues.choices.c"
                        type="text"
                        id="C"
                        name="C"
                  /><br />
                  <label for="D">D)</label>
                  <input
                        v-model="mcqValues.choices.d"
                        type="text"
                        id="D"
                        name="D"
                  /><br />
            </div>
      </div>
</template>

<script>
      export default {
            props: ['mcqValues'],
      }
</script>
