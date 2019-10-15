<template>
  <div class="app">
      <div class="container">
        <div>
          <div class="row">
            <h2 style="text-align:center">this is login & sign in show page</h2>
            <div class="vl">
              <span class="vl-innertext">or</span>
            </div>

            <div class="col">
              <a href="#" class="fb btn">
                <i class="fa fa-facebook fa-fw"></i> Login with Facebook
              </a>
              <a href="#" class="twitter btn">
                <i class="fa fa-twitter fa-fw"></i> Login with Twitter
              </a>
              <a href="#" class="google btn"><i class="fa fa-google fa-fw">
                </i> Login with Google+
              </a>
            </div>

            <div class="col">
              <div class="hide-md-lg">
                <p>Or sign in manually:</p>
              </div>
              <input type="text" name="username" placeholder="Username" v-model="email" required>
              <input type="password" name="password" placeholder="Password" v-model="password" required>
              <input type="submit" value="Login" v-on:click="login">
            </div>
          </div>
        </div>
      </div>

      <div class="bottom-container">
        <div class="row">
          <div class="col">
            <a href="./SignUp" style="color:white" class="btn">Sign up</a>
          </div>
          <div class="col">
            <a href="#" style="color:white" class="btn">Forgot password?</a>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name:'login',
  data:function(){
    return {
      email:'',
      password:''
    }
  },
  methods:{
    login:function(){
      firebase.auth().signInWithEmailAndPassword(this.email,this.password).then(
        res=> {
          console.log(res);
          alert("로그인 잘 되었습니다.")
          this.$router.push("map");
        },
        function(err){
          alert(err.message)
        }
      );
    }
  },
  mounted(){
    // alert("하이파이브 지수가 1 올랐습니다! 유의미한 지수로 인정받기 위해, 혹은 기여자가 되기 위해 회원가입을 하시겠습니까? y/n 이런거 띄워줘~~!")
  }
}
</script>

<style scoped>
body {
  font-family: Arial, Helvetica, sans-serif;
}

* {
  box-sizing: border-box;
}

/* style the container */
.container {
  position: relative;
  border-radius: 5px;
  background-color: white;
  padding: 20px 0 30px 0;
} 

/* style inputs and link buttons */
input,
.btn {
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 4px;
  margin: 5px 0;
  opacity: 0.85;
  display: inline-block;
  font-size: 17px;
  line-height: 20px;
  text-decoration: none; /* remove underline from anchors */
}

input:hover,
.btn:hover {
  opacity: 1;
}

/* add appropriate colors to fb, twitter and google buttons */
.fb {
  background-color: #3B5998;
  color: white;
}

.twitter {
  background-color: #55ACEE;
  color: white;
}

.google {
  background-color: #dd4b39;
  color: white;
}

/* style the submit button */
input[type=submit] {
  background-color: #4CAF50;
  color: white;
  cursor: pointer;
}

input[type=submit]:hover {
  background-color: #45a049;
}

/* Two-column layout */
.col {
  float: left;
  width: 50%;
  margin: auto;
  padding: 0 50px;
  margin-top: 6px;
}

/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}

/* vertical line */
.vl {
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  border: 2px solid #ddd;
  height: 175px;
}

/* text inside the vertical line */
.vl-innertext {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: #f1f1f1;
  border: 1px solid #ccc;
  border-radius: 50%;
  padding: 8px 10px;
}

/* hide some text on medium and large screens */
.hide-md-lg {
  display: none;
}

/* bottom container */
.bottom-container {
  text-align: center;
  background-color: #666;
  border-radius: 0px 0px 4px 4px;
}

/* Responsive layout - when the screen is less than 650px wide, make the two columns stack on top of each other instead of next to each other */
@media screen and (max-width: 650px) {
  .col {
    width: 100%;
    margin-top: 0;
  }
  /* hide the vertical line */
  .vl {
    display: none;
  }
  /* show the hidden text on small screens */
  .hide-md-lg {
    display: block;
    text-align: center;
  }
}
</style>