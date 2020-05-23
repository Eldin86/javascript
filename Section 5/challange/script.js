/*
    1. Build a function constructor called Question to describe a question. A question should include:
        a) question itself
        b) the answers from which player can choose the correct one (choose an adequate data strcuture, array, object, etc.)
        c) correct answer (I would use a number for this)
    2. Create a couple of questions using the constructor.
    3. Store them all inside an array
    4. Select one random question and log it on the console, together with the possible answers (each
        question should have a number) (Hint: write a method for the Question objects for this task).
    5. Use the 'prompt' function to ask the user for the correnct answer. The user should input the number of 
       the correct answer such as you displayed it on Task 4.
    6. Check in the answer is correct and print to the console whether the answer is correct or not
       (Hint: write another method for this)
    7. Suppose this code would be a plugin for other programmers to use in their code. So make sure that all
        your code is private and doesn't interfere with other programmers code (Hint: we learned a special technique
        to do exactly that)

*/

// //U IIFE smo sve upisali da ne bi bilo konfrotacije ako bi neko drugi pisao jos koda i ako bi dao ime varijable istu kao i u funkciji
// (function(){
//     function Question(question, answers, correct){
//         this.question = question;
//         this.answers = answers;
//         this.correct = correct;
//     }
//     //Dodjelili smo metodu Question prototipu
//     Question.prototype.displayQuestion = function(){
//         //Posto metoda pripada Question konstruktoru koji vec ima question properti, 
//         //moramo koristiti this keyword da bismo pristupili odredjenom propertiju u metodi
//         console.log(this.question);
//         //Isto tako provrtimo kroz petlju odgovore sa this keyword
//         for(var i = 0; i < this.answers.length; i++){
//             console.log(i + ': ' + this.answers[i]);
//         }
//     }
    
//     //Definisali smo novu metodu koja provjerava tacnost odgovora
//     Question.prototype.checkAnswer = function(ans){
//         if(ans === this.correct){
//             console.log('Correct answer')
//         }else{
//             console.log('Wrong answer')
//         }
//     }
    
//     var q1 = new Question('Is Javascript the coolest programing language in the world?', ['Yes', 'No'], 0);
//     var q2 = new Question('What is name of this coursesteacher?', ['John', 'Michael', 'Jonas'], 2);
//     var q3 = new Question('What does best describe coding', ['Boring', 'Hard', 'Fun', 'Tedious'], 2);
    
//     //Isti indexni broj je prosljedjen i u questions[n].displayQuestion(); i u questions[n].checkAnswer(answer); zato imamo ispis u konzoli koji se poklapa sa promptom
//     var questions = [q1, q2, q3];
//     var n = Math.floor(Math.random() * questions.length);
//     questions[n].displayQuestion();
    
//     var answer = +prompt('Please select correct answer');
//     questions[n].checkAnswer(answer);
// })();

/*
-- Expert level --

8. After you display the result, display the next random question, so that game never ends(Hint: 
    write a function for this and call it right after displaying the result)
9. Be careful: after task 8, the game literally never ends. So include the option to quit the game if
    the user writes 'exit' instead of answer. In this case, DON'T call the function from Task 8.
10. Track user's score to make the game more fun! So each time an answer is correct, add 1 point to 
    the score. (Hint: I'm going to use the power of closures for this, but you don't have to,
    just do this with the tools you feel more comfortable at this point).
11. Display the score in the console. Use yet another method for this
*/

//U IIFE smo sve upisali da ne bi bilo konfrotacije ako bi neko drugi pisao jos koda i ako bi dao ime varijable istu kao i u funkciji
(function(){
    function Question(question, answers, correct){
        this.question = question;
        this.answers = answers;
        this.correct = correct;
    }
    //Dodjelili smo metodu Question prototipu
    Question.prototype.displayQuestion = function(){
        //Posto metoda pripada Question konstruktoru koji vec ima question properti, 
        //moramo koristiti this keyword da bismo pristupili odredjenom propertiju u metodi
        console.log(this.question);
        //Isto tako provrtimo kroz petlju odgovore sa this keyword
        for(var i = 0; i < this.answers.length; i++){
            console.log(i + ': ' + this.answers[i]);
        }
    }
    
    //Definisali smo novu metodu koja provjerava tacnost odgovora
    Question.prototype.checkAnswer = function(ans, callback){
        var sc;
        if(ans === this.correct){
            console.log('Correct answer');
            //Uslov je da je pitanje jednako odgovori u proslijedimo true u funkciju callback
            //Posto je true povecavamo za 1
            sc = callback(true);
        }else{
            console.log('Wrong answer. Try again')
            //Posto odgovor nije jednak pitanju proslijedimo false u funkciju
            //Posto je false samo vratimo prethodni broj
            sc = callback(false);
        }
        //U metodu proslijedimo trenutni broj i ispisujemo
        this.displayScore(sc)
    }

    Question.prototype.displayScore = function(score){
        console.log('Your current score is ' + score)
        console.log('------------------------------')
    }
    
    var q1 = new Question('Is Javascript the coolest programing language in the world?', ['Yes', 'No'], 0);
    var q2 = new Question('What is name of this coursesteacher?', ['John', 'Michael', 'Jonas'], 2);
    var q3 = new Question('What does best describe coding', ['Boring', 'Hard', 'Fun', 'Tedious'], 2);

    var questions = [q1, q2, q3];

    function score(){
        var sc = 0;
        return function(correct){
            if(correct){
                sc++
            }
            return sc
        }
    }

    //Spremili smo u varijablu da bismo mogli kasnije koristiti sa praametrom
    var keepScore = score();

    function nextQuestion(){ 

        //Isti indexni broj je prosljedjen i u questions[n].displayQuestion(); i u questions[n].checkAnswer(answer); zato imamo ispis u konzoli koji se poklapa sa promptom
        var n = Math.floor(Math.random() * questions.length);
        questions[n].displayQuestion();
        
        var answer = prompt('Please select correct answer');
        

        if(answer !== 'exit'){
            //Postavili smo parseInt jer tacan odgovor argument ocekuje broj, zato pretvramo u int
            questions[n].checkAnswer(parseInt(answer), keepScore);
            nextQuestion();
        }
    }

    nextQuestion();

})();

//Zasto +answer ne radi u questions[n].checkAnswer(parseInt(answer));
