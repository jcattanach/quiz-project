const database = firebase.database()
const answerRef = database.ref('Answers')
const questRef = database.ref('Questions')

let questionKeys = []

questRef.on('value', function(snapshot) {
  snapshot.forEach(function(childSnapshot){
    let questionData = childSnapshot.val()
    console.log(childSnapshot.key)
    questionIdKey = childSnapshot.key
    questionKeys.push(questionIdKey)
})
checkAnswer(questionKeys)
})

function checkAnswer(list) {
  answerRef.orderByKey().equalTo(list[0]).on('value', function(snapshot){
  console.log(snapshot.val())
  snapshot.forEach(function(childSnapshot){
    let questionAnswer = childSnapshot.val().Answer
    console.log(questionAnswer)
  })
})
}
