const database = firebase.database()
const questRef = database.ref('Questions')
const answerRef = database.ref('Answers')

let testIDName = document.getElementById('testIDName')
let button = document.getElementById('button')
let questionsListElement = document.getElementById('questionsListElement')

let submitButton = `<button id="btnTestSubmit" onclick='submitTestFunc(questionsForThisTest, questionsForThisTestKey)'>Submit Test</button>`

let questions = []
let questionsForThisTest = []
let questionsForThisTestKey = []


button.addEventListener('click', function() {
  questionsListElement.innerHTML = ''
  let testID = testIDName.value
  pullData(testID)

})
function checkID(list, testID){
  list.map(function(question){
    if(question.val().testID == testID){
      questionsForThisTest.push(question.val())
      let questionKey = question.key
      questionsForThisTestKey.push(questionKey)
      liItems = `<li>
    <h4>${question.val().question}<br>A.
    <input type="checkbox"/>
    <label>${question.val().ChoiceA}</label><br>B.
    <input type="checkbox"/>
    <label>${question.val().ChoiceB}</label><br>C.
    <input type="checkbox"/>
    <label>${question.val().ChoiceC}</label><br>D.
    <input type="checkbox"/>
    <label>${question.val().ChoiceD}</label>
    </li>`

    questionsListElement.insertAdjacentHTML('beforeend', liItems)
  }})
  questionsListElement.insertAdjacentHTML('beforeend', submitButton)
}
function pullData(testID) {
questRef.on('value', function(snapshot) {
  questions = []
  snapshot.forEach(function(childSnapshot){
    questions.push(childSnapshot)

  })
  checkID(questions, testID)
})
}

function submitTestFunc(list, list2){
  console.log(list)
  console.log(list.length)
  console.log(list2)
  console.log(list2.length)
}
