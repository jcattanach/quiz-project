
const DATABASE = firebase.database()
const TESTREF = DATABASE.ref("Tests")
const QUESTREF = DATABASE.ref("Questions")
const ANSWERREF = DATABASE.ref("Answers")
const USERCATEGORYREF = DATABASE.ref("Users")

let currentJSUser = localStorage.getItem("vCurrentUser")
let currentUserID = currentJSUser
//console.log(currentUserID)
//variable element names
let textboxQuizName = document.getElementById('textboxQuizName')
let btnSubmitQuizName = document.getElementById('btnSubmitQuizName')
let headerQuizName = document.getElementById('headerQuizName')
//let listQuestionAndAnswer = document.getElementById('listQuestionAndAnswer')
let addMultipleChoiceQuestion = document.getElementById('addMultipleChoiceQuestion')

let submitButton = document.getElementById('submitButton')

let logOutButton = document.getElementById("logOutButton")
let number
//testQuestionType1IDArray = []
testQuestionType2IDArray = []

function deleteQuestionFunction(listItem) {
  whichList = listItem.parentElement
  whichList.removeChild(listItem)

    let numberToRemove = listItem.id
    console.log(numberToRemove)
    for (let index = 0; index < testQuestionType2IDArray.length; index++) {
      console.log(testQuestionIDArray[index])
      console.log(numberToRemove)
      if (testQuestionType2IDArray[index] == numberToRemove) {
        console.log("same Number")
      testQuestionType2IDArray.splice(index, 1)
  }
}
  console.log(testQuestionType2IDArray)
}



function saveTestToDatabase(){
  let testTitle = headerQuizName.innerHTML
  let uniqueTestIDRef = TESTREF.push()
  console.log(uniqueTestIDRef)
  //saveQuestionType1ToDatabase(testTitle, uniqueTestIDRef)
  saveQuestionType2ToDatabase(testTitle, uniqueTestIDRef)

}

// function saveQuestionType1ToDatabase(testTitle, uniqueTestIDRef){


//   console.log(uniqueTestIDRef.path.pieces_[1])
//   testQuestionType1IDArray.map(function () {
//     console.log(unqiueQuestionNumber)
//     let questionText = document.getElementById(unqiueQuestionNumber).childNodes[1].value
//     let mainAnswer = document.getElementById(unqiueQuestionNumber).childNodes[4].value
//     let altAnswer1 = document.getElementById(unqiueQuestionNumber).childNodes[6].value
//     let altAnswer2 = document.getElementById(unqiueQuestionNumber).childNodes[8].value
//     let altAnswer3 = document.getElementById(unqiueQuestionNumber).childNodes[10].value
//     console.log(questionText, mainAnswer, altAnswer1, altAnswer2, altAnswer3)
//     questionObject = { "question" : questionText,
//                         "Answer" : mainAnswer,
//                       "AltAnswerOne" : altAnswer1,
//                       "AltAnswerTwo": altAnswer2,
//                       "AltAnswerThree": altAnswer3}

//     uniqueTestIDRef.child(testTitle).child("Questions").child("Question Type 1").child(unqiueQuestionNumber).set(questionObject)
//     USERCATEGORIESREF.child("Teachers").child(currentUserID).child("Tests").child(uniqueTestIDRef.path.pieces_[1]).child(testTitle).child("Questions").child("Question Type 1").child(unqiueQuestionNumber).set(questionObject)
//   })

// }

function saveQuestionType2ToDatabase(testTitle, uniqueTestIDRef) {

  console.log(uniqueTestIDRef.path.pieces_[1])
  testQuestionType2IDArray.map(function (unqiueQuestionNumber) {
    console.log(unqiueQuestionNumber)
    console.log(document.getElementById(unqiueQuestionNumber).childNodes)
    let questionText = document.getElementById(unqiueQuestionNumber).childNodes[1].value
    let choiceA = document.getElementById(unqiueQuestionNumber).childNodes[6].value
    let choiceB = document.getElementById(unqiueQuestionNumber).childNodes[11].value
    let choiceC = document.getElementById(unqiueQuestionNumber).childNodes[16].value
    let choiceD = document.getElementById(unqiueQuestionNumber).childNodes[21].value

    let choiceACheckbox = document.getElementById(unqiueQuestionNumber).childNodes[4].checked
    let choiceBCheckbox = document.getElementById(unqiueQuestionNumber).childNodes[9].checked
    let choiceCCheckbox = document.getElementById(unqiueQuestionNumber).childNodes[14].checked
    let choiceDCheckbox = document.getElementById(unqiueQuestionNumber).childNodes[19].checked
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


    console.log(questionText, choiceA, choiceB, choiceC, choiceD)
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

// addQuestion.addEventListener('click', function() {

//   let number = Math.floor(Math.random() * 100000000000000000000)


//   enterQuestionAndAnswer = `
// <li class="questionType1LI" id="${number}">
//   <input type="text" id="quizQuestion" placeholder="Question"/><br>
//   <input type="text" id="quizAnswer" placeholder="Answer" required/>
//   <input type="text" id="quizAlternativeAnswer" placeholder="Alternative answer (optional)" />
//   <input type="text" id="quizAlternativeAnswer" placeholder="Alternative answer (optional)" />
//   <input type="text" id="quizAlternativeAnswer" placeholder="Alternative answer (optional)" />
//   <button id="deleteQuestion" onclick="deleteQuestionFunction(this.parentElement)">remove question</button>
// </li>`

//   testQuestionType1IDArray.push(number)

//   listQuestionAndAnswer.insertAdjacentHTML('beforeend', enterQuestionAndAnswer)


// })

addMultipleChoiceQuestion.addEventListener('click', function() {

let number = Math.floor(Math.random() * 100000000000000000000)

  enterMultipleChoice = `
<li li class="questionType2LI" id="${number}">
  <input type="text" id="multipleChoiceQuestion" placeholder="Question"/><br>A.
  <input type="checkbox" id="checkboxMultipleChoiceAnswerOne"/>
  <input type="text" id="multipleChoiceAnswerOne" placeholder="Answer" /><br>B.
  <input type="checkbox" id="checkboxMultipleChoiceAnswerTwo"/>
  <input type="text" id="multipleChoiceAnswerTwo" placeholder="Answer" /><br>C.
  <input type="checkbox" id="checkboxMultipleChoiceAnswerThree"/>
  <input type="text" id="multipleChoiceAnswerThree" placeholder="Answer" /><br>D.
  <input type="checkbox" id="checkboxMultipleChoiceAnswerFour"/>
  <input type="text" id="multipleChoiceAnswerFour" placeholder="Answer" />
  <button id="deleteQuestion" onclick="deleteQuestionFunction(this.parentElement)">remove question</button>
</li>`

  testQuestionType2IDArray.push(number)



  listQuestionAndAnswer.insertAdjacentHTML('beforeend', enterMultipleChoice)
})

logOutButton.addEventListener('click', function () {

  currentUserID = ""
  localStorage.setItem("vCurrentUser", currentUserID)
  document.location.href = "register.html"
})
