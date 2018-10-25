let container = document.getElementById("container")
let timeDisplayElement = document.querySelector('#timeDisplay');
let header = document.createElement("div")
header.className = "header"
container.appendChild(header)

let h2header = document.createElement("h2")
header.appendChild(h2header)
h2header.innerHTML =" Firebase Final Exam"

let list = document.createElement("ul")
list.className = "quizDetails"
header.appendChild(list)

let examDueDate = document.createElement("li")
list.appendChild(examDueDate)
examDueDate.innerHTML = " Due: OCT 29, 2018 at 04:00pm"

let questions = document.createElement("li")
list.appendChild(questions)
questions.innerHTML = "Questions: 10 "

let available = document.createElement("li")
list.appendChild(available)
available.innerHTML = " Available : OCT 22, 2018 at 9am - OCT 29, 2018 at 04:00 pm 7 days"

let points = document.createElement("li")
list.appendChild(points)
points.innerHTML = "Points: 50 "


let timeLimit = document.createElement("li")
list.appendChild(timeLimit)
timeLimit.innerHTML = "Time Limit : 90 Minutes "

let instructions = document.createElement("div")
container.appendChild(instructions)

let quizInstructions = document.createElement("h2")
instructions.appendChild(quizInstructions)
quizInstructions.innerHTML = "Instructions"

let instructionsContent = document.createElement("p")
instructions.appendChild(instructionsContent)
instructionsContent.innerHTML = "This is an individual assignment and students are prohibited from collaborating or communicating with anyone else during the exam. You should consider the exam conditions the same as any in class exam."

let startExam = document.createElement("button")
startExam.id = "startbtn"
instructions.appendChild(startExam)
startExam.innerHTML = "Start Exam"

startExam.addEventListener("click",function(){

starttime()
})

 var date = new Date()
 console.log(date)
 var year = date.getFullYear()
 var month = date.getMonth()


 function starttime() {
    var fiveMinutes = 310
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
            console.log("Message to alert every 5 minutes")
        }
        else if (5 > minutes >= 1 && seconds == 0){
            console.log("Message to alert every 1 minutes")
        }
        else if (minutes = 0 && seconds % 30) {
            console.log("Message to alert every 30 seconds")
        }
        if (timer == 0) {
          currentUserID = ""
          localStorage.setItem("vCurrentUser", currentUserID)
          document.location.href = "register.html"
        }
    }
    , 1000);
}
