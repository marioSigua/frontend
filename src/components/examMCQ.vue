<template>
      <div class="ExamType" id="Multiple choice">
            <h2>Multiple Choice</h2>
            <div>
                 
                  <p>Question</p>
                  <textarea
                        v-model="mcqValues.question"
                        id="IdentAnswer"
                        name="IdentAnswer"
                        rows="4"
                        cols="50"
                  ></textarea
                  ><br />
                  <div>
                  <input type="radio" name="frequency" checked="checked" class="circle">
                  <label for="A">A) </label>
                  <input
                        v-model="mcqValues.choices.a"
                        type="text"
                        id="A"
                        name="A"
                  /><br />
                  </div>
                  <div>
                  <input type="radio" name="frequency" checked="checked" class="circle">
                  <label for="B">B) </label>
                  <input
                        v-model="mcqValues.choices.b"
                        type="text"
                        id="B"
                        name="B"
                  /><br />
                  </div>
                  <div>
                  <input type="radio" name="frequency" checked="checked" class="circle">
                  <label for="C">C) </label>
                  <input
                        v-model="mcqValues.choices.c"
                        type="text"
                        id="C"
                        name="C"
                  /><br />
                  </div>
                  <div>
                  <input type="radio" name="frequency" checked="checked" class="circle">
                  <label for="D">D) </label>
                  <input
                        v-model="mcqValues.choices.d"
                        type="text"
                        id="D"
                        name="D"
                  /><br />
                  </div>
            </div>
      </div>
</template>

<script>
      export default {
            props: ['mcqValues'],
      }
</script>

