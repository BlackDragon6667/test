

const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const questionContainer = document.querySelector(".question-container");
const questionTitle = document.querySelector(".question-title");
const answerIndicatorContainer = document.querySelector(".answer-indicator");
const homeBox = document.querySelector(".home-box");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");
const endBox = document.querySelector(".end-box")
const time001 = document.querySelector(".time001")

let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];
let correctAnswer = 0;
let wrongAnswer = 0;
// let name = "";






function setAvailableQuestions(){
     const totalQuestion = quiz.length;
     for(let i=0; i<totalQuestion; i++){
         availableQuestions.push(quiz[i])
     }
   
}

//set question number
function getNewQuestion(){
    questionNumber.innerHTML = "Question " + (questionCounter + 1) + " of " + quiz.length;

    //set question text 

    //get random qustion
     const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)]
    currentQuestion = questionIndex
    questionText.innerHTML = currentQuestion.q;
    questionTitle.innerHTML = currentQuestion.t;
    //console.log(questionIndex)
    //gets the poition of 'questionindex' from the availablequeston array;
    const index1= availableQuestions.indexOf(questionIndex);
    availableQuestions.splice(index1,1);

    //ser option
    //get the length of option
    const optionLen = currentQuestion.options.length

    for(let i=0; i<optionLen; i++){
        availableOptions.push(i)
    }
    

    questionContainer.innerHTML = '';
    let animationDelay = 0.15;
    
    for(let i=0; i<optionLen; i++){
        //random toptions 
        const optionIndex = availableOptions[Math.floor(Math.random() * availableOptions.length)];
        const index2 = availableOptions.indexOf(optionIndex);
        // so the questions dose not repeat
        availableOptions.splice(index2,1);
        // console.log(optionIndex)
        const option = document.createElement("div");
        option.innerHTML = currentQuestion.options[optionIndex];
        option.id = optionIndex;
        option.style.animationDelay = animationDelay + 's';
        animationDelay = animationDelay + 0.15;
        option.className = "option";
        questionContainer.appendChild(option)
        option.setAttribute("onclick","getResult(this)");
    }

    questionCounter++
}


// get the correct resut
function getResult(element){
    const id = parseInt(element.id);
    //get the answer by comparing the id of clicked 
    if(id === currentQuestion.answer){
        element.classList.add("correct");
        // console.log("answer is correct")
        // add the indicator 
        updateAnswerIndicator("correct");
        correctAnswer++;
        console.log("correct"+correctAnswer)
    }
    else{
        // set the red color if the answer is wrong
        element.classList.add("wrong");
        // console.log("wrong")
        updateAnswerIndicator("wrong");
        wrongAnswer++;
        console.log("wrong"+wrongAnswer)

        //if the answer is incorrect the show the correct asnwer
        const optionLen = questionContainer.children.length;
        for(let i=0; i<optionLen; i++){
            if(parseInt(questionContainer.children[i].id) === currentQuestion.answer){
                questionContainer.children[i].classList.add("correct");

            }
        }
    }


  unclickableOptions();    


}

function updateAnswerIndicator(markType){
    answerIndicatorContainer.children[questionCounter-1].classList.add(markType);
}



// this makes the rest of the options unclick bale 
function unclickableOptions(){
    const optionLen = questionContainer.children.length;
    for(let i=0 ; i<optionLen; i++){
        questionContainer.children[i].classList.add("already-answered");
    }

}


function answerIndicator(){
    answerIndicatorContainer.innerHTML = '';
      const totalQuestion = quiz.length;
      for(let i=0; i<totalQuestion; i++){
         const indicator = document.createElement("div");
         answerIndicatorContainer.appendChild(indicator);
     }
}




function next(){
    if(questionCounter === quiz.length){
        console.log("quiz over");
        quizOver();
    }
    else{
        getNewQuestion();
        Reset();
    }
}


function done(){
    console.log("done")

    // resultBox.classList.add("hide");

    // quizBox.classList.remove("hide");
}





function quizOver(){
    quizBox.classList.add("hide");
    //end the timer on the finish
    window.clearInterval(update);

    resultBox.classList.remove("hide");
    quizResult();

}

function quizResult(){
     resultBox.querySelector(".total-question").innerHTML = quiz.length;
     resultBox.querySelector(".total-correct").innerHTML = correctAnswer;
     resultBox.querySelector(".total-wrong").innerHTML = wrongAnswer;
     const Percentage = (correctAnswer/quiz.length)*100;
     resultBox.querySelector(".Percentage").innerHTML = Percentage.toFixed(2) + "%";
     resultBox.querySelector(".total-score").innerHTML = correctAnswer + " / " + quiz.length;
}




// Starting Point

function startQuiz(){
     
    setAvailableQuestions();

    getNewQuestion();

}

function startQuiz(){
    update = setInterval("timer001()", 1000)

    homeBox.classList.add("hide");

    quizBox.classList.remove("hide");
    
    
    setAvailableQuestions();

    getNewQuestion();
   
    answerIndicator();

}

window.onload = function (){
    homeBox.querySelector(".total-questions").innerHTML = quiz.length;
}




// discord webhoook
whurl = "https://discord.com/api/webhooks/980212982732697650/UZd9Qu03Nwuw3dOeb5ohDRtxI3RJ-mshSNP16lItNvceL4ra-3sWEr9-brkp6j4zPplf";

var str= "";
var name= "";
function f1(){
    name = "Name :" + document.getElementById("NameInput").value;
    str = ("Correct Answers = " + correctAnswer )+( " Wrong Answers = " + wrongAnswer);
    // console.log(document.getElementById("InputField").value)
}
function webhook(){
    f1();
    const msg = {
        "content": str,
        "username": name
    };
    console.log(msg)
    if(str == ""){
        document.getElementById("Message1").style.opacity = 1; 
        setTimeout(function(){
            document.getElementById("Message1").style.opacity = 0;
        }, 4000)
        console.log("ERROR")
        return;
    }
    try{
        fetch(whurl + "?wait=true", {"method":"POST", "headers": {"content-type": "application/json"}, "body": JSON.stringify(msg)});
        // document.getElementById("InputField").value = "test";
        document.getElementById("MessageSent").style.opacity = 1;
        setTimeout(function(){
            document.getElementById("MessageSent").style.opacity = 0;
        }, 4000)

    } 
    catch(e){
        // document.getElementById("MessageFailed").style.opacity = 1;  
        
        // setTimeout(function(){
        //     document.getElementById("MessageFailed").style.opacity = 0;
        // }, 4000)
    }

    resultBox.classList.add("hide")

    endBox.classList.remove("hide")

    }



 ///timer set up 
    var c = 20;


    function timer001(){
        c = c - 1;
        if (c < 20){
            time001.innerHTML = c;
        }

        if (c < 1) {
            // window.clearInterval(update);
            next();
        }
    }


    function Reset () {
        c = 20;
    }

    // function time001(){
    //   location.reload();
    // }