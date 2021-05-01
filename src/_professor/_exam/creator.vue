<template lang="html">
  <div>
    <div class="selection">
      <select>
        <option value="">-- Select Term --</option>
      </select>
      <select>
        <option value="">-- Select Subject --</option>
      </select>
      <button type="button" @click="$router.push({ name: 'history' })">
        History
      </button>
      <button @click="importQuestion">Import Question</button>
    </div>
    <br />

    <ul>
      <li v-for="(question, q) in questions" :key="q" class="backdrop">
        <button id="remove" @click="remove(q)">Remove</button>
        <div v-if="question.type == 'essay'">
          <h3>Essay</h3>

          <div>
            <input class="ptsInput" />
            <span>pts</span>
          </div>

          <textarea></textarea>
        </div>
        <div v-else-if="question.type == 'identification'">
          <h3>Identification</h3>

          <div class="topic">
            <label for="Topic">Topic:</label>
            <input type="text" />
          </div>

          <div>
            <input class="ptsInput" />
            <span>pts</span>
          </div>

          Question
          <div class="wrapper">
            <tabs :mode="mode">
              <tab title="Text"><textarea></textarea></tab>
              <tab title="Image">
                <input
                  ref="file"
                  @change="onFileChange"
                  type="file"
                  style="display:none"
                />
                <img
                  class="is-rounded"
                  height="300"
                  width="300"
                  :src="imgUrl ? imgUrl : 'https://i.imgur.com/bCOd9N0.jpg'"
                  alt="Placeholder image"
                  @click="$refs.file.click()"
                />
                <span class="danger">
                  {{ error }}
                </span>
              </tab>
            </tabs>
          </div>
          Answer
          <input type="text" name="" value="" />
        </div>
        <div v-else>
          <h3>Multiple Choice</h3>

          <div class="topic">
            <label for="Topic">Topic:</label>
            <input type="text" />
          </div>

          <div>
            <input class="ptsInput" />
            <span>pts</span>
          </div>

          Question
          <div class="wrapper">
            <tabs :mode="mode">
              <tab title="Text"><textarea></textarea></tab>
              <tab title="Image">
                <input
                  ref="file"
                  @change="onFileChange"
                  type="file"
                  style="display:none"
                />
                <img
                  class="is-rounded"
                  height="300"
                  width="300"
                  :src="imgUrl ? imgUrl : 'https://i.imgur.com/bCOd9N0.jpg'"
                  alt="Placeholder image"
                  @click="$refs.file.click()"
                />
                <span class="danger">
                  {{ error }}
                </span>
              </tab>
            </tabs>
          </div>

          Answer
          <input type="text" name="" value="" />
          Choices:
          <input type="text" name="" value="" />
          <input type="text" name="" value="" />
          <input type="text" name="" value="" />
        </div>
      </li>
    </ul>

    <div class="selection">
      <select v-model="newItem">
        <option value="">-- New Item --</option>
        <option value="essay">Essay</option>
        <option value="identification">Identification</option>
        <option value="mcq">Multiple Choice</option>
      </select>
      <button type="button" @click="add">Add</button>

      <div></div>
      <button type="button" name="button">Create Form</button>
    </div>
  </div>
</template>

<script>
import Tab from "../_tabs/tab";
import Tabs from "../_tabs/tabs";

export default {
  components: {
    Tab,
    Tabs,
  },

  data() {
    return {
      newItem: "",
      questions: [],
    };
  },
  methods: {
    add() {
      switch (this.newItem) {
        case "essay":
          this.questions.push({ type: "essay" });
          break;
        case "identification":
          this.questions.push({ type: "identification" });
          break;
        case "mcq":
          this.questions.push({ type: "mcq" });
          break;
        default:
          alert("Please select a type");
      }
      this.newItem = "";
    },
    remove(s) {
      this.questions = this.questions.filter((v, i) => {
        return !(i == s);
      });
    },
    append(item) {
      this.questions.push(item);
    },
    importQuestion() {
      this.$emit("import");
    },

    encodeBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    },

    async onFileChange(e) {
      let imgFormats = ["jpg", "jpeg", "png", "PNG"];
      const file = e.target.files[0];
      let fileFormat = file.name.split(".")[1];

      if (!file) {
        e.preventDefault();
        return;
      }

      if (!imgFormats.includes(fileFormat)) {
        e.preventDefault();
        this.error = "jpg, jpeg and png are the only file supported";
        return;
      }

      if (file.size > 1000 * 1000) {
        e.preventDefault();
        this.error = "Image must be less than 1mb";
        return;
      }

      this.error = "";

      this.imgUrl = URL.createObjectURL(file);

      this.essayValues.question_image = await this.encodeBase64(file);
    },
  },
};
</script>

<style lang="css" scoped>
.topic {
  width: 40%;
  margin-bottom: 10px;
}

span {
  padding: 10px;
}

.ptsInput {
  max-width: 50px;
  max-height: 50px;
  padding: 10px;
}

.selection {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 10px;
}

#remove {
  float: right;
}
#remove:hover {
  background: rgba(255, 0, 0, 0.4);
}

h3 {
  padding-bottom: 10px;
}

ul {
  list-style-type: none;
}

li {
  padding: 10px;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 10px;
  margin: 10px auto;
}

textarea,
input {
  padding: 10px;
  border: 1px solid #aaa;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.3);
  color: white;
  font-family: inherit;
  font-size: inherit;
  width: 100%;
  margin-bottom: 5px;
}
</style>
