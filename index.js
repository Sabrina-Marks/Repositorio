const $startGameButton = document.querySelector(".start-quiz")
const $questionsContainer = document.querySelector(".question-container")
const $answerContainer = document.querySelector(".answer-container")
const $questionText = document.querySelector(".question")
const $nextQuestionButton = document.querySelector(".next-question")

$startGameButton.addEventListener("click", iniciarJogo)
$nextQuestionButton.addEventListener("click", displayNextQuestion)

let curretQuestionIndex = 0
let totalCorrect = 0

function iniciarJogo() {
   $startGameButton.classList.add("hide")
   $questionsContainer.classList.remove("hide")
   displayNextQuestion()
}

function displayNextQuestion() {
resetState()
if (questions.length === curretQuestionIndex){
    return finishGame()
}

$questionText.textContent = questions[curretQuestionIndex].question
questions[curretQuestionIndex].answer.forEach(answer => {
    const newAnswer = document.createElement("button")
    newAnswer.classList.add("button","answer")
    newAnswer.textContent = answer.text
    if(answer.correct){
        newAnswer.dataset.correct = answer.correct
    }
    $answerContainer.appendChild(newAnswer)

    newAnswer.addEventListener("click", selectAnswer)
})
}

function resetState() {
    while($answerContainer.firstChild) {
        $answerContainer.removeChild($answerContainer.firstChild)
     }
     
     document.body.removeAttribute("class")
     $nextQuestionButton.classList.add("hide")

}

function selectAnswer(event) {
    const answerClicked = event.target

    if(answerClicked.dataset.correct){
        document.body.classList.add("correct")
        totalCorrect++
    } else{
        document.body.classList.add("incorrect")
    }

    document.querySelectorAll(".answer").forEach(button => {
        if(button.dataset.correct){
            button.classList.add("correct")
        } else{
            button.classList.add("incorrect")
        }

        button.disabled = true

    } )


 $nextQuestionButton.classList.remove("hide")
 curretQuestionIndex++
}

function finishGame() {
    const totalQuestion = questions.length
    const performance = Math.floor(totalCorrect *100 / totalQuestion)

    let message = " "

    switch(true){
        case(performance >= 90):
        message = "Excelente!! :)"
        break
        case(performance >= 70):
        message = "Muito bom :)"
        break
        case (performance >=50 ):
        message = "Bom"
        break
        default:
        message = "Tente novamente:("
    }
    $questionsContainer.innerHTML = 
    ` 
    <p class="final-message">
    Você acertou ${totalCorrect} de ${totalQuestion}
    <span> Resultado ${message}</span>
    </p>
    <button onclick=window.location.reload() class="button"> 
    Refazer teste
    </button>
    `

}

const questions = [
   {
       question: "Qual era o nome original do grupo Fifth Harmony?",
       answer: [ 
        { text: "Fab Five", incorrect: false},
        { text: "Lylas", correct: true},
        { text: "Harmonize", incorrect: false} ,
        { text: "Girl Power", incorrect: false},
      ],
   },
   {
       question : "Qual das integrantes do Fifth Harmony saiu do grupo em 2016?",
       answer: [
        { text: "Camila Cabello", correct: true},
        { text: "Lauren Jauregui", correct: false},
        { text: "Normani Kordei", correct: false},
        { text: "Ally Brooke", correct: false},
     ],
   },
   {
      question: "Qual música do Fifth Harmony alcançou o primeiro lugar nas paradas da Billboard?",
      answer: [
       { text: "Work from Home", correct: false}, 
       { text: "Worth It", correct: true},
       { text: "All In My Head (Flex)", correct: false},
       { text: "Down", correct: false},
       ],
   },
   {
        question : "Em que programa de televisão o Fifth Harmony se formou?",
        answer : [
            { text: "The Voice", correct: false},
            { text: "The X Factor", correct: true}, 
            { text: "American Idol", correct: false}, 
            { text: "America's Got Talent", correct: false},
       ],
   },
   {
        question : "Quantas integrantes originais havia no Fifth Harmony?",
        answer: [
            { text: "5", correct: true}, 
            { text: "6", correct: false}, 
            { text: "4", correct: false}, 
            { text: "3", correct: false},
       ],
   },
   {
        question: "Qual integrante do Fifth Harmony foi finalista do programa Dancing with the Stars?",
        answer: [
            { text: "Camila Cabello", correct: false},
            { text: "Lauren Jauregui", correct: false},
            { text: "Normani Kordei", correct: true},  
            { text: "Dinah Jane", correct: false},
       ],
   },
   {
        question : "Em que ano o Fifth Harmony anunciou seu hiato indefinido?",
        answer: [
            { text: "2017", correct: true},
            { text: "2018", correct: false}, 
            { text: "2019", correct: false},
            { text: "2020", correct: false}, 
       ],
   },
]
