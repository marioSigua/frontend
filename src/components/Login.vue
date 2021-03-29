<template>
  
  <div>

    <main>
      <img src="https://i.imgur.com/qO1REGc.png"  alt="Lyceum">
      <div id="box" tab="login">

        <!-- login code -->
      
        <div class="login" v-if="!showregister">
          <h1>Login</h1>
          <label for="username">Username</label><br />
          <input
            type="email"
            v-model="inputCredentials.email"
            @focus="loginErrors.email = ''"
            @input="loginValidate('email')"
            @blur="loginValidate('email')"
          />
          <span class="red">{{ loginErrors.email }}</span>
          <br />
          <label for="password">Password</label><br />
          <input
            type="password"
            v-model="inputCredentials.password"
            @focus="loginErrors.password = ''"
            @input="loginValidate('password')"
            @blur="loginValidate('password')"
          />
          <span class="red">{{ loginErrors.password }}</span>
          <br />
          <button type="button" name="button" @click="sendLogin">Log in</button>
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
          <span class="red"> {{ registerErrors.email }}</span>

          <br />
          <label for="password">Password</label><br />
          <input
            type="password"
            v-model="registerCredentials.password"
            @focus="registerErrors.password = ''"
            @input="registerValidate('password')"
            @blur="registerValidate('password')"
          />
          <span class="red">{{ registerErrors.password }}</span>

          <br />
          <label for="password">Retype Password</label><br />
          <input
            type="password"
            v-model="registerCredentials.confirm"
            @focus="registerErrors.confirm = ''"
            @input="registerValidate('confirm')"
            @blur="registerValidate('confirm')"
          />
          <span class="red">{{ registerErrors.confirm }}</span> 

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
          <span class="red">{{ registerErrors.account_type }}</span>
          <br />
          <button type="button" name="button" @click="sendRegistration">
            Sign up
          </button>
        </div>

        <!-- signup code -->

        <!-- footer code -->
        <!-- footer code -->
      </div>

    </main>
    <nav class="footer">
      <!-- <button href="#" class="signup" id="loginbtn">Login</button> -->
     <button
        href="#"
        @click="showregister = !showregister"
        class="login"
        id="signbtn"
        > Sign up
     </button>
    </nav>
  </div>
</template>


<script>
import app from "./scripts/login";
export default app;
</script>

<style>
@import "./styles/login.css";
</style>
