//variable element names
let textboxQuizName = document.getElementById('textboxQuizName')
let btnSubmitQuizName = document.getElementById('btnSubmitQuizName')
let headerQuizName = document.getElementById('headerQuizName')
let listQuestionAndAnswer = document.getElementById('listQuestionAndAnswer')

function deleteQuestionFunction(listItem) {
  whichList = listItem.parentElement
  whichList.removeChild(listItem)
}

enterQuestionAndAnswer = `
<li>
  <input type="text" id="quizQuestion" placeholder="Enter the question"/>
  <input type="text" id="quizAnswer" placeholder="Enter the answer" required/>
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
