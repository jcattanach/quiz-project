const database = firebase.database()
const questRef = database.ref('Questions')

let testIDName = document.getElementById('testIDName')
let button = document.getElementById('button')
let questionsListElement = document.getElementById('questionsListElement')

let submitButton = `<button id="btnTestSubmit" onclick='submitTestFunc()'>Submit Test</button>`
questions = []

function submitTestFunc(){
  console.log('test submitted')
}

button.addEventListener('click', function() {
  questionsListElement.innerHTML = ''
  let testID = testIDName.value
  pullData(testID)

})
function checkID(list, testID){
  list.map(function(question){
    if(question.testID == testID){
      liItems = `<li>
    <h4>${question.question}<br>A.
    <input type="checkbox"/>
    <label>${question.ChoiceA}</label><br>B.
    <input type="checkbox"/>
    <label>${question.ChoiceB}</label><br>C.
    <input type="checkbox"/>
    <label>${question.ChoiceC}</label><br>D.
    <input type="checkbox"/>
    <label>${question.ChoiceD}</label>
    </li>`

    questionsListElement.insertAdjacentHTML('beforeend', liItems)
  }})
  questionsListElement.insertAdjacentHTML('beforeend', submitButton)
}
function pullData(testID) {
questRef.on('value', function(snapshot) {
  questions = []
  snapshot.forEach(function(childSnapshot){
    let questionData = childSnapshot.val()
    let questionTestID = questionData.testID
    questions.push(questionData)
  })
  checkID(questions, testID)
})
}
