const DATABASE = firebase.database()

let container = document.getElementById('container')

questionsArray = []
testsArray = []

function mapThruArray(tests){
  let altAnswer = 'Choice A'
  let testAnswers = tests.map(function(test){
    console.log(test.question)
    console.log(test.Answer)
    console.log(test.AltAnswerOne, test.AltAnswerTwo, test.AltAnswerThree)
    liItems = `<li>
    <h3>${test.question}<h/3>
    <input type='text' placeholder='answer'/>
    </li>`

    container.insertAdjacentHTML('beforeend', liItems)
  })
}



var testRef = DATABASE.ref('Tests')
testRef.on('value', function(snapshot) {
  questionsArray = []
  var testUID = snapshot.val()
  console.log(testUID)
  testsArray.push(testUID)
  snapshot.forEach(function(childSnapshot){
    var testName = childSnapshot.val()
    console.log(testName)
    childSnapshot.forEach(function(childChildSnapshot) {
      var questions = childChildSnapshot.val()
      console.log(questions)
      childChildSnapshot.forEach(function(childChildChildSnapshot) {
        var questionType = childChildChildSnapshot.val()
        console.log(childChildChildSnapshot.val())
        childChildChildSnapshot.forEach(function(childChildChildChildSnapshot){
          var questionUID = childChildChildChildSnapshot.val()
          console.log(questionUID)
          childChildChildChildSnapshot.forEach(function(x){
            var questionText = x.val()
            console.log(questionText)
            questionsArray.push(questionText)

          })

        })
      })
    })

  })
  console.log(testsArray)
  mapThruArray(questionsArray)
})


// console.log(testRef.child('LPWprHsJYj_avrYsjip').child('a').child('Questions').child(22963770868704470000).child("g"))
