<template>
  <div class="app">
    <div>
      <div class="container">
        <img alt="하이파이브 logo" src="../assets/logo.png" height="120px" width="100px" />
        <h1>SIGNUP</h1>
        <p>이곳을 작성하시고 하이파이브의 회원이 되어주세요^0^</p>
        <hr>
        <label for="email">
          <b>Email</b>
        </label>
        <input type="text" v-model="email" placeholder="Enter Email" name="email" required />

        <label for="psw">
          <b>Password</b>
        </label>
        <input type="password" v-model="password" placeholder="Enter Password" name="psw" required />

        <label for="psw-repeat">
          <b>Repeat Password</b>
        </label>
        <input type="password" v-model="psw_repeat" placeholder="Repeat Password" name="psw-repeat" required />

        <label>
          <input type="checkbox" checked="checked" name="remember" style="margin-bottom:15px" /> Remember me
        </label>

        <p>
          By creating an account you agree to our
          <a
            href="#"
            style="color:dodgerblue"
          >Terms & Privacy</a>.
        </p>

        <div class="clearfix">
          <button type="button" class="cancelbtn" v-on:click="cancel()">뒤로가기</button>
          <button type="submit" class="signupbtn" v-on:click="signUp();">회원가입</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from "@/FirebaseService";
import firebase from 'firebase';
import router from '../router/index.js'
import { log } from 'util';
import Swal from "sweetalert2";

export default {
  name: 'signup',
  data: function () {
    return {
      email: '',
      password: '',
      psw_repeat:''
    }
  },
  methods: {
    signUp: function () {
      if(this.password == this.psw_repeat) {
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
          res => {
            console.log(res);
            Swal.fire("회원가입 성공!", "하이파이브에 오신걸 환영합니다!","success");
            this.$router.push("login");
            this.addUserToDB();
          },
          function (err) {
            const errorCode = err.code;
            console.log(err);
            if (errorCode == "auth/invalid-email") {
              Swal.fire("잘못된 이메일 형식입니다.", "다시 확인해주세요.", "error");
            } else if (errorCode == "auth/weak-password") {
              Swal.fire("비밀번호가 너무 짧습니다.", "6자 이상 입력해주세요.", "error");
            } else if (errorCode == "auth/email-already-in-use") {
              Swal.fire("이미 가입된 이메일 입니다.", "","error");
            } 
          }
        );
      } else {
        Swal.fire("비밀번호가 맞지 않습니다.", "다시 확인해주세요.", "error");
      }
    },
    addUserToDB() {
      var userEmail = this.email; // 사용자 식별자 넣기
      var docData = {
        store: [],
        userID: null,
        userName: userEmail,
      };

      var docRef = db.collection("users").doc(userEmail);
      docRef.set(docData).then(function (doc) {
        console.log("Document successfully written!")
      }).catch(function (error) {
        console.log("Error setting document:", error);
      });
    },
    cancel: function () {
      this.$router.go(-1)
    }
  },
  mounted(){
  firebase.auth().onAuthStateChanged(function(user) {
  var scope = this;
  if (user) {
    console.log(user)
    scope.$store.state.user_nickname = user.email
    // User is signed in.
  } else {
    // No user is signed in.
  }
});
  },
}
</script>

<style scoped>

.container {
  font-family: "Do Hyeon", sans-serif;
  height: 720px;
}

h1 {
  font-family: "Jua", sans-serif;
  font-size: 2.4vh;
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 20px;
}

p {
  font-family: "Jua", sans-serif;
  font-size: 2vh;
  margin-bottom: 20px;
}

/* Full-width input fields */
input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 15px;
  margin: 5px 0 22px 0;
  display: inline-block;
  border: none;
  background: #f1f1f1;
}

input[type="text"]:focus,
input[type="password"]:focus {
  background-color: #ddd;
  outline: none;
}

hr {
  border: 1px solid #f1f1f1;
  margin-bottom: 25px;
}

/* Set a style for all buttons */
button {
  background-color: #4caf50;
  color: white;
  padding: 0px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
  opacity: 0.9;
}

button:hover {
  /* opacity: 1; */
  background-color: #a120ec;
  transition: 500ms ease all;

}

/* Extra styles for the cancel button */
.cancelbtn {
  padding: 0px 20px;
  background-color: orange;
}

/* Float cancel and signup buttons and add an equal width */
.cancelbtn,
.signupbtn {
  float: left;
  width: 50%;
  padding: 10px 20px;
  font-family: "Do Hyeon", sans-serif;
}

/* Add padding to container elements */
.container {
  padding: 16px;
}

/* Clear floats */
.clearfix::after {
  content: "";
  clear: both;
  display: table;
}

/* Change styles for cancel button and signup button on extra small screens */
@media screen and (max-width: 300px) {
  .cancelbtn,
  .signupbtn {
    width: 100%;
  }
}

/* 
    SCREEN : DESKTOP
    SIZE : 1281px
  */
@media (min-width: 1281px) {
  .container {
    width: 80%;
    margin: 0 auto;
  }
}

/* 
    SCREEN : LABTOP AND DESKTOP
    SIZE : 1025 ~ 1280px
  */
@media (min-width: 1025px) and (max-width: 1280px) {
  .container {
    width: 80%;
    margin: 0 auto;
  }
}

/* 
    SCREEN : TABLET, IPAD
    SIZE : 768px to 1024px
  */
@media (min-width: 768px) and (max-width: 1024px) {
  .container {
    width: 90%;
    margin: 0 auto;
  }
}
</style>