let container = document.getElementById("container")

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
  location.href = "file:///Users/eslamamin/Desktop/practise/test.html";

})
