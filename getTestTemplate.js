const database = firebase.database()
const questRef = database.ref('Questions')

let testIDName = document.getElementById('testIDName')
let button = document.getElementById('button')
let questionsListElement = document.getElementById('questionsListElement')


questions = []

button.addEventListener('click', function() {
  let testID = testIDName.value

function checkID(list){
  list.map(function(question){
    console.log(question.testID)
    if(question.testID == testID){
      console.log(question.question, question.Answer)


    let liItems = `<li>
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

questRef.on('value', function(snapshot) {
  console.log(snapshot.val())
  snapshot.forEach(function(childSnapshot){
    let questionData = childSnapshot.val()
    let questionTestID = questionData.testID
    console.log(questionTestID)

    questions.push(questionData)
  })
  console.log(questions)
  checkID(questions)
})
})
