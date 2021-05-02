<template lang="html">
  <div class="backdrop">
    <div class="subjects" @click="hide = !hide">
      Subject
    </div>

    <div :hide="hide" id="collapse">
      <table>
        <tr>
          <th>Student ID</th>
          <th>Last Name</th>
          <th>First Name</th>
          <th>Course</th>
          <th>Prelim</th>
          <th>Midterm</th>
          <th>Finals</th>
          <th>GWA</th>
          <th>Remarks</th>
          <th>Drop</th>
        </tr>
        <tr>
          <td>2015020055</td>
          <td>Gorospe</td>
          <td>Vincent</td>
          <td>BSCOE</td>
          <td>75</td>
          <td>76</td>
          <td>99</td>
          <td>77</td>
          <td>Passed</td>
          <td><button>Drop</button></td>
        </tr>
        <tr>
          <td>2014021156</td>
          <td>Argarin</td>
          <td>David</td>
          <td>BSCOE</td>
          <td>99</td>
          <td>85</td>
          <td>62</td>
          <td>76</td>
          <td>Passed</td>
          <td><button>Drop</button></td>
        </tr>
      </table>
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

table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
  color: black;
}
</style>
