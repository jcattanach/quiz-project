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
let questionNumberArray = []
let answersToBeChecked = []

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
    <input class='checkboxAnswerOne' id='checkboxAnswerOne + ${question.key}' type="checkbox"/>
    <label class='labelAnswerOne' id='labelAnswerOne + ${question.key}' >${question.val().ChoiceA}</label><br>B.
    <input class='checkboxAnswerTwo' id='checkboxAnswerTwo + ${question.key}' type="checkbox"/>
    <label class='labelAnswerTwo' id='labelAnswerTwo + ${question.key}' >${question.val().ChoiceB}</label><br>C.
    <input class='checkboxAnswerThree' id='checkboxAnswerThree + ${question.key}' type="checkbox"/>
    <label class='labelAnswerThree' id='labelAnswerThree + ${question.key}' >${question.val().ChoiceC}</label><br>D.
    <input class='checkboxAnswerFour' id='checkboxAnswerFour + ${question.key}' type="checkbox"/>
    <label class='labelAnswerFour' id='labelAnswerFour + ${question.key}' >${question.val().ChoiceD}</label>
    </li>`

    console.log(`checkboxAnswerTwo + ${question.key}`)
    questionNumberArray.push(liItems)


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
  return questionNumberArray
})
}

function submitTestFunc(list, list2){
  console.log(list)
  console.log(list.length)
  console.log(list2)
  console.log(list2.length)
  console.log(questionNumberArray)

  questionNumberArray.map(function(answerChoice){
    console.log()
    console.log(answerChoice)
    let choiceA = document.querySelector(".labelAnswerOne").value
    let choiceB = document.querySelector(".labelAnswerTwo").value
    let choiceC = document.querySelector(".labelAnswerThree").value
    let choiceD = document.querySelector(".labelAnswerFour").value

    let checkboxAnswerOne = document.querySelector(".checkboxAnswerOne").checked
    let checkboxAnswerTwo = document.querySelector(".checkboxAnswerTwo").checked
    let checkboxAnswerThree = document.querySelector(".checkboxAnswerThree").checked
    let checkboxAnswerFour = document.querySelector(".checkboxAnswerFour").checked
    let answer
    if (checkboxAnswerOne == true){
      answer = choiceA
      }
    else if (checkboxAnswerTwo == true){
      answer = choiceB
      }
    else if (checkboxAnswerThree == true){
      answer = choiceC
      }
    else if (checkboxAnswerFour == true) {
      answer = choiceD
      }
      console.log(answer)
  })
}
