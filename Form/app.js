// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBH9Ov9alW9WM8tqMa3yc0cYS7WdesWIj0",
  authDomain: "authentication-bb8f9.firebaseapp.com",
  projectId: "authentication-bb8f9",
  storageBucket: "authentication-bb8f9.firebasestorage.app",
  messagingSenderId: "299302758063",
  appId: "1:299302758063:web:754ff6b2b6718b4d4c165a",
};

// Initialize Firebase
var app = firebase.initializeApp(firebaseConfig);

var auth = firebase.auth();

// console.log(auth)

// console.log(app)

function signup() {
  try {
    var nameInput = document.getElementById("name");
    var emailInput = document.getElementById("email");
    var passwordInput = document.getElementById("password");
    var confirmpassInput = document.getElementById("confirmpass");
    auth
      .createUserWithEmailAndPassword(emailInput.value, passwordInput.value)
      .then(function (response) {
        console.log(response);

        response.user
          .sendEmailVerification()
          .then(function () {
            console.log("email verification send...");
          })
          .catch(function (error) {
            console.log(error);
          });

        alert("Welcome to Our Website!");
        // window.location.href = "./login.html";
      })
      .catch(function (error) {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
}

function login() {
  try {
    var emailInput = document.getElementById("email");
    var passwordInput = document.getElementById("password");

    auth
      .signInWithEmailAndPassword(emailInput.value, passwordInput.value)
      .then(function (response) {
        console.log(response);
        alert("Login Sucessfully..");

        window.location.href = "./home.html";
      })
      .catch(function (error) {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
}



function LoginwithGoogle(){
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)

    .then(function (response){
        console.log(response)
    })
    .catch(function(error){
        console.log(error)
    })
}







  // Your web app's Firebase configuration
      var firebaseConfig = {
        apiKey: "AIzaSyAzu5lMkcosAOwgpbbT8deuU95gXKxbrQQ",
        authDomain: "salman-electronics.firebaseapp.com",
        projectId: "salman-electronics",
        storageBucket: "salman-electronics.firebasestorage.app",
        messagingSenderId: "896055901847",
        appId: "1:896055901847:web:a6ae24e7f398fd8583b3d2",
      };

      // Initialize Firebase
     // Initialize Firebase
var app = firebase.initializeApp(firebaseConfig);

var auth = firebase.auth();
