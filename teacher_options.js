let createBtn = document.getElementById("createBtn")
let viewResultsBtn = document.getElementById("viewResultsBtn")

let currentJSUser = localStorage.getItem("vCurrentUser")
let currentUserID = currentJSUser
console.log(currentUserID)


createBtn.addEventListener('click',function(userID){
      testCreatorApp()
    })

function testCreatorApp(){
      document.location.href = "createtest.html"
}

viewResultsBtn.addEventListener('click',function(userID){
      viewResults()
    })

function viewResults(){
          document.location.href = "results.html"
}

let logOutButton = document.getElementById("logOutButton")

logOutButton.addEventListener('click', function () {
currentUserID = ""
  localStorage.setItem("vCurrentUser", currentUserID)
  document.location.href = "register.html"
})
