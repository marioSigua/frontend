<template>
  <div class="sList">
    <h4>Students</h4>
    <ul>
      <li><br />{{ firstname + " " + lastname }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    firstname: {
      default() {
        return "juan";
      },
    },
    lastname: {
      default() {
        return "tamad";
      },
    },
  },
};
</script>

<style scoped>
li {
  list-style-type: none;
}
</style>
