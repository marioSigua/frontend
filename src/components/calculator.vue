<template>
    <div> 
          <header>
 
            <ul>
            <li><div><img src="logo.png" width="70" height="70"></div></li>
            <li><h1>Lyceum of Subic Bay</h1><h4>College of Engineering</h4></li>
            </ul>
 
    </header>
    
    <div id="sidePanel">
        <h2>Students</h2>
        <div>
            <ul>
                <li>Names go here</li>
            </ul>
        </div>
    </div>

    <div id="box">
        <h2 style="color: maroon; float: left;">Calculator</h2>
        <div id="sContainer">
            <select name="Subject" id="subject">
                <option value="Emerging Tech">Emerging Technologies</option>
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
            <p>Quiz: <input type="text" onkeypress="isNumber" id="quiz1" value="0" onkeyup="setGrades()"> * <input title="Input percentage in decimal" type="number" value="" onkeyup="setGrades()" id="mulQuiz"></p>
            <p>Total: <input type="number" id="quizTot" value="50" onkeyup="setGrades()"></p>
        </div>
    
        <div class="container">
            <p>Exam: <input type="number" id="exam1" value="0" onkeyup="setGrades()"> * <input title="Input percentage in decimal" type="number" value="" onkeyup="setGrades()" id="mulExam"></p>
            <p>Total: <input type="number" id="examTot" value="100" onkeyup="setGrades()"></p>
        </div>
    
        <div class="container">
            <p>Extra Credit Earned: <input number='number' id='extra' value='0' onkeyup='setGrades();' /> * <input title="Input percentage in decimal" type="number" value="" onkeyup="setGrades()" id="mulExtra"></p>
            <p>Total: <input type="number" id="extraTot" value="10" onkeyup="setGrades()"></p>
        </div>
                
        <div style="padding: 10px;">
            <p style="font-size: 25sp;"><b><u style="color: maroon;">Calculated Grade</u></b></p>
            <p>TOTAL GRADE: <input type='number' id='total' value='0' /></p>
            <p>REMARKS: <input type="text" id="remark" value=""></p>
        </div>
    </div>
</div>

</template>


<style>
* {
    margin: 0%;
    padding: 0%;
}

#box {
    padding: 10px;
    width: 60%;
    height: 40%;
    border: 1px black solid;
    border-radius: 5px;
    margin: 10px;
    margin-left: 40px;
    background-color:#ffffff;
    float: left;
}

.container {
    padding: 10px;
    border-bottom: 1px black solid;
   
}

p {
    padding: 10px;
}
header{
    background-color: maroon;
    padding-bottom: 30px;
    color: white;
    height: 50px;
    display: flex;
    justify-content: left;
    
}

body{
  background-image: linear-gradient(to top, darkgrey,white) !important;
 min-height: 100vh;
}
h4{
    margin-left: 50px;
}

ul li{
    float: left;
}
li{
    list-style-type: none;
}

img{
    margin: auto;
}
h1{
    padding-top: 10px;
}

#sidePanel {
    float: left;
    width: 30%;
    border: 1px black solid;
    border-radius: 5px;
    margin-top: 10px;
    margin-left: 35px;
    background-color:#ffffff;
}

#sContainer{
    display: block;
    text-align: right;
    padding: 5px;
}
</style>