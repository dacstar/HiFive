<template>
  <div class="app">
    <div v-if="this.flag==false">
      <div class="container">
        <div class="login_container">
          <img alt="하이파이브 logo" src="../assets/logo.png" height="120px" width="100px" />
          <h1>LOGIN</h1>
          <h2 style="text-align:center">더 많은 정보를 얻으시려면 하이파이브 로그인해주세요!</h2>
          <div class="row">
            <div class="vl">
              <span class="vl-innertext">or</span>
            </div>

            <div class="col_left">
              <a href="#" class="twitter btn" id="fire" v-on:click="anonymous_login();">
                <i class="fa fa-twitter fa-fw"></i> 익명 로그인
              </a>
              <br />
              <a href="#" class="fb btn" v-on:click="facebook_login()">
                <i class="fa fa-facebook fa-fw"></i> 페이스북 로그인
              </a>
              <br />
              <a href="#" class="google btn" v-on:click="google_login()">
                <i class="fab fa-google"></i>구글 로그인
              </a>
              <!-- 카카오계정 로그인 -->
              <!-- <a id="kakao-login-btn"></a>
              <a href="http://developers.kakao.com/logout"></a>-->
            </div>

            <div class="col">
              <div class="hide-md-lg">
                <p>Or sign in manually:</p>
              </div>
              <input type="text" name="username" placeholder="Username" v-model="email" required />
              <input
                type="password"
                name="password"
                placeholder="Password"
                v-model="password"
                required
              />
              <input type="submit" class="submitbutton" value="하이파이브 로그인" v-on:click="login" />
            </div>
          </div>
          <!-- Signup & Forgot? -->
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
      </div>
    </div>
  </div>
</template>

<script>
import db from "@/FirebaseService";
import firebase from 'firebase';
import { allSettled } from 'q';
import router from '../router/index.js'
import Swal from "sweetalert2";

export default {
  name: 'login',
  data: function () {
    return {
      email: '',
      password: '',
      flag: this.$store.state.isLogin,
      user_img: ''
    }
  },
  methods: {
    addUserToDB() {
      var userEmail = this.$store.state.user_nickname; // 사용자 식별자 넣기
      var docRef = db.collection("users").doc(userEmail);

      var docData = {
        store: [],
        userID: null,
        userName: userEmail,
      };

      docRef.get().then(function (doc) {
        if (doc.exists) {
          console.log("UserData already exist!")
        } else {
          docRef.set(docData).then(function (doc) {
            console.log("Document successfully written!")
          }).catch(function (error) {
            console.log("Error setting document:", error);
          });
        }
      }).catch(function (error) {
        console.log("Error getting document:", error);
      });
    },
    login() {
      var scope = this;


            firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION).then(function (result) {
            return firebase.auth().signInWithEmailAndPassword(scope.email,scope.password);
        }).then(function(result){
          Swal.fire('Login Success!', result.user.email + '님, 이제 하이파이브를 더 자유롭게 이용하실 수 있습니다!', "success");
          console.log(result.user.email)
          console.log('result', result)
          scope.test=result;
          scope.flag=true;
          scope.user = result.user
          scope.$store.state.user_nickname = result.user.email
          router.push("/");
        }).catch(function(error){
        const errorCode = error.code;
        if (errorCode == "auth/invalid-email") {
          Swal.fire("잘못된 이메일 형식입니다.", "다시 확인해주세요.", "error");
        } else if (errorCode == "auth/wrong-password") {
          Swal.fire("잘못된 비밀번호입니다.", "다시 확인해주세요.", "error");
        }
      });
    },
    // anonymous_login:function(){
    anonymous_login() {
      var scope = this;
      firebase.auth().signInAnonymously().catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        console.log('익명로그인 에러', errorCode, errorMessage);
      });
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          // User is signed in.
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          console.log(user);
          scope.$store.state.user_nickname = "싸피인!!";
          scope.flag = true;

          router.push("/");
          // ...
        } else {
          // User is signed out.
          // ...
        }
        // ...
      });
    },
    facebook_login() {
      var provider = new firebase.auth.FacebookAuthProvider();
      firebase.auth().signInWithRedirect(provider);
      router.push("/");
    },
    google_login() {
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithRedirect(provider);
      router.push("/");
    },
    logout() {
      firebase.auth().signOut().then(
        result => {
          this.flag = false;
          this.$store.state.user_nickname = '';
        }).catch(function (error) {
          // An error happened.
          alert(error.message);
        });
    },
  },
  mounted() {
    var scope = this;
    if (this.flag) {
      // 로그인 된 상태
      alert(this.user);
    } else {
      // alert("하이파이브 지수가 1 올랐습니다! 유의미한 지수로 인정받기 위해, 혹은 기여자가 되기 위해 회원가입을 하시겠습니까? y/n 이런거 띄워줘~~!")
    }
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        console.log(user)
        scope.flag = true;
        scope.$store.state.user_nickname = user.email
        // User is signed in.
      } else {
        // No user is signed in.
      }
    });

    // 카카오 로그인 버튼을 생성합니다.
    // Kakao.Auth.createLoginButton({
    //   container: '#kakao-login-btn',
    //   success: function (authObj) {
    //     // 로그인 성공시, API를 호출합니다.
    //     Kakao.API.request({
    //       url: '/v2/user/me',
    //       success: function (res) {
    //         console.log(JSON.stringify(res.kaccount_email));
    //         console.log(JSON.stringify(res.id));
    //         console.log(JSON.stringify(res.properties.profile_image));
    //         console.log(JSON.stringify(res.properties.nickname));
    //         scope.$store.state.user_nickname = res.properties.nickname;
    //         scope.flag = false;
    //       },
    //       fail: function (error) {
    //         alert(JSON.stringify(error));
    //       }
    //     });
    //   },
    //   fail: function (err) {
    //     alert(JSON.stringify(err));
    //   }
    // });
    firebase.auth().getRedirectResult().then(
      result => {
        if (result.credential) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          // ...
        }
        // The signed-in user info.
        var user = result.user;
        // console.log('user: ', user, 'user displayname:', user.displayName);
        if (user) {
          this.$store.state.user_nickname = user.email;
          this.flag = true;
          this.addUserToDB();
        }

      }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });

    // 2019.11.04 Laoding Alert 기능 구현중
    console.log("hi1")
    const showLoading = function () {
      console.log("hi2")
      Swal({
        title: 'Now loading',
        allowEscapeKey: false,
        allowOutsideClick: false,
        timer: 2000,
        onOpen: () => {
          Swal.showLoading();
        }
      }).then(
        () => { },
        (dismiss) => {
          if (dismiss === 'timer') {
            console.log('closed by timer!!!!');
            Swal({
              title: 'Finished!',
              type: 'success',
              timer: 2000,
              showConfirmButton: false
            })
          }
        }
      )
    };
    console.log("hi3")

    document.getElementById('fire').addEventListener('click', (event) => {
      console.log("hi4")
      showLoading();
    });
  }
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}

