<template>
  <div>
  <header>
    <ul>
      <li class="float">
        <div><img src="https://i.imgur.com/qO1REGc.png" width="85" height="85" /></div>
      </li>
      <li class="float">
        <h1>Lyceum of Subic Bay</h1>
        <h4>College of Engineering</h4>
      </li>
    </ul>
  </header>
  
  <div class="grid">
    <div class="row">
      <div class="col-sm-6">
    <!-- students-->
       <div id="sidePanel">
        <h2>Student</h2>
        <h2>Student No.</h2>
        <div>
          <ul class="dabid" v-for="(list, index) in lists" :key="index">
            <li id="lname"><br><br>{{ list.name }}</li>
          </ul>
        </div>

      </div>
    </div>
  <!--subjects-->
  <div class="col-sm-6" id="Ssubjects">
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
  
        <div class="container" id="termcontainer">
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
        <input type="text" id="extra" value="0" onkeyup="setGrades();" />
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

      <button type="button" class="btn btn-primary" style="background-color: maroon;">Primary</button>
    </div>
  </div>
</div>
</div>
</div>
</template>
 
<script>
  import app from "./scripts/main";
  export default app;
  </script>
  
  <style scoped>
  @import "./styles/master.css";
  </style>
  

