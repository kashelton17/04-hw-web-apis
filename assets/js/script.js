// find html elements that are going to be used, button(id #start) and div(class .game)
var startButton = document.getElementById('start')
var gameEl = document.querySelector('.game')  // this is the div that all the elements will go into
var timerEl = document.getElementById('timer')
var questionEl = document.getElementById('question')
var answer2El = document.getElementById('answer2')
var answer3El = document.getElementById('answer3')
var answer4El = document.getElementById('answer4')
var answer1El = document.getElementById('answer1')
var answerListEl = document.querySelector('ol')
var answerType = document.getElementById("answerType")
var showScoreEl = document.querySelector('.showScore')
var displayType = document.querySelectorAll('.hidden')
var scoreButton = document.getElementById('highscore')
var header = document.querySelector('header')

//create objects with question, three wrong answer parameters and one right answer parameter
var question1 = {
    question: 'What is the CSS parameter for text color?',
    answer1: 'textc',
    answer2: 'color',
    answer3: 'text-color',
    answer4: 'colorOfText',
    rightAnswer: this.answer2,
}
var question2 = {
    question: 'What HTML element would you add if you wanted a large body of text?',
    answer1: 'h1',
    answer2: 'div',
    answer3: 'body',
    answer4: 'p tag',
    rightAnswer: this.answer4
}
var question3 = {
    question: 'What is Taylor Swifts birthday?',
    answer1: 'January 1 1995',
    answer2: 'December 13 1989',
    answer3: 'February 14 1990',
    answer4: 'July 4 1989',
    rightAnswer: this.answer2
}
var question4 = {
    question: 'What is the difference between Java and Javascript?',
    answer1: 'They are two completely different languages',
    answer2: 'They are the same language',
    answer3: 'One is for Mac and one is for Windows',
    answer4: 'Neither exist',
    rightAnswer: this.answer1
}
var question5 = {
    question: 'What is the method to add an element to an array?',
    answer1: '.add()',
    answer2: '.pushElement()',
    answer3: '.push()',
    answer4: 'None of the above',
    rightAnswer: this.answer3
}
var question6 = {
    question: 'Who is the greatest NFL QB of all time?',
    answer1: 'Jay Cutler',
    answer2: 'Patrick Mahomes',
    answer3: 'Nick Foles',
    answer4: 'Tom Brady',
    rightAnswer: this.answer4
}
var question7 = {
    question: 'How can you style HTML elements',
    answer1: 'in HTML',
    answer2: 'in Javascript',
    answer3: 'in CSS',
    answer4: 'All of the above',
    rightAnswer: this.answer4
}
var question8 = {
    question: 'What is the correct term for HTML model?',
    answer1: 'DON: Do Only Numbers',
    answer2: 'DOM: Documet Object Model',
    answer3: 'DOW: Rhymes with cow',
    answer4: 'DOS: Document Object System',
    rightAnswer: this.answer2
}
var question9 = {
    question: 'What is one thing that helps a websites accessibility',
    answer1: 'Having no images',
    answer2: 'Having all colors be neon',
    answer3: 'alt tags on images',
    answer4: 'Keeping the layout the same for all window sizes',
    rightAnswer: this.answer3
}
var question10 = {
    question: 'How do you store something locally',
    answer1: '.setItem()',
    answer2: '.getItem()',
    answer3: '.storeItem()',
    answer4: 'None of the above',
    rightAnswer: this.answer1
}
var question11 = {
    question: 'Where do you link a script file',
    answer1: 'Can only do it in the Head',
    answer2: 'Can only do it in the body',
    answer3: 'At the very top of the HTML Document',
    answer4: 'Either in Head or bottomr of body',
    rightAnswer: this.answer4
}
var question12 = {
    question: 'What is the smartest breed of dog?',
    answer1: 'Pug',
    answer2: 'Border Collie',
    answer3: 'French Bulldog',
    answer4: 'Golden Retriever',
    rightAnswer: this.answer2
}
//create an array of objects
var questionArray = [question1, question2, question3, question4, question5, question6, question7, question8, question9, question10, question11, question12]

