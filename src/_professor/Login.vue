<template lang="html">
  <main>
    <nav>
      <div id="button">
        Sign Up
      </div>
    </nav>

    <section id="form" class="backdrop">
      <h1>Login</h1>
      <p v-show="error!=''">{{error}}</p>
      <label for="username">Username</label>
      <input type="text" name="" placeholder="username" v-model="username">
      <label for="password">Password</label>
      <input type="password" name="password" placeholder="password" v-model="password">
      <div class="right">
        <button type="button" name="button" @click="login">Login</button>
      </div>
    </section>

  </main>
</template>

<script>
export default {
  data(){
    return {
      username:'',
      password:'',

      error:'',
    };
  },
  methods:{
    login(){
      console.log('login');
      this.$router.push({name:'home'}).catch(e=>{
        console.log(e);
      })
    }
  },
  watch:{
    username(val){
        if(val==''){
          this.error="Username is required"
        }
        else {
          this.error=""
        }
    },
    password(val){
      if(val==''){
        this.error="Password is required"
      }
      else {
        this.error=""
      }
    }
  }


}
</script>

<style lang="css" scoped>
nav{
  text-align: right;
  padding: right;
  padding: 10px;
}
#button{

  color: white;
  text-align: center;

  display: inline-block;
  background: black;
  width: 100px;
  padding: 10px;
  border-radius: 10px;
}

#form{
  padding: 30px;
  border-radius: 10px;
  width: 500px;
  color: white;
  -webkit-blur: 10px;
  blur:10px;


  margin-top: 100px;
  margin-left: 100px;
  background: rgba(0,0,0,0.3);
}

label, button{
  margin-top: 20px;
  min-width: 70px;
}


@media only screen and (max-width: 540px) {
  #form {
    width: 90%;
    margin: 30px auto;
  }
}

@media only screen and (max-width: 720px) {
  #form {
    width: 90%;
    margin: 30px auto;
  }
}


</style>
