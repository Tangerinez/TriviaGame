$(document).ready(function(){
    const timeForQuestion = 20,   /* Time given for answering question. */
          interval = 1000, /* Count down time interval. */
          timeBetweenQuestion  = 10000; /* Time to display answer to question. */
  
    var arrQuestions = new Questions(),
        numberQuestions = 0,
        timeRemaining = 0, 
        intervalID,
        timeoutID;
  
    var audioInit = new Audio("assets/sound/WhoLetTheDogsOut.mp3");
  
    
    (function initialize() {         //this function is initialized when the game begins
      $("#start-btn").show();
      $("#time-remain, #question-container, #answer-container, #result-container, #progress-container").hide();
  
      audioInit.play();
      audioInit.loop = true;
    })();          // ES6 ---> () is after to show that function occurs
  
    function startTimer() {         // Function to start decreasing time by 1 seconds for each question
      timeRemaining = timeForQuestion + 1; /* Due to decrementing before displaying */
  
      renderTime();     // Renders the time containiner
  
      intervalID = setInterval(renderTime, interval);     // calls renderTime() function every 1 second
    }
  
   
    function stopTimer() {         // Stops the timer
      clearInterval(intervalID);          // Clears the interval
      intervalID = undefined;          // The intervalID becomes ID
    }
  
    function processResults() {       // Adds to number of correct, incorrect, and unanswered questions
      var correct    = 0,
          inncorrect  = 0,
          unanswered = 0;
  
      for (let i = 0; i < arrQuestions.length; i++) {      //iterates through array of questions
  
        /* If question has not been answered, it is undefined. */
        if (typeof(arrQuestions[i].isCorrect) === "undefined") {        // if user doesn't answer
          unnanswered++;
        }
        else {
          (arrQuestions[i].isCorrect) ? correct++ : incorrect++;      // Conditional statement -> if questions is correct, and if question is incorrect 
        }
      }
  
      return [correct,               // return the results of the array at the end of the game
              inncorrect,
              unanswered];
    }
  
    function renderTime() {          // Render the time in the html
      $("#time-remain").text("Time Remaining: " + --timeRemaining + " Seconds");
  
      if (timeRemaining === 0) {      // Once the time runs out...
        stopTimer();         // Stop the timer
        renderAnswer();        // Show the answer
      }
    }
  
    
    function renderProgress() {           // Render the user's progress in a progress bar
      var progress = (numberQuestions + 1) * 10;      // Multiplies number of questions by 10 so that progress is always multiple of 10 for 10 questions
  
      $(".progress-bar").attr("aria-valuenow", progress)     // this attribute is used for defining current value of a progress bar
      $(".progress-bar").attr("style", "width:" + progress + "%")       // the progress width bar becomes the progress %
      $(".progress-bar").text(progress + "%");   // text displaying the progress %
    }
  

    function renderQuestion() {       // Renders the question container
      $("#question-container").show();          // reveals questions
      $("#answer-container").hide();            // hides the answer
  
      startTimer();          // Starts the timer once the question is rendered
  
      var objQuestion = arrQuestions[numberQuestions];        // initiates variable that equals a question
  
      $("#question").text(objQuestion.question);        // Put the question object's current question in question div
  
      for (let i = 0; i < objQuestion.choices.length; i++) {           // for number of choices.length -1
        $("#choice-" + i).text(objQuestion.choices[i]);        // pulls from choice-0/1/2/3 div and replaces the text in those divs with the answer choices for that index 
      }
    }
  
    
    function renderAnswer(objQuestion) {      // renders the answer container using a question object parameter for currently answered question
      const imagePath = "assets/images/"; // Needs the backslash at the end to access all the images in the images file
  
      $("#question-container").hide();     // Hide the question container when answer is rendered
      $("#answer-container, #progress-container").show();    // Show the the answer and progress 
  
      renderProgress();      //renders progress so that progress bar shows up accurately
  
      var stringText = "";     // empty String
      var stringID = "no";   
      if (typeof(objQuestion) === "undefined") {     //if the current question has not been assigned
        objQuestion = arrQuestions[numberQuestions]; /* Need to assign to current question for proper rendering. */
  
        stringText = "Out of Time!<br><br>Correct answer was:&nbsp&nbsp" + 
                  objQuestion.choices[objQuestion.answer];          // stringText becomes the whole message for the correct answer
      }
      else if (objQuestion.isCorrect) {       // if the answer is correct
        stringText = "Correct!";       
        stringID = "yes";
      }
      else {
        stringText = "Nope!<br><br>Correct answer was:&nbsp&nbsp" +  // if the answer is incorrect
                  objQuestion.choices[objQuestion.answer]; 
      }
  
      $("#answer-text").html("<h2 id='" + stringID + "'" + ">" + stringText + "</h2>");      // once stringID and stringText has been set, this is the text that appears
  
      var imageDiv = $("<img>").addClass("img-responsive center-block")      
                             .attr("id", "jpg")
                             .attr("src", imagePath + objQuestion.image)       // image link from our local folder
                             .attr("alt", "Image for Answer");       
      $("#answer-img").html(imageDiv);      // insert image into answer-img div
  
      timeoutID = (++numberQuestions === arrQuestions.length) ?      // if numberQuestions equals to the length of the array of questions...
                  setTimeout(renderResults, timeBetweenQuestion) :       // if true, display the end screen
                  setTimeout(renderQuestion, timeBetweenQuestion);      // if false, display the next question
    }
  

    function renderResults() {         // render the results container
      var results = [];
  
      $("#time-remain, #answer-container, #progress-container").hide();
      $("#result-container").show();
  
      results = processResults();
  
      $("#comment").text("You are done! Let's take a look at your results.");
      $("#correct").text("Correct Answers: " + results[0]);
      $("#incorrect").text("Incorrect Answers: " + results[1]);
      $("#unanswered").text("Unanswered: " + results[2]);    
    }
  
    /** 
     * @function clickStart 
     * @description Performs required processing when start or restart button is chosen.
    */
    function clickStart() {
      audioInit.pause();
  
      $("#start-btn, #answer-container, #result-container").hide();
      $("#time-remain").show();
  
      numberQuestions = 0;
  
      renderQuestion();
    }
  
    /** 
     * @function clickAnswer 
     * @description Performs required processing when answer is chosen.
    */
    function clickAnswer() {
      stopTimer();
  
      var strChosen = $(this).attr("id"),
          objQuestion = arrQuestions[numberQuestions];
  
      objQuestion.isCorrect = (parseInt(strChosen.charAt(strChosen.length-1)) === 
                                        objQuestion.answer) ? true : false;
    
      renderAnswer(objQuestion);
    }
  
    /** 
     * @event .on ("click") 
     * @listens .start When start or restart button is chosen. 
     * @param {function} clickStart
    */
    $(".start").on("click", clickStart);
  
    /** 
     * @event .on ("click") 
     * @listens .choice When answer for a question is chosen. 
     * @param {function} clickAnswer
    */
    $(".choice").on("click", clickAnswer);
  
    /*
      This code addresses the problem of the sticky hover on a touch screen device. The code was copied from the following website: http://www.javascriptkit.com/dhtmltutors/sticky-hover-issue-solutions.shtml
    */
   document.addEventListener('touchstart', function addtouchclass(e) {
    document.documentElement.classList.add('can-touch')
    document.removeEventListener('touchstart', addtouchclass, false)
  }, false)});



