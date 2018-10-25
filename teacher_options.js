let currentJSUser = localStorage.getItem("vCurrentUser")
let currentUserID = currentJSUser
console.log(currentUserID)










let logOutButton = document.getElementById("logOutButton")




logOutButton.addEventListener('click', function () {
currentUserID = ""
  localStorage.setItem("vCurrentUser", currentUserID)
  document.location.href = "register.html"
})
