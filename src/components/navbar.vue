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
              class="nav-link active"
              aria-current="page"
              href="#"
              style="color: white;"
              >Lyceum</a
            >
          </li>
          <li class="nav-item">
            <a
              class="nav-link active"
              aria-current="page"
              href="#"
              style="color: white;"
              >Home</a
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
            <a class="nav-link" href="#calculator.vue" style="color: white;"
              >Calculator</a
            >
          </li>
        </ul>
      </div>
    </div>
    <div>
      <a
        class="nav-link dropdown-toggle"
        href="#"
        id="navbarDropdownMenuLink"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        style="color: white;"
        @click="openNavEnd = !openNavEnd"
      >
        Account
      </a>

      <ul
        :class="{ 'dropdown show': openNavEnd }"
        class="dropdown-menu"
        aria-labelledby="navbarDropdownMenuLink"
      >
        <li><a class="dropdown-item" href="#">Action</a></li>
        <li><a class="dropdown-item" href="#">Setting</a></li>
        <li>
          <a class="dropdown-item" href="#" @click="logoutUser">Logout</a>
        </li>
      </ul>
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
