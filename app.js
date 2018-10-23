
const DATABASE = firebase.database()
const TESTREF = DATABASE.ref("Tests")

let currentJSUser = localStorage.getItem("vCurrentUser")
let currentUserID = currentJSUser
//console.log(currentUserID)
//variable element names
let textboxQuizName = document.getElementById('textboxQuizName')
let btnSubmitQuizName = document.getElementById('btnSubmitQuizName')
let headerQuizName = document.getElementById('headerQuizName')
let listQuestionAndAnswer = document.getElementById('listQuestionAndAnswer')
let addMultipleChoiceQuestion = document.getElementById('addMultipleChoiceQuestion')

let submitButton = document.getElementById('submitButton')

let logOutButton = document.getElementById("logOutButton")
let number
testQuestionIDArray = []

function deleteQuestionFunction(listItem) {
  whichList = listItem.parentElement
  whichList.removeChild(listItem)
  
    let numberToRemove = listItem.id
    console.log(numberToRemove)
    for (let index = 0; index < testQuestionIDArray.length; index++) {
      console.log(testQuestionIDArray[index])
      console.log(numberToRemove)
      if (testQuestionIDArray[index] == numberToRemove) {
        console.log("same Number")
      testQuestionIDArray.splice(index, 1)
  
  }
      
}
  console.log(testQuestionIDArray)
}






enterMultipleChoice = `
<li>
  <input type="text" id="multipleChoiceQuestion" placeholder="Question"/><br>
  <input type="checkbox" id="checkboxMultipleChoiceAnswerOne"/>
  <input type="text" id="multipleChoiceAnswerOne" placeholder="Answer" /><br>
  <input type="checkbox" id="checkboxMultipleChoiceAnswerTwo"/>
  <input type="text" id="multipleChoiceAnswerTwo" placeholder="Answer" /><br>
  <input type="checkbox" id="checkboxMultipleChoiceAnswerThree"/>
  <input type="text" id="multipleChoiceAnswerThree" placeholder="Answer" /><br>
  <input type="checkbox" id="checkboxMultipleChoiceAnswerFour"/>
  <input type="text" id="multipleChoiceAnswerFour" placeholder="Answer" />
  <button id="deleteQuestion" onclick="deleteQuestionFunction(this.parentElement)">remove question</button>
</li>`

function saveTestToDatabase(){
  //let testTitle = headerQuizName.innerHTML
  //let testName = { Name : testTitle}
  //TESTREF.child(testTitle).set(testName)

  testQuestionIDArray.map(function (questionObject) {
    let questionText = document.getElementById(questionObject).childNodes[1].value
    let mainAnswer = document.getElementById(questionObject).childNodes[4].value
    let altAnswer1 = document.getElementById(questionObject).childNodes[6].value
    let altAnswer2 = document.getElementById(questionObject).childNodes[8].value
    let altAnswer3 = document.getElementById(questionObject).childNodes[10].value
    console.log(questionText, mainAnswer, altAnswer1, altAnswer2, altAnswer3)
})
}

submitButton.addEventListener('click', function() {
  saveTestToDatabase()

})

btnSubmitQuizName.addEventListener('click', function() {
  quizName = textboxQuizName.value
  headerQuizName.innerHTML = quizName
})
addQuestion.addEventListener('click', function() {
  
  let number = Math.floor(Math.random() * 100000000000000000000)

  

  enterQuestionAndAnswer = `
<li class="questionLI" id="${number}">
  <input type="text" id="quizQuestion" placeholder="Question"/><br>
  <input type="text" id="quizAnswer" placeholder="Answer" required/>
  <input type="text" id="quizAlternativeAnswer" placeholder="Alternative answer (optional)" />
  <input type="text" id="quizAlternativeAnswer" placeholder="Alternative answer (optional)" />
  <input type="text" id="quizAlternativeAnswer" placeholder="Alternative answer (optional)" />
  <button id="deleteQuestion" onclick="deleteQuestionFunction(this.parentElement)">remove question</button>
</li>`

  testQuestionIDArray.push(number)

  listQuestionAndAnswer.insertAdjacentHTML('beforeend', enterQuestionAndAnswer)


})
addMultipleChoiceQuestion.addEventListener('click', function() {

  listQuestionAndAnswer.insertAdjacentHTML('beforeend', enterMultipleChoice)
})

logOutButton.addEventListener('click', function () {

  currentUserID = ""
  localStorage.setItem("vCurrentUser", currentUserID)
  document.location.href = "register.html"
})

