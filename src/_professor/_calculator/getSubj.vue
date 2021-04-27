<template>
  <div class="getSubj">
    <label for="name">Select Subject:</label>
    <select v-model="select" @change="getSubjectCode(select)">
      <option value="">Select Subject</option>
      <option
        v-for="(category, index) in subjectList"
        :key="index"
        :value="category.subject_code"
      >
        {{ category.subject_name }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    subjectList: Array,
    selected: String,
  },

  data() {
    return {
      select: this.selected,
    };
  },

  methods: {
    getSubjectCode(code) {
      this.$store.dispatch("getStudents", code);
    },
  },
};
</script>

<style scoped></style>
