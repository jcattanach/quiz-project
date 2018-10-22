var userID

const database = firebase.database()
const userCategoriesRef = database.ref("Users")

let btnSelectLogin = document.getElementById("btnSelectLogin")
let btnSelectRegister = document.getElementById("btnSelectRegister")

let regLogin = document.getElementById("regLogin")

btnSelectLogin.addEventListener('click', function () {

  login()
})

btnSelectRegister.addEventListener('click', function () {

register() 

})






function register() {
  regLogin.innerHTML = `<h3>Register User</h3>
    <input type="email" id="emailTextBox" />
    <input type="password" id="passwordTextBox" />
    <br>
    <input type="radio" value="teacher" name="accountType"> Teacher
    <input type="radio" value="student" name="accountType"> Student<br>
    <button id="btnRegister">Register</button>`

    let emailTextBox = document.getElementById("emailTextBox")
    let passwordTextBox = document.getElementById("passwordTextBox")
    
    
    let btnRegister = document.getElementById("btnRegister")

    

    
    
    btnRegister.addEventListener('click', function () {

      let email = emailTextBox.value
      let password = passwordTextBox.value
      let radioValue = document.querySelector('input[name="accountType"]:checked').value

      function saveUser(userID) {
        if (radioValue === "student") {
          saveStudent(userID)
        }
        else {
          saveTeacher(userID)
        }
      }

      function saveTeacher(userID) {
        
        let currentUser = { "User ID": userID,
                            "Account Type" : "Teacher" }
        userCategoriesRef.child("Teachers").child(userID).set(currentUser)
      }
      function saveStudent(userID) {
        let currentUser = { "User ID": userID,
                            "Account Type": "Student" }
        userCategoriesRef.child("Students").child(userID).set(currentUser)
      }
      // create a new user using email and password
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function (user) {
          console.log("User created")
          let userID = user.user.uid
          console.log(userID)
          login()
          saveUser(userID)
          
        })
        .catch(function (error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode === "auth/email-already-in-use") {
            login()
            userPreRegisterMessage()
          }
        });

    })
  }

function login() {

  regLogin.innerHTML = `<h3>Login User</h3>
<input type="email" id="loginEmailTextBox" />
<input type="password" id="loginPasswordTextBox" />
<button id="btnLogin">Login</button>
</body>`

  let loginEmailTextBox = document.getElementById("loginEmailTextBox")
  let loginPasswordTextBox = document.getElementById("loginPasswordTextBox")
  let btnLogin = document.getElementById("btnLogin")

  btnLogin.addEventListener('click', function () {

    let email = loginEmailTextBox.value
    let password = loginPasswordTextBox.value

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(function (user) {
        console.log("User Signed In Successfully!!")
        let userID = user.user.uid
        localStorage.setItem("vCurrentUser", userID)
        testCreatorApp()
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode)
        console.log(errorMessage)
        if (errorCode === "auth/user-not-found") {
        register()
        userNotRegistedMessage()
      }
      })
  })

}
  
function userPreRegisterMessage() {
  regLogin.insertAdjacentHTML('beforeend', `<div>User Already Registered</div>`)
}    
  
function userNotRegistedMessage() {
  regLogin.insertAdjacentHTML('beforeend', `<div>User Not Registered</div>`)
}   

function testCreatorApp(){
  document.location.href = "createtest.html"
}
  
  

