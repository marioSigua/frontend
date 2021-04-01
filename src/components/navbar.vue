<template>
  <nav
    class="navbar navbar-expand-lg navbar-light textH "
    style="background-color: #8F8475;"
  >
    <div class="container-fluid">
      <a
        ><img src="https://i.imgur.com/qO1REGc.png" height="50px" width="50px"
      /></a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li class="nav-item" href="#">
            <a
              class="nav-link"
              aria-current="page"
              href="#"
              style="color: white;"
              >Lyceum</a
            >
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              href="#"
              style="color: white;"
              to="/auth/home"
              >Home</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              href="#"
              style="color: white;"
              to="/auth/exam"
              >Exam</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              href="#"
              style="color: white;"
              to="/auth/calculator"
              >Calculator</router-link
            >
          </li>
        </ul>
      </div>
    </div>

    <div>
      <b-dropdown
        id="dropdown-account"
        text="Account"
        right
        variant="none"
        class="m-2"
      >
        <b-dropdown-text style="width: 240px;">
          Name: <br />
          Account type:
        </b-dropdown-text>
        <b-dropdown-divider></b-dropdown-divider>
        <b-dropdown-item @click="logoutUser">Logout</b-dropdown-item>
      </b-dropdown>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      openNavEnd: false,
    };
  },

  methods: {
    logoutUser() {
      this.$store.commit("resetState");
    },
  },
};
</script>