//create score object
var userScore = {
    lastGame: 0,
    totalScore: 0
}

var questionsAsked = {
    number: 0
}

var highScore = []
localStorage.setItem('highscore', JSON.stringify(highScore))

var questionNumber = 0
localStorage.setItem('question-number', questionNumber)

//add the highScore button
var highScoreList = document.createElement('ol')
var score1 = document.createElement('li')
var score2 = document.createElement('li')
var score3 = document.createElement('li')
var score4 = document.createElement('li')
var score5 = document.createElement('li')
scoreButton.addEventListener('click', function(event) {

    clearInterval(window.myTimer)
    for (var i = 0; i< displayType.length; i++) {
        displayType[i].setAttribute('class', 'hidden')
    }

    var scoreEl = [score1, score2, score3, score4, score5]

    highScoreList.setAttribute('class', 'scoreList')

    var storedHighScores = JSON.parse(localStorage.getItem('highscore'))
    console.log(storedHighScores)
    var sortedList = []
    
    sortedList = storedHighScores.sort(function(a, b){return b[0]-a[0]})
        
    console.log('sorted', sortedList)
    highScoreList.textContent = 'High Scores' 
    header.appendChild(highScoreList) 
    if (sortedList.length === 0) {
        highScoreList.textContent = ''
        highScoreList.textContent = 'No high scores'
        var playConfirm = confirm('No High scores Play Again?')
        if (playConfirm === true) {
            startGame()
            getQuestions()
        }
    } else {
        highScoreList.textContent =''
        if (sortedList.length < scoreEl.length) {
            for (var i=0; i < sortedList.length; i++) {
                scoreEl[i].textContent = String('Name: '+ sortedList[i][1]+ ' ----    Score: '+ sortedList[i][0])
                highScoreList.appendChild(scoreEl[i])
            }
        } 
        if (sortedList.length > scoreEl.length) {
            for (var i=0; i < scoreEl.length; i++) {
                scoreEl[i].textContent = String('Name: '+ sortedList[i][1]+ ' ----    Score: '+ sortedList[i][0])
                highScoreList.appendChild(scoreEl[i])
            }
        }
    }
})

// add event listener, when button is pressed, start game aka invoke function
startButton.addEventListener('click', function(event){
    startButton.remove()
    for (var i = 0; i< displayType.length; i++) {
        displayType[i].setAttribute('class', 'show')
    }
    
    gameEl.setAttribute('class', 'questions')
    startGame()
    getQuestions()
})

// create interval timer so that when timer is running the questions are presented and when timer runs out game is over and score is shown
// remove button from page
function startGame() {
    for (var i = 0; i< displayType.length; i++) {
        displayType[i].setAttribute('class', 'show')
    }
    count = 10
    timerEl.textContent = count + ' seconds left'
    window.myTimer = setInterval(function() {
        timerEl.textContet = count + ' seconds left'

        if (count > 0 ) {
            count--;
            timerEl.textContent = count + ' seconds left'
            
        } else {
            clearInterval(window.myTimer)
            gameOver()
        }
    }, 1000)
    
}


// create event listener so that when object is pressed score is recorded.
// create function that gets questions 
function getQuestions() {   
    storedQuestionNum = localStorage.getItem('question-number')
    storedQuestionNum = Number(storedQuestionNum)
    if (storedQuestionNum >= 11) {
        localStorage.setItem('question-number', '0')
    } else {
        console.log('stored' ,storedQuestionNum)
        console.log('stored + 1',storedQuestionNum+1)
        localStorage.setItem('question-number', String(storedQuestionNum+1))
    }
    
    var displayQuestion = questionArray[storedQuestionNum]

    //displaying questions and answers
    questionEl.textContent = displayQuestion.question
    answer1El.textContent = displayQuestion.answer1
    answer2El.textContent = displayQuestion.answer2
    answer3El.textContent = displayQuestion.answer3
    answer4El.textContent = displayQuestion.answer4

}




