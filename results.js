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

// firebase.auth().signInWithEmailAndPassword(email, password)
//   .then(function (user) {

viewTestsBtn.addEventListener('click',function(){
  usersRef.on('value',function(snapshot){
      testsList.innerHTML = ''
      snapshot.forEach(function(childSnapshot){
        childSnapshot.forEach(function(childChildSnapshot){
          if (childChildSnapshot.val() == "Teacher"){
        console.log(childSnapshot.val())
        console.log(childSnapshot.key)
        key = childChildSnapshot.key
        value = childChildSnapshot.val()
        testsList.innerHTML += `<li>ID: ${key} - ${value}</li>`
      }
      })
      })
    })
    })
// testName = testsRef
// let testItem =
// <li><label>${testName}</label>
//     <table>
//   <tr>
//     <th>Name</th>
//     <th>Score</th>
//   </tr>
//   <tr>
//     <td>John Doe</td>
//     <td>82%</td>
//   </tr>
//   <tr>
//     <td>Mary Doe</td>
//     <td>95%</td>
//   </tr>
// </table>
// </li>
// `
// resultsList.insertAdjacentHTML("beforeend", testItem)
// })

// function displayOrders() {
//
//   testsRef.on('value',function(snapshot){
//       resultsList.innerHTML = ''
//       snapshot.forEach(function(childSnapshot){
//         resultsList.innerHTML = childSnapshot.val()
//
//       })
//     //  tests.forEach(test => resultsList.innerHTML += `<li>${test.name} - ${test.score}</li>`)
//     })
// }
