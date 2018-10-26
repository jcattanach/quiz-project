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
let allAnswers = []
let answerDictList = []

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
    <input class='checkboxAnswerOne' id='checkboxAnswerOne${question.key}' type="checkbox"/>
    <label class='labelAnswerOne' id='labelAnswerOne${question.key}' >${question.val().ChoiceA}</label><br>B.
    <input class='checkboxAnswerTwo' id='checkboxAnswerTwo${question.key}' type="checkbox"/>
    <label class='labelAnswerTwo' id='labelAnswerTwo${question.key}' >${question.val().ChoiceB}</label><br>C.
    <input class='checkboxAnswerThree' id='checkboxAnswerThree${question.key}' type="checkbox"/>
    <label class='labelAnswerThree' id='labelAnswerThree${question.key}' >${question.val().ChoiceC}</label><br>D.
    <input class='checkboxAnswerFour' id='checkboxAnswerFour${question.key}' type="checkbox"/>
    <label class='labelAnswerFour' id='labelAnswerFour${question.key}' >${question.val().ChoiceD}</label>
    </li>`

    //console.log("checkboxAnswerTwo" + question.key)
    questionNumberArray.push(question.key)
    //console.log(questionNumberArray)


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

  questionNumberArray.map(function(uniqueQuestionNumber){
    let choiceA = document.getElementById("labelAnswerOne" + uniqueQuestionNumber).innerHTML
    let choiceB = document.getElementById("labelAnswerTwo" + uniqueQuestionNumber).innerHTML
    let choiceC = document.getElementById("labelAnswerThree" + uniqueQuestionNumber).innerHTML
    let choiceD = document.getElementById("labelAnswerFour" + uniqueQuestionNumber).innerHTML

    let checkboxAnswerOne = document.getElementById("checkboxAnswerOne" + uniqueQuestionNumber).checked
    let checkboxAnswerTwo = document.getElementById("checkboxAnswerTwo" + uniqueQuestionNumber).checked
    let checkboxAnswerThree = document.getElementById("checkboxAnswerThree" + uniqueQuestionNumber).checked
    let checkboxAnswerFour = document.getElementById("checkboxAnswerFour" + uniqueQuestionNumber).checked
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

      let answerCheck = { Answer : answer,QuestionID : uniqueQuestionNumber}
      answersToBeChecked.push(answerCheck)

    })
  answerRef.on('value', function(snapshot){
    snapshot.forEach(function(childSnapshot){
      allAnswers.push(childSnapshot)

    })
    compareAnswers(answersToBeChecked, allAnswers)
  })


}

let count = 0

function compareAnswers(userAnswersList , databaseAnswersList){
    databaseAnswersList.map(function(answer){
      let answerKey = answer.key
      let answerAnswer = answer.val().Answer
      let answerDict = { Answer : answerAnswer ,QuestionID : answerKey}
      answerDictList.push(answerDict)
    })
    for(let i=0;i<answerDictList.length;i++){
      for(let j=0;j<userAnswersList.length;j++){
        if(answerDictList[i].QuestionID == userAnswersList[j].QuestionID){
          let correctAnswer = answerDictList[i].Answer
          let studentAnswer = userAnswersList[j].Answer
          let correctAnswerKey = answerDictList[i].QuestionID
          let studentAnswerKey = userAnswersList[j].QuestionID
            if(answerDictList[i].Answer == userAnswersList[j].Answer){
              count = count + 1
          }
        }
      }
      }
    score(count)
  }

function score(count){

  let score = (count / questionsForThisTest.length) * 100
  console.log(score + '%')
}
