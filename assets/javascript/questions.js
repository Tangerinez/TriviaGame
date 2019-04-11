function Questions() {
    /* Handles case when constructor function called without new operator */
    if (!(this instanceof Questions)) {
      return new Questions();
    };
  
    class Question {
      constructor(question, choices, answer, image) {
        this.question = question;
        this.choices = choices;
        this.answer = answer;
        this.isCorrect = undefined; /* Unanswered question. */
        this.image = image;
      };
    };
  
    return (() => {
      let arrQuestions = [];
  
      // Hard-coded text file which contains all of the questions
      const TEXTFILE = 'Who is the Golden State Warriors all time leading scorer?^Stephen Curry^Wilt Chamberlain^Klay Thompson^Baron Davis^1^Wilt.jpg\nWhich of these movies is not like the others?^The Exorcist^Poltergeist^Scary Movie 2^Candyman^2^ScaryMovie2.jpg\nWhat is Emetophobia the fear of?^Flying^Light^Vomiting^Crawling^2^Vomiting.jpg\nWhich of these is a REAL programming language?^Hongkat^Brainfuck^Azubu^Pokit^1^Brainfuck.jpg\nWhat is the second tallest mountain in the world?^Aconcagua^Kilimanjaro^Mount Logan^Mount Everest^0^Aconcagua.jpg\nWho invented hot chocolate?^The Germans^The Swiss^The Mayans^The Incans^2^Mayans.jpg\nA bolt of lightning contains enough energy to...^Light 100,000 light bulbs^Toast 100,000 pieces of toast^Charge 100,000 phones^Power 100 power plants^1^Toast.jpg\nHow is true about Pringles?^They are 40 flavors in the USA^There are about 80 pringles in a can^They were produced by a reputable food company^They are not chips^3^Pringles.jpg\nWhich spice is poisonous when consumed in large amounts?^Nutmeg^Paprika^Cardamom^Star Anise^0^Nutmeg.jpg\nWhat is 10% of 20% of 30% of 40% of 50% of 2000?^1.2^2.4^4.8^2^1^2.4.png';
  
      const arrLines = TEXTFILE.split("\n");
  
      arrLines.forEach(line => {
        let arrFields = line.split("^");
  
        /* First field is the question. Last field is the image. Next to last is the answer. Get those first. Remaining fields are the 1..n choices. FORMAT = question^choices^answer^image */
        let question = arrFields.shift();
        let image    = arrFields.pop();
        let answer   = parseInt(arrFields.pop());
        // choices = arrFields.
  
        arrQuestions.push(new Question(question, arrFields, answer, image));
      });
  
      return arrQuestions;
    })();
  };