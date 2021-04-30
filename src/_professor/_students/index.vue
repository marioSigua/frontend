<template lang="html">
  <div class="backdrop">
    <div class="subjects" @click="hide = !hide">
      Subject
    </div>

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
};
</script>

<style lang="css" scoped>
.subjects {
  margin: 10px;
  border-radius: 10px;
  text-align: center;
  font-size: 30px;
  padding: 10px;
  background: rgba(0, 0, 0, 0.7);
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
