<template lang="html">
  <div class="backdrop" id="add">
    <button type="button" name="button" @click="hide = !hide">
      + Add Subject
    </button>

    <div :hide="hide" id="collapse">
      <label for="name">Subject Name</label>
      <input type="text" name="name" value="" />

      <label for="name">Subject Code</label>
      <input type="text" name="name" value="" />

      <label for="name">Subject Course</label>
      <input type="text" name="name" value="" />

      <label for="desc">Subject Desc</label>
      <input type="text" name="desc" value="" />

      <label for="name">Semester</label>
      <select class="" name="">
        <option v-for="(sem, s) in sems" :key="s">{{ sem }}</option>
      </select>

      <label for="name">Year</label>
      <select class="" name="">
        <option v-for="(year, y) in years" :key="y">{{ year }}</option>
      </select>

      <button type="button" name="button">Add</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hide: true,
    };
  },

  // Computed
  // Computed
  // Computed
  // Computed
  computed: {
    years() {
      return [2019, 2020, 2021];
    },
    sems() {
      return ["1st Sem", "2nd Sem"];
    },
  },
};
</script>

<style lang="css" scoped>
#add {
  max-width: 500px;
  padding: 10px;
}

#collapse {
  height: auto;
  overflow: hidden;
  transition: 0.3s height;
}
#collapse[hide] {
  height: 0;
}
</style>
