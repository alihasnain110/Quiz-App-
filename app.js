

const firebaseConfig = {
    apiKey: "AIzaSyDvyaiy72-2skiu4wkIiIRN4kV746g5EMs",
    authDomain: "quizapp-446a9.firebaseapp.com",
    projectId: "quizapp-446a9",
    storageBucket: "quizapp-446a9.firebasestorage.app",
    messagingSenderId: "932883681478",
    appId: "1:932883681478:web:c8ba29e3873895c1e607c7"
};
// const app = firebase.initializeApp(firebaseConfig);
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Function to handle signup
function signUp() {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    // Create user with email and password
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Successfully signed up
            var user = userCredential.user;

            // Save user data to the Firebase database
            return firebase.database().ref('users/' + user.uid).set({
                name: name,
                email: email
            });
        })
        .then(() => {
            console.log("User data saved to database.");

            // Clear form inputs
            document.getElementById('name').value = '';
            document.getElementById('email').value = '';
            document.getElementById('password').value = '';

            // Redirect to project.html
            window.location.href = "Quizapp.html";
        })
        .catch((error) => {
            // Handle errors during signup or data saving
            var errorMessage = error.message;
            console.error("Error:", errorMessage);
            alert(errorMessage);
        });
}

var questions = [
    {
        question: "Q1: HTML Stands for?",
        option1: "Hyper Text Markup Language",
        option2: "Hyper Tech Markup Language",
        option3: "Hyper Touch Markup Language",
        corrAnswer: "Hyper Text Markup Language",
    },
    {
        question: "CSS Stands for",
        option1: "Cascoding Style Sheets",
        option2: "Cascading Style Sheets",
        option3: "Cascating Style Sheets",
        corrAnswer: "Cascading Style Sheets",
    },
    {
        question: "Which tag is used for most large heading",
        option1: "<h6>",
        option2: "<h2>",
        option3: "<h1>",
        corrAnswer: "<h1>",
    },
    {
        question: "Which tag is used to make element unique ",
        option1: "id",
        option2: "class  ",
        option3: "label",
        corrAnswer: "id",
    },
    {
        question: "Any element assigned with id, can be get in css ",
        option1: "by # tag",
        option2: "by @ tag",
        option3: "by & tag",
        corrAnswer: "by # tag",
    },
    {
        question: "CSS can be used with ______ methods ",
        option1: "8",
        option2: "3",
        option3: "4",
        corrAnswer: "3",
    },
    {
        question: "In JS variable types are ____________ ",
        option1: "6",
        option2: "3",
        option3: "8",
        corrAnswer: "8",
    },
    {
        question: "In array we can use key name and value ",
        option1: "True",
        option2: "False",
        option3: "None of above",
        corrAnswer: "False",
    },
    {
        question: "toFixed() is used to define length of decimal ",
        option1: "True",
        option2: "False",
        option3: "None of above",
        corrAnswer: "True",
    },
    {
        question: "push() method is used to add element in the start of array ",
        option1: "True",
        option2: "False",
        option3: "None of above",
        corrAnswer: "False",
    },
];

var questionElement = document.getElementById('ques');
var option1 = document.getElementById('opt1');
var option2 = document.getElementById('opt2');
var option3 = document.getElementById('opt3');
var index = 0;
var score = 0;
var timer = document.getElementById('timer');
var min = 2;  // Starting from 2 minutes
var sec = 0;
var timerInterval;

function startTimer() {
    timerInterval = setInterval(function () {
        timer.innerText = `${min}:${sec < 10 ? '0' + sec : sec}`;
        sec--;
        if (sec < 0) {
            min--;
            sec = 59;
            if (min < 0) {
                clearInterval(timerInterval);
                nextQuestion();
            }
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function nextQuestion() {
    var options = document.getElementsByClassName('options');
    var button = document.getElementById('btn');

    // Check the answer and update score
    for (var i = 0; i < options.length; i++) {
        if (options[i].checked) {
            var userSelectedInput = options[i].value;
            var selectedOption = questions[index - 1][`option${userSelectedInput}`];
            var correctAnswer = questions[index - 1].corrAnswer;

            if (selectedOption === correctAnswer) {
                score++;
            }
        }
        options[i].checked = false;
    }

    button.disabled = true;

    if (index >= questions.length) {
        // End quiz
        Swal.fire({
            title: "Good job!",
            text: `Your Final Score is ${(score / questions.length) * 100}%`,
            icon: "success"
        });
    } else {
        // Load next question
        questionElement.innerText = questions[index].question;
        option1.innerText = questions[index].option1;
        option2.innerText = questions[index].option2;
        option3.innerText = questions[index].option3;
        index++;

        // Reset timer for the next question
        min = 2;
        sec = 0;
        startTimer();  // Start timer again
    }
}

function clicked() {
    var button = document.getElementById('btn');
    button.disabled = false;
}

// Start the timer when the page loads
startTimer();






function signUp() {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    // Create user with email and password
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Successfully signed up
            var user = userCredential.user;

            // Save user data to the Firebase database
            return firebase.database().ref('users/' + user.uid).set({
                name: name,
                email: email
            });
        })
        .then(() => {
            console.log("User data saved to database.");

            // Clear form inputs
            document.getElementById('name').value = '';
            document.getElementById('email').value = '';
            document.getElementById('password').value = '';

            // Redirect to project.html
            window.location.href = "Quizapp.html";
        })
        .catch((error) => {
            // Handle errors during signup or data saving
            var errorMessage = error.message;
            console.error("Error:", errorMessage);
            alert(errorMessage);
        });
}
