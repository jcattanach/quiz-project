const DATABASE = firebase.database()
const TESTREF = DATABASE.ref("Tests")

//variable element names
let textboxQuizName = document.getElementById('textboxQuizName')
let btnSubmitQuizName = document.getElementById('btnSubmitQuizName')
let headerQuizName = document.getElementById('headerQuizName')
let listQuestionAndAnswer = document.getElementById('listQuestionAndAnswer')
let addMultipleChoiceQuestion = document.getElementById('addMultipleChoiceQuestion')
let submitButton = document.getElementById('submitButton')

function deleteQuestionFunction(listItem) {
  whichList = listItem.parentElement
  whichList.removeChild(listItem)
}

enterQuestionAndAnswer = `
<li>
  <input type="text" id="quizQuestion" placeholder="Question"/><br>
  <input type="text" id="quizAnswer" placeholder="Answer" required/>
  <input type="text" id="quizAlternativeAnswer" placeholder="Alternative answer (optional)" />
  <input type="text" id="quizAlternativeAnswer" placeholder="Alternative answer (optional)" />
  <input type="text" id="quizAlternativeAnswer" placeholder="Alternative answer (optional)" />
  <button id="deleteQuestion" onclick="deleteQuestionFunction(this.parentElement)">remove question</button>
</li>`

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
  let testTitle = headerQuizName.innerHTML
  let testName = { Name : testTitle}
  let testQuestion = document.getElementById('quizQuestion').value
  let testAnswer = document.getElementById('') 
  TESTREF.child(testTitle).set(testName)
}

submitButton.addEventListener('click', function() {
  saveTestToDatabase()
})

btnSubmitQuizName.addEventListener('click', function() {
  quizName = textboxQuizName.value
  headerQuizName.innerHTML = quizName
})
addQuestion.addEventListener('click', function() {
    listQuestionAndAnswer.insertAdjacentHTML('beforeend', enterQuestionAndAnswer)
})
addMultipleChoiceQuestion.addEventListener('click', function() {
    listQuestionAndAnswer.insertAdjacentHTML('beforeend', enterMultipleChoice)
})
