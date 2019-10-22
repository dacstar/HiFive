<template>
  <div class="app">
    <div v-if="this.flag==true">
      <div class="container">
        <div>
          <div class="row">
            <h2 style="text-align:center">this is login & sign in show page</h2>
            <div class="vl">
              <span class="vl-innertext">or</span>
            </div>

            <div class="col">
              <a href="#" class="fb btn" v-on:click="facebook_login">
                <i class="fa fa-facebook fa-fw"></i> 페이스북 로그인
              </a>
              <a href="#" class="twitter btn" v-on:click="ananymous_login">
                <i class="fa fa-twitter fa-fw"></i> 익명 로그인
              </a>
              <a href="#" class="google btn" v-on:click="google_login"><i class="fa fa-google fa-fw">
                </i> 구글 로그인
              </a>
              <a id="kakao-login-btn"></a>
              <a href="http://developers.kakao.com/logout"></a>
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
    <div v-else>
      {{this.$store.state.user_nickname}}님 안녕하세요!
      <input type="submit" value="로그아웃" v-on:click="logout">
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import { allSettled } from 'q';

export default {
  name:'login',
  data:function(){
    return {
      email:'',
      password:'',
      user:[],
      flag:true,
      user_img:''
    }
  },
  methods:{
    login(){
      firebase.auth().signInWithEmailAndPassword(this.email,this.password).then(
        res=> {
          // console.log(res);
          //alert("로그인 잘 되었습니다.")
          //this.$router.push("map");
          this.flag=false;
          this.user = res.user
          scope.$store.state.user_nickname = user.email
        }).catch(function(error) {
          //alert(error.message)
        }
      );
    },
    // ananymous_login:function(){
    ananymous_login(){
      var scope = this;
      firebase.auth().signInAnonymously().catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
      firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
          // User is signed in.
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          console.log(user);
          scope.$store.state.user_nickname = "싸피인!!";
          scope.flag = false;
          // ...
        } else {
          // User is signed out.
          // ...
        }
        // ...
      });
    },
    facebook_login(){
      var provider = new firebase.auth.FacebookAuthProvider();
      firebase.auth().signInWithRedirect(provider);
    },
    // google_login:function(){
    google_login(){
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithRedirect(provider);
    },
    logout(){
      firebase.auth().signOut().then(
        result=> {
        // Sign-out successful.
        // console.log('로그아웃 된거야?');
        
        this.flag = true;
        this.user = [];
        this.$store.state.user_nickname = '';
      }).catch(function(error) {
        // An error happened.
        alert(error.message);
      });
    }
  },
  mounted(){
    var scope = this;
    if(this.flag){
      // alert("하이파이브 지수가 1 올랐습니다! 유의미한 지수로 인정받기 위해, 혹은 기여자가 되기 위해 회원가입을 하시겠습니까? y/n 이런거 띄워줘~~!")
    }else{
      alert(this.user);
    }
    
    // 카카오 로그인 버튼을 생성합니다.
      Kakao.Auth.createLoginButton({
        container: '#kakao-login-btn',
        success: function(authObj) {
          // 로그인 성공시, API를 호출합니다.
          Kakao.API.request({
            url: '/v2/user/me',
            success: function(res) {
              console.log(JSON.stringify(res.kaccount_email));
              console.log(JSON.stringify(res.id));
              console.log(JSON.stringify(res.properties.profile_image));
              console.log(JSON.stringify(res.properties.nickname));
              scope.$store.state.user_nickname = res.properties.nickname;
              scope.flag = false;
            },
            fail: function(error) {
              alert(JSON.stringify(error));
            }
          });
        },
        fail: function(err) {
          alert(JSON.stringify(err));
        }
      });
     firebase.auth().getRedirectResult().then(
      result=> {
  if (result.credential) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // ...
  }
  // The signed-in user info.
  var user = result.user;
  // console.log('이거슨 user',user);
  // console.log('user displayname:',user.displayName);
  if(user){
    this.$store.state.user_nickname = user.displayName;
    this.flag = false;
  }
  
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
});
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