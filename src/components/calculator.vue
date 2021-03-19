<template>
  <div>
    <header>
      <ul>
        <li>
          <div><img src="logo.png" width="70" height="70" /></div>
        </li>
        <li>
          <h1>Lyceum of Subic Bay</h1>
          <h4>College of Engineering</h4>
        </li>
      </ul>
    </header>

    <div id="sidePanel">
      <h2>Students</h2>
      <div>
        <ul v-for="(list, index) in lists" :key="index">
          <li>{{ list.name }}</li>
        </ul>
      </div>
    </div>

    <div id="box">
      <h2 style="color: maroon; float: left;">Calculator</h2>
      <div id="sContainer">
        <select name="Subject" id="subjects" v-model="selectedSubject">
          <option value="">Select Subject</option>
          <option v-for="(category, index) in selectSubj" :key="index">
            {{ category.name }}
          </option>
        </select>
      </div>

      <div class="container">
        <label for="name">Select Term:</label>
        <select v-model="selectedTerm">
          <option value="">Select Term</option>
          <option v-for="(category, index) in selectTerm" :key="index">
            {{ category.name }}
          </option>
        </select>
      </div>

      <div class="container">
        <p>
          Quiz:
          <input v-model="quiz" />
          *
          <input v-model="tQuiz" />
        </p>
        <p>
          Total:
          <input v-model="mQuiz" />
        </p>
      </div>

      <div class="container">
        <p>
          Exam:
          <input v-model="exam" />
          *
          <input v-model="tExam" />
        </p>
        <p>
          Total:
          <input v-model="mExam" />
        </p>
      </div>

      <div class="container">
        <p>
          Extra:
          <input v-model="extra" />
          *
          <input v-model="tExtra" />
        </p>
        <p>
          Total:
          <input v-model="mExtra" />
        </p>
      </div>

      <div style="padding: 10px;">
        <p style="font-size: 25sp;">
          <b><u style="color: maroon;">Calculated Grade</u></b>
        </p>

        <p>TOTAL GRADE: <input :value="calculateGrade" /></p>
        <p>REMARKS: <input type="text" id="remark" value="" /></p>
      </div>

      <button type="button" class="btn btn-primary">Primary</button>
    </div>
  </div>
</template>

<script>
  import app from './scripts/main'
  export default app
</script>

<style>
  @import './styles/master.css';
</style>
