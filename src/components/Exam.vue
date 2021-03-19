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

          <div class="ExamType" id="Identification">
              <h2>Identification</h2>
              <div>
                    <label>Question</label>
                    <textarea id="IdentAnswer" name="IdentAnswer" rows="4" cols="50"></textarea><br>
                    <label for="Answer">Answer)</label>
                      <input type="text" id="Anwer" name="Answer"><br><br>
                      <input type="Submit" value="submit">
              </div> 

              <div class="ExamType"  id="Multiple choice">
                  <h2>Multiple Choice</h2>
                  <div>
                      <label>Question</label>
                      <textarea id="IdentAnswer" name="IdentAnswer" rows="4" cols="50"></textarea><br>
                      <label for="A">A)</label>
                      <input type="text" id="A" name="A"><br>
                      <label for="B">B)</label>
                      <input type="text" id="B" name="B"><br>
                      <label for="C">C)</label>
                      <input type="text" id="C" name="C"><br>
                      <label for="D">D)</label>
                      <input type="text" id="D" name="D"><br>
                      <input type="Submit" value="submit">
                  </div>

              </div>
              <div class="ExamType"  id="Essay">
                    <h2>Essay</h2>
                    <div>
                        <label>Question</label>
                        <textarea id="EssAnswer" name="EssAnswer" rows="4" cols="50"></textarea><br>
                        <input type="Submit" value="submit">
                    </div>
            </div>
                
          </div>
    </div>

</template>

<style scoped>
    @import "./styles/Exam.css";
    </style>