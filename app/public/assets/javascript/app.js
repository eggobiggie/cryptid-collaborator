$(document).ready(function() {

  //jQuery for Materialize
    $('select').material_select();
    $('.modal').modal({
      complete: function() {
        $("#cryptidHeader").empty();
        $("#cryptidDescription").empty();
      }
    });

   //On click for submitting survey: 
  $("#submit").on("click", function(event) {
    
      event.preventDefault();
      
      //Grab user information
      var newPerson = {
          userName: $("#name").val().trim(),
          userPhoto: $("#photo").val().trim()
      };

      console.log(newPerson);
      
      //Grab survey responses
      var newSurvey = {
          question1: parseInt($("#question1").val()),
          question2: parseInt($("#question2").val()),
          question3: parseInt($("#question3").val()),
          question4: parseInt($("#question4").val()),
          question5: parseInt($("#question5").val()),
          question6: parseInt($("#question6").val()),
          question7: parseInt($("#question7").val()),
          question8: parseInt($("#question8").val()),
          question9: parseInt($("#question9").val()),
          question10: parseInt($("#question10").val())
      };

      //Turn survey results into an array held in a variable
      var newSurveyArray = Object.values(newSurvey)
      // console.log("this is the array: " + newSurveyArray);

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
          console.log("Winning cryptid should be: " + data[winningScoreIndex].name);
          if (data[winningScoreIndex].name) {
            $("#cryptidHeader").append(data[winningScoreIndex].name);
            $("#cryptidImage").attr("src", data[winningScoreIndex].photo);
            $("#cryptidDescription").append(data[winningScoreIndex].description);
          }
      });
  });
});
         