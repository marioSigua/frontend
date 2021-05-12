<template lang="html">
  <div class="backdrop" id="add">
    <button type="button" name="button" @click="hide = !hide">
      + Select Subject
    </button>

    <div :hide="hide" id="collapse">
      <label for="name">Subject Name</label>
      <AutoComplete
        :suggestions="subjectList"
        :selection="loaddata"
        :needs="fill"
      />

      <label for="name">Subject Code</label>
      <input
        type="text"
        v-model="fill.subject_code"
        name="name"
        value=""
        disabled
      />

      <label for="name">Subject Course</label>
      <input
        type="text"
        v-model="fill.subject_course"
        name="name"
        value=""
        disabled
      />

      <label for="desc">Subject Desc</label>
      <input
        type="text"
        v-model="fill.subject_desc"
        name="desc"
        value=""
        disabled
      />

      <label for="name">Semester</label>
      <input
        type="text"
        v-model="fill.subject_sem"
        name="sem"
        value=""
        disabled
      />
      <!-- <select class="" name="">
                    <option v-for="(sem, s) in sems" :key="s">{{ sem }}</option>
               </select> -->

      <label for="name">Year</label>
      <input
        type="text"
        v-model="fill.subject_year"
        name="year"
        value=""
        disabled
      />

      <label for="name">Section</label>
      <input
        type="text"
      />
      <!-- <select class="" name="">
                    <option v-for="(year, y) in years" :key="y">{{
                         year
                    }}</option>
               </select> -->

      <button type="button" @click="addSubject" name="button">
        Add
      </button>
    </div>
  </div>
</template>

<script>
import AutoComplete from "@/_professor/AutoComplete";

export default {
  components: {
    AutoComplete,
  },

  data() {
    return {
      hide: true,

      loaddata: "",
      subjectList: [],

      fill: {
        subject_code: "",
        subject_course: "",

        subject_year: "",
        subject_sem: "",
        subject_desc: "",
      },
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

  methods: {
    async addSubject() {
      const { status } = await this.$axios.patch(
        `${this.$store.state.BASE_URL}/add/prof/subjects`,
        { subject_code: this.fill.subject_code },
        {
          headers: {
            Authorization: this.$store.getters.isLoggedIn,
          },
        }
      );

      if (status === 200) {
        window.location.reload();
      }
    },
  },

  mounted() {
    this.$store
      .dispatch("getSubjects")
      .then((result) => {
        this.subjectList = result;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style lang="css" scoped>
button {
  margin-top: 10px;
}

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
