<template lang="html">
  <div :class="{ tabs__light: mode === 'light' }">
    <ul class="tabs__header">
      <li
        v-for="(tab, index) in tabs"
        :key="tab.title"
        @click="selectTab(index)"
        :class="{ tab__selected: index == selectedIndex }"
      >
        {{ tab.title }}
      </li>
    </ul>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    mode: {
      type: String,
      default: "light",
    },

    body: {
      default() {
        return {
          question: "",
          question_type: "",
          imgUrl: "",
        };
      },
    },
  },

  data() {
    return {
      selectedIndex: 0, // the index of the selected tab,
      tabs: [], // all of the tabs

      // image: this.body.question_image,
      // text: this.body.question_text,
    };
  },
  created() {
    this.tabs = this.$children;
  },
  mounted() {
    // loop over all the tabs
    if (this.body.question_type === "image") {
      this.selectOnMount(1);
    } else {
      this.selectOnMount(0);
    }
  },
  methods: {
    selectTab(i) {
      this.selectedIndex = i;

      // loop over all the tabs
      this.tabs.forEach((tab, index) => {
        tab.isActive = index === i;
      });

      if (this.selectedIndex === 0) {
        this.body.question_type = "text";
        this.body.question = "";
        this.body.imgUrl = "";
      } else {
        this.body.question_type = "image";
        this.body.question = "";
      }
    },

    selectOnMount(i) {
      this.selectedIndex = i;

      // loop over all the tabs
      this.tabs.forEach((tab, index) => {
        tab.isActive = index === i;
      });

      if (this.selectedIndex === 0) {
        this.body.question_type = "text";
      } else {
        this.body.question_type = "image";
      }
    },
  },
};
</script>

<style lang="css">
ul.tabs__header {
  display: block;
  list-style: none;
  margin: 0 0 0 20px;
  padding: 0;
}

ul.tabs__header > li {
  padding: 15px 30px;
  border-radius: 10px;
  margin: 0;
  display: inline-block;
  margin-right: 5px;
  cursor: pointer;
}

ul.tabs__header > li.tab__selected {
  font-weight: bold;
  border-radius: 10px 10px 0 0;
  border-bottom: 8px solid transparent;
}

.tab {
  display: inline-block;
  color: black;
  padding: 20px;
  width: 100%;
  min-width: 400px;
  border-radius: 10px;
  min-height: 100px;
  max-height: auto;
}

.tabs__light .tab {
  background: rgba(0, 0, 0, 0.3);
}

.tabs__light li {
  background: rgba(0, 0, 0, 0.3);
  color: black;
}

.tabs__light li.tab__selected {
  background-color: #555;
  color: white;
}
</style>
