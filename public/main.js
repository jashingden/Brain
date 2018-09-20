      // Initialize Firebase
      var config = {
        apiKey: "AIzaSyCZ0ZoKJFUH_HvoVMLwKQSWYzAcl9SvHTI",
        authDomain: "brain-7c34d.firebaseapp.com",
        databaseURL: "https://brain-7c34d.firebaseio.com",
        projectId: "brain-7c34d",
        storageBucket: "brain-7c34d.appspot.com",
        messagingSenderId: "314911077061"
      };
      firebase.initializeApp(config);

      // Get a reference to the database service
      var database = firebase.database();

      var q_no = document.getElementById("q_no");
      var q_quiz = document.getElementById("q_quiz");
      var q_ans = document.getElementById("q_ans");
      var q_desc = document.getElementById("q_desc");
      var questionIdx = -1;
      var question;
      var countdownEl = document.getElementById("countdown");
      var countdownTimer;
      var p_answer = document.getElementById("p_answer");
      firebase.database().ref('game/question').on('value', function(snapshot) {
        questionIdx = snapshot.val();
        console.log('questionIdx='+questionIdx);
        q_no.innerHTML = '第'+(questionIdx+1)+'題';

        firebase.database().ref('questions/'+questionIdx).on('value', function(snapshot) {
          question = snapshot.val();
          console.log(question);
          q_quiz.innerHTML = question.quiz;
          });
       });

function gotoQuestion(diff) {
  var q = questionIdx + diff;
  console.log('gotoQuestion='+q);
  if (q >= 0) {
    p_answer.style.display = "none";
    q_ans.style.display = "none";
    q_ans.innerHTML = '';
    q_desc.style.display = "none";
    q_desc.innerHTML = '';
    firebase.database().ref('game/question').set(q);
  }
}

function pleaseAnswer() {
  var countdownNumberEl = document.getElementById('countdown-number');
  var countdown = 10;
  countdownNumberEl.textContent = countdown;
  countdownEl.style.display = "block";
  countdownTimer = setInterval(function() {
    countdown = countdown-1;
    if (countdown <= 0) {
      clearInterval(countdownTimer);
      countdownEl.style.display = "none";
      p_answer.style.display = "block";
    } else {
      countdownNumberEl.textContent = countdown;
    }
  }, 1000);
}

function showAnswer() {
  q_ans.style.display = "block";
  q_ans.innerHTML = '答案: '+question.ans;
  if (question.desc != '') {
    q_desc.style.display = "block";
   q_desc.innerHTML = '說明: <br>'+question.desc;
  }
}

