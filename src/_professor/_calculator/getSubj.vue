<template>
  <div class="getSubj">

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
