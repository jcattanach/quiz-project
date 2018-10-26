let testContainer = document.getElementById("testContainer")
let testsList = document.getElementById("testsList")
let resultsContainer = document.getElementById("resultsContainer")
let resultsList = document.getElementById("resultsList")
let viewTestsBtn = document.getElementById("viewTestsBtn")
const database = firebase.database()
const testsRef = database.ref("Tests")
const usersRef =  database.ref("Users")

let currentJSUser = localStorage.getItem("vCurrentUser")
let currentUserID = currentJSUser

firebase.auth().onAuthStateChanged(function(user) {
 if (user) {
   viewTestsBtn.addEventListener('click', function () {
  usersRef.on('value',function(snapshot){
      testsList.innerHTML = ''
      snapshot.forEach(function(childSnapshot){
        if (childSnapshot.key == currentUserID){
        childSnapshot.forEach(function(childChildSnapshot){
          if (childChildSnapshot.key == "Tests"){
            childChildSnapshot.forEach(function(childChildChildSnapshot){
              key = childChildChildSnapshot.key
              value = childChildChildSnapshot.val()
        testsList.innerHTML += `<li><a href="#" onclick="javascript:showResults()">${value}</a> ${key}</li>`
      })
      }
      })
    }
      })
    })
  })
}
})

function showresults(){
  firebase.auth().onAuthStateChanged(function(user) {
   if (user) {
     viewTestsBtn.addEventListener('click', function () {
    usersRef.on('value',function(snapshot){
        testsList.innerHTML = ''
        snapshot.forEach(function(childSnapshot){
          if (childSnapshot.key == currentUserID){
          childSnapshot.forEach(function(childChildSnapshot){
            if (childChildSnapshot.key == "Students"){
              childChildSnapshot.forEach(function(childChildChildSnapshot){
                key = childChildChildSnapshot.key
                value = childChildChildSnapshot.val()
          resultsList.innerHTML += `<li><a href="#" onclick="javascript:showResults()">${firstName} ${lastName} ${grade}</a></li>`
        })
        }
        })
      }
        })
      })
    })
  }
  })


}


let logOutButton = document.getElementById("logOutButton")

logOutButton.addEventListener('click', function () {
currentUserID = ""
  localStorage.setItem("vCurrentUser", currentUserID)
  document.location.href = "index.html"
})