// adding event listener if object pressed is object.right answer, score = +1 otherwise score = 0
answerListEl.addEventListener("click", function(event) {
    var choosenAnswer = event.target
    console.log('choosen asnwer', choosenAnswer)

    //making sure the clicked target matches what the answer element is
    if (choosenAnswer.matches('a'))
    var storedQuestionNum = Number(localStorage.getItem('question-number'))
    var displayQuestion = questionArray[storedQuestionNum]
    console.log('displayQuestion', displayQuestion)
    displayAnswer(choosenAnswer, displayQuestion)
    
})


// displaying if the answer was correct or incorrect    
function displayAnswer(choosenAnswer, displayQuestion) {
    var answerGrade = ''
    if (choosenAnswer.textContent === displayQuestion.rightAnswer.textContent) {
        choosenAnswer=''
        answerGrade = 'Correct'
        userScore.lastGame++
        console.log('Score' ,userScore.lastGame)
    } else {
        answerGrade = 'Incorrect'
    }
    
    answerType.textContent = answerGrade
    setTimer = 1
    showAnswerType = setInterval(function() {
        if (setTimer > 0){
            setTimer--
            
        } else {
            clearInterval(showAnswerType)
            answerType.textContent = ''
        }
    }, 1000)
    getQuestions()
    
}


 
// the game over function shows the scores of the game
function gameOver() {
    for (var i = 0; i< displayType.length; i++) {
        displayType[i].setAttribute('class', 'hidden')
    } 
    

    //getting stored high scores and adding score 
    var storedHighScores = JSON.parse(localStorage.getItem('highscore'))
    var highScoreLength = storedHighScores.length
    console.log('high score' ,storedHighScores)
    var playerName = prompt('Please Enter your name', 'Name')
    storedHighScores.push([userScore.lastGame, playerName])
    localStorage.setItem('highscore', JSON.stringify(storedHighScores))

    lastGameScore = userScore.lastGame
    localStorage.setItem('last-game', lastGameScore)
    userScore.totalScore = Number(userScore.totalScore) + Number(lastGameScore)

    var displayScoreLast = document.createElement('h2')
    var displayScoreTotal = document.createElement('h2')
    var displayScoreHighScore = document.createElement('h2')

    displayScoreLast.textContent = 'Score last game: ' + userScore.lastGame
    displayScoreTotal.textContent = 'Total score: ' + userScore.totalScore

    showScoreEl.setAttribute('style', 'display: flex; justify-Content: center; align-items: center')
    var displayScores = [displayScoreLast, displayScoreTotal, displayScoreHighScore]
    for (var j=0; j<displayScores.length; j++) {
        displayScores[j].setAttribute('style', 'background: darkgrey; color: gold; margin: 10px; padding; 10px')
    }
    
    showScoreEl.appendChild(displayScoreLast)
    showScoreEl.appendChild(displayScoreTotal)
    showScoreEl.appendChild(displayScoreHighScore)

    userScore.lastGame = 0
    playAgain(displayScoreLast,displayScoreTotal,displayScoreHighScore)
}
// creating a way to end the game if highscore button pressed



function playAgain(x,y,z) {
    var playAgainButton = document.createElement('button')
    showScoreEl.appendChild(playAgainButton)
    playAgainButton.setAttribute('style', 'display: block; align-content: center')
    playAgainButton.textContent = 'PLay Again?'

    playAgainButton.addEventListener('click', function() {
        x.remove()
        y.remove()
        z.remove()
        playAgainButton.remove()
        for (var i = 0; i< displayType.length; i++) {
            displayType[i].setAttribute('class', 'show')
        }
        
        gameEl.setAttribute('class', 'questions')
        startGame()
    })
}

// if high score button is clicked display highscores
 



