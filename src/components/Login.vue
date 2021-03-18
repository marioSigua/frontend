<template>
  <div>
    <header>CALSO</header>
    <main>
      <div id="box" tab="login">
        <!-- login code -->
        <div class="login">
          <h1>Login</h1>
          <label for="username">Username</label><br />
          <input type="text" name="username" value="" />
          <br />
          <label for="password">Password</label><br />
          <input type="password" name="password" value="" />
          <br />
          <button type="button" name="button">Login</button>
        </div>
        <!-- login code -->

        <!-- signup code -->
        <div class="signup">
          <h1>Sign Up</h1>

          <label for="username">Username</label><br />
          <input type="text" name="username" value="" />
          <br />
          <label for="password">Password</label><br />
          <input type="password" name="password" value="" />
          <br />
          <label for="password">Retype Password</label><br />
          <input type="password" name="password" value="" />
          <br />
          <button type="button" name="button">Signup</button>
        </div>
        <!-- signup code -->

        <!-- footer code -->
        <nav>
          <a href="#" class="signup" id="loginbtn">Login</a>
          <a href="#" class="login" id="signbtn">Signup</a>
        </nav>
        <!-- footer code -->
      </div>
    </main>
  </div>
</template>

<script>
import app from "./scripts/login";
export default app;
</script>

<style>
@import "./styles/login.css";
</style>
