<template>
  <div class="getSubj">
    <select>
      <option value="">
        {{ subject_name }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    subject_name: {
      default() {
        return "Thesis";
      },
    },
  },
};
</script>

<style scoped></style>
