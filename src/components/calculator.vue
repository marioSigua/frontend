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
          <option v-for="(category, index) in selectSubj" :key="index">{{
            category.name
          }}</option>
        </select>
      </div>

      <div class="container">
        <label for="name">Select Term:</label>
        <select name="Term" id="terms">
          <option value="Prelims">Prelims</option>
          <option value="Midterm">Midterm</option>
          <option value="Finals">Finals</option>
        </select>
      </div>

      <div class="container">
        <p>
          Quiz:
          <input
            type="text"
            onkeypress="isNumber"
            id="quiz1"
            value="0"
            onkeyup="setGrades()"
          />
          *
          <input
            title="Input percentage in decimal"
            type="text"
            value=""
            onkeyup="setGrades()"
            id="mulQuiz"
          />
        </p>
        <p>
          Total:
          <input type="text" id="quizTot" value="50" onkeyup="setGrades()" />
        </p>
      </div>

      <div class="container">
        <p>
          Exam:
          <input type="text" id="exam1" value="0" onkeyup="setGrades()" /> *
          <input
            title="Input percentage in decimal"
            type="text"
            value=""
            onkeyup="setGrades()"
            id="mulExam"
          />
        </p>
        <p>
          Total:
          <input type="text" id="examTot" value="100" onkeyup="setGrades()" />
        </p>
      </div>

      <div class="container">
        <p>
          Extra Credit Earned:
          <input text="text" id="extra" value="0" onkeyup="setGrades();" />
          *
          <input
            title="Input percentage in decimal"
            type="text"
            value=""
            onkeyup="setGrades()"
            id="mulExtra"
          />
        </p>
        <p>
          Total:
          <input type="text" id="extraTot" value="10" onkeyup="setGrades()" />
        </p>
      </div>

      <div style="padding: 10px;">
        <p style="font-size: 25sp;">
          <b><u style="color: maroon;">Calculated Grade</u></b>
        </p>
        <p>TOTAL GRADE: <input type="text" id="total" value="0" /></p>
        <p>REMARKS: <input type="text" id="remark" value="" /></p>
      </div>
    </div>
  </div>
</template>

<script>
import app from "./scripts/main";
export default app;
</script>

<style>
@import "./styles/master.css";
</style>
