<template lang="html">
  <main>
    <nav>
      <img src="@/assets/logo.png" id="logo" alt="" /> Lyceum
      <router-link :to="{ name: 'home', params: {} }">
        Home
      </router-link>
      <router-link :to="{ name: 'exam', params: {} }">
        Exam
      </router-link>
      <router-link :to="{ name: 'calculator', params: {} }">
        Calculator
      </router-link>
      <button @click="$store.commit('resetState')">Logout</button>
    </nav>
    <router-view />
  </main>
</template>

<script>
export default {};
</script>

<style lang="css" scoped>
button {
  margin-right: 10px;
  position: absolute;
  right: 0;
}

nav {
  padding: 10px;

  color: white;
  font-size: 17px;
  font-weight: bold;

  background-color: rgb(143,32,29);

  position: sticky;
  top: 0;
  z-index: 3;
}

nav a {
  color: inherit;
  padding: 10px;
}

#logo {
  height: 50px;
}

.router-link-exact-active {
  background: rgba(0, 0, 0, 0.3);
}
</style>
