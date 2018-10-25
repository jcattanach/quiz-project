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

firebase.auth().signInWithEmailAndPassword(email, password)
  .then(function (user) {
    userID = user.user.uid
    localStorage.setItem("vCurrentUser", userID)
    appDirector(userID)
  })

viewTestsBtn.addEventListener('click',function(userID){
      showtests(userID)
    })


function showtests(userID){
  usersRef.on('value',function(snapshot){
      testsList.innerHTML = ''
      snapshot.forEach(function(childSnapshot){
        childSnapshot.forEach(function(childChildSnapshot){
          if (childChildSnapshot.key == "Tests"){
            childChildSnapshot.forEach(function(childChildChildSnapshot){
              key = childChildChildSnapshot.key
              value = childChildChildSnapshot.val()
        testsList.innerHTML += `<li>Test ID: ${key} <br> Test Name: ${value}</li>`
      })
      }
      })
      })
    })

}

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
