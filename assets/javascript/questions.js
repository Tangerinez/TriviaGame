function Questions() {
    /* Handles case when constructor function called without new operator */
    if (!(this instanceof Questions)) {    // The instanceof operator tests whether the prototype property of a constructor appears anywhere in the prototype chain of an object.
      return new Questions();     // return Question object
    };
  
    class Question {          // Question function
      constructor(question, choices, answer, image) {    // The constructor method is a special method for creating and initializing an object created within a class.
        this.question = question;         // question
        this.choices = choices;           // choices
        this.answer = answer;             // answer
        this.isCorrect = undefined;        // Question that has not been answered 
        this.image = image;               // image
      };
    };
  
    return (() => {        // ES6 notation
      let arrQuestions = [];             // empty question array
  
      // Hard-coded text file which contains all of the questions
      const textFile = 'Who is the Golden State Warriors all time leading scorer?^Stephen Curry^Wilt Chamberlain^Klay Thompson^Baron Davis^1^Wilt.jpg\nWhich of these movies is not like the others?^The Exorcist^Poltergeist^Scary Movie 2^Candyman^2^ScaryMovie2.jpg\nWhat is Emetophobia the fear of?^Flying^Light^Vomiting^Crawling^2^Vomiting.jpg\nWhich of these is a REAL programming language?^Hongkat^Brainfuck^Azubu^Pokit^1^Brainfuck.jpg\nWhat is the second tallest mountain in the world?^Aconcagua^Kilimanjaro^Mount Logan^Mount Everest^0^Aconcagua.jpg\nWho invented hot chocolate?^The Germans^The Swiss^The Mayans^The Incans^2^Mayans.jpg\nA bolt of lightning contains enough energy to...^Light 100,000 light bulbs^Toast 100,000 pieces of toast^Charge 100,000 phones^Power 100 power plants^1^Toast.jpg\nHow is true about Pringles?^They are 40 flavors in the USA^There are about 80 pringles in a can^They were produced by a reputable food company^They are not chips^3^Pringles.jpg\nWhich spice is poisonous when consumed in large amounts?^Nutmeg^Paprika^Cardamom^Star Anise^0^Nutmeg.jpg\nWhat is 10% of 20% of 30% of 40% of 50% of 2000?^1.2^2.4^4.8^2^1^2.4.png';
  
      const textFileArray = textFile.split("\n");         // converts string to array so that each question along with its answers are an index of an array
  
      textFileArray.forEach(line => {           // for each index 
        let arrFields = line.split("^");         // splits each question into more arrays sorted by question and each answer choice
  
        let question = arrFields.shift();     // returns first element of the array which is the question
        let image    = arrFields.pop();       // removes and returns last element of the array which is the image
        let answer   = parseInt(arrFields.pop());         // removes and returns last element of the current array which is the index of the answer 
        
  
        arrQuestions.push(new Question(question, arrFields, answer, image));   // push all the components of the game into arrQuestions
      });
  
      return arrQuestions;         // return all components of the game
    })();          // line 17 function
  };