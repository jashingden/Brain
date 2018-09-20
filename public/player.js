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

      var p_no = document.getElementById("p_no");
      var p_quiz = document.getElementById("p_quiz");
      var p_ans = document.getElementById("p_ans");
      var p_ans_ok = document.getElementById("p_ans_ok");
      var questionIdx = -1;
      var question;
      firebase.database().ref('game/question').on('value', function(snapshot) {
        questionIdx = snapshot.val();
        console.log('questionIdx='+questionIdx);
        p_no.innerHTML = '第'+(questionIdx+1)+'題';
        p_ans.value = '';
        p_ans_ok.innerHTML = '';

        firebase.database().ref('questions/'+questionIdx).on('value', function(snapshot) {
          question = snapshot.val();
          console.log(question);
          p_quiz.innerHTML = question.quiz;
          });
       });

function sendAnswer(player) {
  console.log('sendAnswer='+p_ans.value);
  firebase.database().ref('game/answer'+player).set(p_ans.value);
  p_ans_ok.innerHTML = '已送出！';
}

