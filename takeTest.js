let currentJSUser = localStorage.getItem("vCurrentUser")
let currentUserID = currentJSUser
console.log(currentUserID)

const database = firebase.database()
const questRef = database.ref('Questions')
const answerRef = database.ref('Answers')

let testIDName = document.getElementById('testIDName')
let questionsListElement = document.getElementById('questionsListElement')
let startExam = document.createElement("button")
let logOutButton = document.getElementById("logOutButton")
let buttonSubmit = document.getElementById('buttonSubmit')
let submitButton = `<button id="btnTestSubmit" onclick='submitTestFunc(questionsForThisTest, questionsForThisTestKey)'>Submit Test</button>`
let teacherIdTextbox = document.getElementById('teacherIdTextbox')

let questions = []
let questionsForThisTest = []
let questionsForThisTestKey = []
let questionNumberArray = []
let answersToBeChecked = []
let allAnswers = []
let answerDictList = []

buttonSubmit.addEventListener('click',function(){
  let teacherID = teacherIdTextbox.value
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
      function addQuestions(){
     var liItems = `<li>
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


    questionsListElement.insertAdjacentHTML('beforeend', liItems)}
startExam.addEventListener('click',function(){
    addQuestions()
  })
  }})
  populateHeader(questionsForThisTest)
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
    } else {
      answer = 'none'
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
              count += 1
          }
        }
      }
      }
    scoreTest(count)
  }

function scoreTest(count){

  let score = (count / questionsForThisTest.length) * 100
  console.log(score + '%')
}


let container = document.getElementById("container")
let timeDisplayElement = document.querySelector('#timeDisplay');
let header = document.createElement("div")



function populateHeader(questionsForThisTest){
header.className = "header"
container.appendChild(header)

let h2header = document.createElement("h2")
header.appendChild(h2header)
h2header.innerHTML =" *#*"

let list = document.createElement("ul")
list.className = "quizDetails"
header.appendChild(list)

let numOfQuestion = document.createElement("li")
list.appendChild(numOfQuestion)
numOfQuestion.innerHTML = `Question: ${questionsForThisTest.length}`


let timeLimit = document.createElement("li")
list.appendChild(timeLimit)
timeLimit.innerHTML = "Time Limit : *#* Minutes "

let instructions = document.createElement("div")
container.appendChild(instructions)

let quizInstructions = document.createElement("h2")
instructions.appendChild(quizInstructions)
quizInstructions.innerHTML = "Instructions"

let instructionsContent = document.createElement("p")
instructions.appendChild(instructionsContent)
instructionsContent.innerHTML = "This is an individual assignment and students are prohibited from collaborating or communicating with anyone else during the exam. You should consider the exam conditions the same as any in class exam."


startExam.id = "startbtn"
instructions.appendChild(startExam)
startExam.innerHTML = "Start Exam"
}


startExam.addEventListener("click",function(){


startTime()
})

 var date = new Date()
 console.log(date)
 var year = date.getFullYear()
 var month = date.getMonth()


 function startTime() {
    var fiveMinutes = 122
      //showtime();
      var showcurtime = moment();
      var curtimeformat = showcurtime.format('h:mm:ss a');
      var showendtime = showcurtime.add(fiveMinutes, 's');
      var endtimeFormat = showendtime.format('h:mm:ss a');
      document.getElementById("starttime").innerHTML = `<h4>You started your Exam at ${curtimeformat} </h4>`; document.getElementById("endtime").innerHTML = `<h4>You should finish on your Exam at ${endtimeFormat}  </h4>`;



      startTimer(fiveMinutes);

  }

  //starttime()

  function startTimer(duration) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        timeDisplayElement.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
        }
        if (minutes >= 5 && minutes % 5 == 0 && seconds == 0) {
            console.log((minutes) + " Minutes Left")
        }
        else if (5 > minutes >= 1 && seconds == 0){
            console.log((minutes) + " Minutes Left")
            let popUpTime = document.getElementById("myPopup")
            popUpTime.classList.toggle("show")
        }
        else if (minutes == 0 && seconds % 30 == 0) {
            console.log((seconds) + " Seconds Left")
        }
        if (timer == 0) {
          currentUserID = ""
          localStorage.setItem("vCurrentUser", currentUserID)
          //document.location.href = "register.html"
        }
    }
    , 1000);
}
logOutButton.addEventListener('click', function () {
currentUserID = ""
  localStorage.setItem("vCurrentUser", currentUserID)
  document.location.href = "index.html"
})
