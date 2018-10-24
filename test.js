let wrapper = document.getElementById("wrapper")
let exam = document.createElement("div")
exam.id = "examQuiz"
wrapper.appendChild(exam)
let quizExam = document.getElementById("examQuiz")

let  myQuestions = [
	{
		question: "What is 10/2?",
		answers: {
			a: '3',
			b: '5',
			c: '115'
		},
		correctAnswer: 'b'
	},
	{
		question: "What is 30/3?",
		answers: {
			a: '3',
			b: '5',
			c: '10'
		},
		correctAnswer: 'c'
	}
];


function questionLoop(list){
  console.log(list)
  for(i=0;i<list.length;i++){
    console.log(list[i].question)
    for (answer in list[i].answers){
       console.log(answer)
     }
    console.log(list[i].answers)
    console.log(list[i].correctAnswer)
  }
}


function showQuestions(){
   let output = []
    output.innerHTML = myQuestions
    exam.appendChild("output")

}




questionLoop(myQuestions)
