<template>
  <div>

    <main>
      <div id="box" tab="login">
        <!-- login code -->
        <div class="login" v-if="!showregister">
          <label for="username">Username</label><br />
          <input
            type="email"
            v-model="inputCredentials.email"
            @focus="loginErrors.email = ''"
            @input="loginValidate('email')"
            @blur="loginValidate('email')"
          />
          {{ loginErrors.email }}
          <br />
          <label for="password">Password</label><br />
          <input
            type="password"
            v-model="inputCredentials.password"
            @focus="loginErrors.password = ''"
            @input="loginValidate('password')"
            @blur="loginValidate('password')"
          />
          {{ loginErrors.password }}
          <br />
          <button type="button" name="button" @click="sendLogin">Login</button>
        </div>
        <!-- login code -->

        <!-- signup code -->
        <div class="signup" v-if="showregister">
          <h1>Sign Up</h1>

          <label for="username">Username</label><br />
          <input
            type="email"
            v-model="registerCredentials.email"
            @focus="registerErrors.email = ''"
            @input="registerValidate('email')"
            @blur="registerValidate('email')"
          />
          {{ registerErrors.email }}

          <br />
          <label for="password">Password</label><br />
          <input
            type="password"
            v-model="registerCredentials.password"
            @focus="registerErrors.password = ''"
            @input="registerValidate('password')"
            @blur="registerValidate('password')"
          />
          {{ registerErrors.password }}

          <br />
          <label for="password">Retype Password</label><br />
          <input
            type="password"
            v-model="registerCredentials.confirm"
            @focus="registerErrors.confirm = ''"
            @input="registerValidate('confirm')"
            @blur="registerValidate('confirm')"
          />
          {{ registerErrors.confirm }}

          <br />
          <label for="account">Account Type</label><br />
          <select
            v-model="registerCredentials.account_type"
            @focus="registerErrors.account_type = ''"
            @change="registerValidate('account_type')"
            @blur="registerValidate('account_type')"
          >
            <option value="">-- Select Account Type --</option>
            <option value="Professor">Professor</option>
            <option value="Admin">Admin</option>
          </select>
          {{ registerErrors.account_type }}
          <br />
          <button type="button" name="button" @click="sendRegistration">
            Signup
          </button>
        </div>
        <!-- signup code -->

        <!-- footer code -->
        <nav>
          <a href="#" class="signup" id="loginbtn">Login</a>
          <a
            href="#"
            @click="showregister = !showregister"
            class="login"
            id="signbtn"
            >Signup</a
          >
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
