let currentJSUser = localStorage.getItem("vCurrentUser")
let currentUserID = currentJSUser
console.log(currentUserID)

//variable element names
let textboxQuizName = document.getElementById('textboxQuizName')
let btnSubmitQuizName = document.getElementById('btnSubmitQuizName')
let headerQuizName = document.getElementById('headerQuizName')
let listQuestionAndAnswer = document.getElementById('listQuestionAndAnswer')
let addMultipleChoiceQuestion = document.getElementById('addMultipleChoiceQuestion')
let logOutButton = document.getElementById("logOutButton")

function deleteQuestionFunction(listItem) {
  whichList = listItem.parentElement
  whichList.removeChild(listItem)
}

enterQuestionAndAnswer = `
<li>
  <input type="text" id="quizQuestion" placeholder="Question"/>
  <input type="text" id="quizAnswer" placeholder="Answer" required/>
  <input type="text" id="quizWrongAnswer" placeholder="Alternative answer (optional)" />
  <input type="text" id="quizWrongAnswer" placeholder="Alternative answer (optional)" />
  <input type="text" id="quizWrongAnswer" placeholder="Alternative answer (optional)" />
  <button id="deleteQuestion" onclick="deleteQuestionFunction(this.parentElement)">remove question</button>
</li>`

enterMultipleChoice = `
<li>
  <input type="text" id="multipleChoiceQuestion" placeholder="Question"/>
  <input type="checkbox" id="checkboxMultipleChoiceAnswerOne"/>
  <input type="text" id="multipleChoiceAnswerOne" placeholder="Answer" />
  <input type="checkbox" id="checkboxMultipleChoiceAnswerTwo"/>
  <input type="text" id="multipleChoiceAnswerTwo" placeholder="Answer" />
  <input type="checkbox" id="checkboxMultipleChoiceAnswerThree"/>
  <input type="text" id="multipleChoiceAnswerThree" placeholder="Answer" />
  <input type="checkbox" id="checkboxMultipleChoiceAnswerFour"/>
  <input type="text" id="multipleChoiceAnswerFour" placeholder="Answer" />
  <button id="deleteQuestion" onclick="deleteQuestionFunction(this.parentElement)">remove question</button>
</li>`
//event listeners

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

logOutButton.addEventListener('click', function () {

  currentUserID = ""
  localStorage.setItem("vCurrentUser", currentUserID)
  document.location.href = "register.html"
})
