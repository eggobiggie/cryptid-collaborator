$(document).ready(function() {

    $("select[required]").css({
      position: 'absolute', 
      display: 'inline', 
      height: 0, 
      padding: 0, 
      width: 0
    });

  //jQuery for Materialize
  $('select').material_select();

   //On click for submitting survey: 
   
  $("#submit").on("click", function(event) {

    event.preventDefault();
      
    $("#cryptidHeader").empty();
    $("#cryptidDescription").empty();
    $("#cryptidImage").attr("src", "");
   
     //Grab survey responses
    var newSurvey = {
        userName: $("#name").val().trim(),
        questions: [
            parseInt($("#question1").val()),
            parseInt($("#question2").val()),
            parseInt($("#question3").val()),
            parseInt($("#question4").val()),
            parseInt($("#question5").val()),
            parseInt($("#question6").val()),
            parseInt($("#question7").val()),
            parseInt($("#question8").val()),
            parseInt($("#question9").val()),
            parseInt($("#question10").val())
          ],
        surveyValid: function() {
            var everythingValid = true;
              if (!this.userName) {
                  everythingValid = false;
              }
              for (var i = 0; i < this.questions.length; i ++) {
                if (!this.questions[i]) {
                  everythingValid = false;
                } 
              }
              if (!everythingValid) {
                $('.modal').modal();
                $('#cryptidHeader').replaceWith("<h4 id='cryptidHeader' class='center-align'>You need to fill out everything!</h4>");
                $("#cryptidDescription").clear();
                $("#cryptidImage").clear();
              } else {
                $('.modal').modal({
                    complete: function() {
                      $("#cryptidHeader").empty();
                      $("#cryptidDescription").empty();
                    }
                });
                $("#cryptidHeader").prepend(newSurvey.userName + ", you got ");
              }
        }
    };

    newSurvey.surveyValid();

    //Question results go into variable
    var newSurveyArray = newSurvey.questions;
      //Add results from user survey 
    function getSum(total, num) {
        return total + num;
    };
      
    //Put sum into variable
    var newSurveyArraySum = newSurveyArray.reduce(getSum);
    console.log("Your total score is " + newSurveyArraySum);

    //Clear forms when submitting
    $("#name").val("");
    $("#photo").val("");

    var lowestScoreSoFar = 1000;
    var winningScoreIndex = 0;

    //get scores from api and add them together
    $.get("/api/cryptids", function(data) {

    for (var i = 0; i < data.length; i++) {      
        var cryptidScoresSum = data[i].scores.reduce(getSum);
        console.log("Monster name: " + data[i].name + " Monster score: " + cryptidScoresSum);
        //Find difference between user score and cryptid scores in absolute values
        var totalDifference = Math.abs(newSurveyArraySum - cryptidScoresSum);  
        //If this is the lowest total, hold onto it:
        if (totalDifference < lowestScoreSoFar) {
                  lowestScoreSoFar = totalDifference;
                  winningScoreIndex = i;
        }
    }
    //Update module info upon win
    console.log("Winning cryptid should be: " + data[winningScoreIndex].name);
    if (data[winningScoreIndex].name) {
        $("#cryptidHeader").append(data[winningScoreIndex].name);
        $("#cryptidImage").attr("src", data[winningScoreIndex].photo);
        $("#cryptidDescription").append(data[winningScoreIndex].description);
    }
    });

    //Post user input into users file
    $.post("/api/users/", {name: newSurvey.userName, scores: newSurvey.questions}, 
      function(data) {
        if (data) {
          console.log(data);
        }
      });
  });
});


         