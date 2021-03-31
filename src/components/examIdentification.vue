<template>
  <div class="ExamType" id="Identification">
    <h2>Identification</h2>
    <div>
      <label>Question</label>
      <textarea
        v-model="identificationValues.question"
        id="IdentAnswer"
        name="IdentAnswer"
        rows="4"
        cols="50"
      ></textarea
      ><br />
      <label for="Answer">Answer)</label>
      <input
        v-model="identificationValues.student_input"
        type="text"
        id="Answer"
        name="Answer"
      /><br /><br />
    </div>
  </div>
</template>

<script>
export default {
  props: ["identificationValues"],
};
</script>
