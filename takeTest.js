const database = firebase.database()
const questRef = database.ref('Questions')

let testIDName = document.getElementById('testIDName')
let button = document.getElementById('button')
let questionsListElement = document.getElementById('questionsListElement')


questions = []

button.addEventListener('click', function() {
  questionsListElement.innerHTML = ''
  let testID = testIDName.value
  pullData(testID)



})
function checkID(list, testID){
  list.map(function(question){
    console.log(question.testID)
    if(question.testID == testID){
      console.log(question.question)
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
  }
  })
}
function pullData(testID) {
questRef.on('value', function(snapshot) {
  questions = []
  console.log(snapshot.val())
  snapshot.forEach(function(childSnapshot){
    let questionData = childSnapshot.val()
    let questionTestID = questionData.testID
    console.log(questionTestID)

    questions.push(questionData)
  })
  console.log(questions)
  checkID(questions, testID)
})
}
