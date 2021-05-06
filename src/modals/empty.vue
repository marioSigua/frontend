<template lang="html">
  <transition name="fade">
    <div class="modal" v-if="show">
      <div class="close backdrop" @click="close"></div>
      <div class="window">
        <header>
          <h2>
            <slot name="header" />
          </h2>
        </header>
        <div class="">
          <slot name="body" />
        </div>
        <footer>
          <slot name="footer" />
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      show: false,
    };
  },

  methods: {
    open() {
      this.show = true;
    },
    close() {
      this.show = false;
    },
  },
};
</script>

<style lang="css" scoped>
.modal {
  display: block;
  position: absolute;

  height: 100vh;
  width: 100vw;

  overflow-y: auto;

  z-index: 4;
}

.close {
  position: absolute;

  height: 100vh;
  width: 100vw;

  background: rgba(0, 0, 0, 0.3);

  z-index: 5;
}

.window {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  margin: 100px auto;
  padding: 10px;

  border-radius: 10px;

  height: 800px;
  width: 800px;

  background: white;
  color: black;

  z-index: 6;
  overflow: scroll;
}
</style>