/* style the container */
.container {
  position: relative;
  /* border-radius: 5px; */
  background-color: white;
  padding: 30px 0;
  font-family: "Do Hyeon", sans-serif;
}

.login_container {
  margin-top: 20px;
}

h1 {
  font-weight: bold !important;
  font-family: "Jua", sans-serif !important;
  font-size: 3vh !important;
  margin-top: 20px !important;
  margin-bottom: 10px !important;
}

h2 {
  font-family: "Jua", sans-serif !important;
  font-size: 2.4vh;
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
  background-color: #3b5998;
  color: white;
}

.twitter {
  background-color: #55acee;
  color: white;
}

.google {
  background-color: #dd4b39;
  color: white;
}

input[type="text"]:focus {
  width: 100%;
}

input[type="password"]:focus {
  width: 100%;
}
/* style the submit button */
input[type="submit"] {
  background-color: #45a049;
  font-family: "Jua", sans-serif;
  color: white;
  cursor: pointer;
  transition: 500ms ease all;
}

input[type="submit"]:hover {
  background-color: #a120ec;
}

/* Two-column layout */
.col {
  float: left;
  width: 50%;
  margin: auto;
  padding: 0 50px;
  margin-top: 6px;
}

/* Two-column layout */
.col_left {
  float: left;
  width: 50%;
  margin: auto;
  padding: 0 50px;
  margin-top: 20px;
}

/* Clear floats after the columns */
.row {
  margin-top: 20px;
}

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
  height: 200px;
}

/* text inside the vertical line */
.vl-innertext {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: #a120ec;
  border: 3px solid #ccc;
  border-radius: 50%;
  padding: 8px 10px;
  color: #fff;
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

/* 
    SCREEN : DESKTOP
    SIZE : 1281px
  */
@media (min-width: 1281px) {
  .login_container {
    width: 80%;
    margin: 0 auto;
  }
}

/* 
    SCREEN : LABTOP AND DESKTOP
    SIZE : 1025 ~ 1280px
  */
@media (min-width: 1025px) and (max-width: 1280px) {
  .login_container {
    width: 80%;
    margin: 0 auto;
  }
}

/* 
    SCREEN : TABLET, IPAD
    SIZE : 768px to 1024px
  */
@media (min-width: 768px) and (max-width: 1024px) {
  .login_container {
    width: 90%;
    margin: 0 auto;
  }
}

@media (max-width: 768px) {
  .btn {
    width: 100%;
  }
}
</style>
