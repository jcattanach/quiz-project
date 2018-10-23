let testContainer = document.getElementById("testContainer")
let testList = document.getElementById("testList")
let resultsContainer = document.getElementById("resultsContainer")
let resultsList = document.getElementById("resultsList")
let viewResultsBtn = document.getElementById("viewResultsBtn")
let testTextBox = document.getElementById("testTextBox")


const database = firebase.database()
const testsRef = database.ref("Tests")
const usersRef =  database.ref("Users")

let tests = []

viewResultsBtn.addEventListener('click',function(){
let testName = testTextBox.value
let testItem =  `
<li><label>${testName}</label>
    <table>
  <tr>
    <th>Name</th>
    <th>Score</th>
  </tr>
  <tr>
    <td>John Doe</td>
    <td>82%</td>
  </tr>
  <tr>
    <td>Mary Doe</td>
    <td>95%</td>
  </tr>
</table>
</li>
`
resultsList.insertAdjacentHTML("beforeend", testItem)
})

// function displayOrders() {
//
//   testsRef.on('value',function(snapshot){
//       resultsList.innerHTML = ''
//       tests = []
//       snapshot.forEach(function(childSnapshot){
//         let key = childSnapshot.val().name
//         let value = childSnapshot.val().score
//         tests.push(childSnapshot.val())
//       })
//       tests.forEach(test => resultsList.innerHTML += `<li>${test.name} - ${test.score}</li>`)
//     })
// }
