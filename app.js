
const DATABASE = firebase.database()
const TESTREF = DATABASE.ref("Tests")
const QUESTREF = DATABASE.ref("Questions")
const ANSWERREF = DATABASE.ref("Answers")
const USERCATEGORYREF = DATABASE.ref("Users")

let currentJSUser = localStorage.getItem("vCurrentUser")
let currentUserID = currentJSUser

let textboxQuizName = document.getElementById('textboxQuizName')
let btnSubmitQuizName = document.getElementById('btnSubmitQuizName')
let headerQuizName = document.getElementById('headerQuizName')
let addMultipleChoiceQuestion = document.getElementById('addMultipleChoiceQuestion')

let submitButton = document.getElementById('submitButton')

let logOutButton = document.getElementById("logOutButton")
let number
testQuestionType2IDArray = []

function deleteQuestionFunction(listItem) {
  whichList = listItem.parentElement
  whichList.removeChild(listItem)

    let numberToRemove = listItem.id
    for (let index = 0; index < testQuestionType2IDArray.length; index++) {
      if (testQuestionType2IDArray[index] == numberToRemove) {
      testQuestionType2IDArray.splice(index, 1)
  }
}
  console.log(testQuestionType2IDArray)
}



function saveTestToDatabase(){
  let testTitle = headerQuizName.innerHTML
  let uniqueTestIDRef = TESTREF.push()
  console.log(uniqueTestIDRef)
  saveQuestionType2ToDatabase(testTitle, uniqueTestIDRef)

}

function saveQuestionType2ToDatabase(testTitle, uniqueTestIDRef) {

  console.log(uniqueTestIDRef.path.pieces_[1])
  testQuestionType2IDArray.map(function (unqiueQuestionNumber) {
    console.log(unqiueQuestionNumber)
    console.log(document.getElementById(unqiueQuestionNumber).childNodes)
    let questionText = document.getElementById("multipleChoiceQuestion" + unqiueQuestionNumber).value
    let choiceA = document.getElementById("multipleChoiceAnswerOne" + unqiueQuestionNumber).value
    let choiceB = document.getElementById("multipleChoiceAnswerTwo" + unqiueQuestionNumber).value
    let choiceC = document.getElementById("multipleChoiceAnswerThree" + unqiueQuestionNumber).value
    let choiceD = document.getElementById("multipleChoiceAnswerFour" + unqiueQuestionNumber).value

    let choiceACheckbox = document.getElementById("checkboxMultipleChoiceAnswerOne" + unqiueQuestionNumber).checked
    let choiceBCheckbox = document.getElementById("checkboxMultipleChoiceAnswerTwo" + unqiueQuestionNumber).checked
    let choiceCCheckbox = document.getElementById("checkboxMultipleChoiceAnswerThree" + unqiueQuestionNumber).checked
    let choiceDCheckbox = document.getElementById("checkboxMultipleChoiceAnswerFour" +unqiueQuestionNumber).checked
    let answer
    if (choiceACheckbox == true){
      answer = choiceA
      }
    else if (choiceBCheckbox == true){
      answer = choiceB
      }
    else if (choiceCCheckbox == true){
      answer = choiceC
      }
    else if (choiceDCheckbox == true) {
      answer = choiceD
      }


    questionMultipleChoiceObject = {
      "ChoiceA": choiceA,
      "ChoiceB": choiceB,
      "ChoiceC": choiceC,
      "ChoiceD": choiceD,
      "question": questionText,
      "testID": uniqueTestIDRef.path.pieces_[1]
    }
    answerMultipleChoiceObject = {"Answer": answer}
    let uniqueTestID = { Test: uniqueTestIDRef.path.pieces_[1]}
    uniqueTestIDRef.set(testTitle)
    QUESTREF.child(unqiueQuestionNumber).set(questionMultipleChoiceObject)
    ANSWERREF.child(unqiueQuestionNumber).set(answerMultipleChoiceObject)
    USERCATEGORYREF.child(currentUserID).child("Tests").child(uniqueTestIDRef.path.pieces_[1]).set(testTitle)
  })

}

submitButton.addEventListener('click', function() {
  saveTestToDatabase()
  testQuestionType2IDArray = []
  listQuestionAndAnswer.innerHTML = ""
  headerQuizName.innerHTML = ""
})

btnSubmitQuizName.addEventListener('click', function() {
  quizName = textboxQuizName.value
  headerQuizName.innerHTML = quizName
})


addMultipleChoiceQuestion.addEventListener('click', function() {

let number = Math.floor(Math.random() * 100000000000000000000)

  enterMultipleChoice = `
<li li class="questionType2LI" id="${number}">
  <input type="text" class="multipleChoiceQuestion" id="multipleChoiceQuestion${number}" placeholder="Question"/><br>A.
  <input type="checkbox" class="checkboxMultipleChoiceAnswerOne" id="checkboxMultipleChoiceAnswerOne${number}"/>
  <input type="text" class="multipleChoiceAnswerOne" id="multipleChoiceAnswerOne${number}" placeholder="Answer" /><br>B.
  <input type="checkbox" class="checkboxMultipleChoiceAnswerTwo" id="checkboxMultipleChoiceAnswerTwo${number}"/>
  <input type="text" class="multipleChoiceAnswerTwo" id="multipleChoiceAnswerTwo${number}" placeholder="Answer" /><br>C.
  <input type="checkbox" class="checkboxMultipleChoiceAnswerThree" id="checkboxMultipleChoiceAnswerThree${number}"/>
  <input type="text" class="multipleChoiceAnswerThree" id="multipleChoiceAnswerThree${number}" placeholder="Answer" /><br>D.
  <input type="checkbox" class="checkboxMultipleChoiceAnswerFour" id="checkboxMultipleChoiceAnswerFour${number}"/>
  <input type="text" class="multipleChoiceAnswerFour" id="multipleChoiceAnswerFour${number}" placeholder="Answer" />
  <button class="deleteQuestion" id="deleteQuestion${number}" onclick="deleteQuestionFunction(this.parentElement)">remove question</button>
</li>`

  testQuestionType2IDArray.push(number)



  listQuestionAndAnswer.insertAdjacentHTML('beforeend', enterMultipleChoice)
})

logOutButton.addEventListener('click', function () {

  currentUserID = ""
  localStorage.setItem("vCurrentUser", currentUserID)
  document.location.href = "register.html"
})
