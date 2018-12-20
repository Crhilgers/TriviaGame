var myQuestions = [
    {
        question: "1) You are approached by a frenzied Vault scientist, who yells, I'm going to put my quantum harmonizer in your photonic resonation chamber! What's your response?",
        answers: {
            a: 'Sneak away...',
            b: 'Say nothing, grab a nearby pipe and hit the scientist in the head to knock him out. For all you knew, he was planning to blow up the vault.',
            c: 'Help him out!'
        },
        correctAnswer: 'b'
    },
    {
        question: "2) While working as an intern in the Clinic, a patient with a strange infection on his foot stumbles through the door. The infection is spreading at an alarming rate, but the doctor has stepped out for a while. What do you do?",
        answers: {
            a: 'Sneak away...',
            b: 'Lick it, whats the worst that could happen?',
            c: 'Scream for help, someone more qualified will handle this.'
        },
        correctAnswer: 'c'
    },
    {
    question: "3) You discover a young boy lost in the lower levels of the Vault. He's hungry and frightened, but also appears to be in possession of stolen property. What do you do?",
    answers: {
        a: 'Sneak away...',
        b: 'Lead the boy to safety, then turn him over to the overseer ',
        c: 'Give the boy a hug and tell him everything will be okay'
    },
    correctAnswer: 'b'
},
{
    question: "4) Congratulations! You made one of the Vault 101 baseball teams! Which position do you prefer?",
    answers: {
        a: 'Coach',
        b: 'Pitcher',
        c: 'Short stop'
    },
    correctAnswer: 'a'
},
{
    question: "5) Your grandmother invites you to tea, but you're surprised when she gives you a pistol and orders you to kill another Vault resident. What do you do?",
    answers: {
        a: 'Obey your elder and kill the Vault resident with the pistol. ',
        b: 'Sneak away...',
        c: "Ask granny for a minigun instead. After all, you don't want to miss."
    },
    correctAnswer: 'c'
},

];

var quizContainer = document.getElementById('quiz');
var resultsContainer = document.getElementById('results');
var submitButton = document.getElementById('submit');

generateQuiz(myQuestions, quizContainer, resultsContainer, submitButton);

function generateQuiz(questions, quizContainer, resultsContainer, submitButton){

    var count=120;

var counter=setInterval(timer, 1000);

function timer()
{
  count=count-1;
  if (count <= 0)
  {
     clearInterval(counter);
     showResults(questions, quizContainer, resultsContainer);
     return;
  }

  document.getElementById("timer").innerHTML=count + " secs";
}

    

    function showQuestions(questions, quizContainer){
        var output = [];
        var answers;

        // for each question
        for(var i=0; i<questions.length; i++){
            
            //list of answers empty
            answers = [];

            // for each available answer
            for(letter in questions[i].answers){

                //add to html 
                answers.push(
                    '<label>'
                        + '<input type="radio" name="question'+i+'" value="'+letter+'">'
                        + letter + ': '
                        + questions[i].answers[letter]
                        + "<br></br>"
                    + '</label>'
                );
            }

            //question and answers to the output
            output.push(
                '<div class="question">' + questions[i].question + '</div>'
                + '<div class="answers">' + answers.join('') + '</div>'
            );
        }

        quizContainer.innerHTML = output.join('');
    }


    function showResults(questions, quizContainer, resultsContainer){
        
        // gather answer containers from the quiz
        var answerContainers = quizContainer.querySelectorAll('.answers');
        
        var userAnswer = '';
        var numCorrect = 0;
        
        for(var i=0; i<questions.length; i++){

            userAnswer = (answerContainers[i].querySelector('input[name=question'+i+']:checked')||{}).value;
            
            // if answer is correct
            if(userAnswer===questions[i].correctAnswer){
                numCorrect++;
                
                // color the answers green
                answerContainers[i].style.color = 'lightgreen';
            }
            // if answer is wrong or blank
            else{

                answerContainers[i].style.color = 'red';
            }
        }

        // show number of correct answers out of total
        resultsContainer.innerHTML = numCorrect + ' out of ' + questions.length;
    }

    // show questions right away
    showQuestions(questions, quizContainer);
    
    // on submit, show results
    // can re-submit after timer is over
    submitButton.onclick = function(){
        showResults(questions, quizContainer, resultsContainer);
    }

}