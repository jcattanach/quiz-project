const DATABASE = firebase.database()

testsArray = []

function mapThruArray(tests){
  // let testAnswers = tests.map(function(test){
    console.log(tests[0])
  // })
}



var testRef = DATABASE.ref('Tests')
testRef.on('value', function(snapshot) {
  // tests = []
  var testUID = snapshot.val()
  console.log(testUID)
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
            testsArray.push(questionText)

          })

        })
      })
    })

  })
  mapThruArray(testsArray)
})


// console.log(testRef.child('LPWprHsJYj_avrYsjip').child('a').child('Questions').child(22963770868704470000).child("g"))
