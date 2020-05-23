//Questions: da li koristimo odredjene metode samo na odredjenim slucajevima, npr, apply metodu kad se ocekuje niz kao parametar?
//Znaci li to da odredjenu metodu (call, apply, bind) koristimo u ovistnosti koji tip argument prima
//Na sta se this odnosi u bind metodi

//https://www.udemy.com/course/the-complete-javascript-course/learn/lecture/5869204#questions/2297686 PRIJMJER

//https://www.udemy.com/course/the-complete-javascript-course/learn/lecture/5869204#questions/2326386 OBJASNJENJE

//https://www.udemy.com/course/the-complete-javascript-course/learn/lecture/5869204#questions/2526170(Objasnjenje za this keyword)
//That's why we have to mention the first argument to identify which function/object is going to get the context of this  
//(like the examples Jonas showed us in his example). 

//8. Bind Call and Apply
// var john = {
//     name: 'John',
//     age: 26,
//     job: 'teacher',
//     presentation: function(style, timeOfDay){
//         if(style === 'formal'){
//             console.log('Good ' + timeOfDay + ' ladies and gentleman! I\'m a '  + this.name + ', I\'m a ' + this.job + ' and I\'m ' + this.age + ' years old.')
//         }else if(style === 'friendly'){
//             console.log('Hey! What\'s up? I\'m '  + this.name + ', I\'m a ' + this.job + ' and I\'m ' + this.age + ' years old. Have a nice ' + timeOfDay)
//         }
//     }
// };

// var emily = {
//     name: 'Emily',
//     age: 35,
//     job: 'designer'
// }

// john.presentation('formal', 'morning')

// //preko call metode smo dodjelili emily objektu presentation metodu iz john objekta sa svojim argumentima (friendly i afternoon) koje prima ta metoda
// //ovo se jos naziva method borrowing
// john.presentation.call(emily, 'friendly', 'afternoon')

// //Apply method
// //Nece raditi na gornjem primjeru jer metoda ne ocekuje array kao parametar 
// //Apply koristimo samo kad se kao argument ocekuje array?
// //john.presentation.apply(emily, ['friendly', 'afternoon'])

// //Bind method
// var johnFriendly = john.presentation.bind(john, 'friendly');
// johnFriendly('morning');
// johnFriendly('night');

// var emilyFormal = john.presentation.bind(emily, 'formal');
// emilyFormal('afternoon');


// var years = [1990, 1965, 1937, 2005, 1998];

// function arrayCalc(arr, fn){
//     var arrRes = [];
//     for(let i = 0; i < arr.length; i++){
//         arrRes.push(fn(arr[i]));
//     }
//     return arrRes;
// }

// //age calculate
// function calculateAge(el){
//     return 2016-el;
// }

// //Is adult
// function isFullAge(limit, el){
//     return el >= limit;
// }
// //Spremili smo u ages varijablu niz koji vraca izracunate godine
// var ages = arrayCalc(years, calculateAge);
// //20 je prvi argument u isFullAge funkciji, odnosno 20 predstvlja limit argument
// var fullJapan = arrayCalc(ages, isFullAge.bind(this, 20))
// console.log('ages', ages)
// console.log(fullJapan);






//***************************************************************************************** */
//7. Closures
// function retirement(retirementAge){
//     var a = ' years left until retirement';
//     return function(yearOfBirth){
//         var age = 2016 - yearOfBirth;
//         console.log((retirementAge - age)+a);
//     }
// }

// var retirementUS = retirement(66);
// //retirement(65)(1986)
// var retirementGermany = retirement(65);
// var retirementIceland = retirement(67);


// retirementUS(1990);
// retirementGermany(1990);
// retirementIceland(1990);


//Rewrited function using closures
// function interviewQuestion(job){
//     return function(name){
//         if(job === 'teacher'){
//             console.log(name + ' is teacher');
//         }
//         else if(job === 'designer'){
//             console.log(name + ' is designer');
//         }
//         else{
//             console.log(job + ', what are you')
//         }
//     }
// }

// var teacherJob = interviewQuestion('teacher');
// teacherJob('Eldin')



//***************************************************************************************** */
//6. IIFE

// function game(){
//     var score = Math.random() * 10;
//     console.log(score >= 5)
// }

// game();

// (
//     function(){
//         var score = Math.random() * 10;
//         console.log(score >= 5)
//     }
// )();

// //console.log(score)

// (
//     function(goodLuck){
//         var score = Math.random() * 10;
//         console.log(score + goodLuck)
//     }
// )(5);


//***************************************************************************************** */
//5. Functions returning functions

// function interviewQuestion(job){
//     if(job === 'designer'){
//         return function(name){
//             console.log(name + ', can you please what UX design is?')
//         }
//     }else if(job === 'teacher'){
//         return function(name){
//             console.log('What subject do you teach, ' + name)
//         }
//     }else{
//         return function(name){
//             console.log('Hello ' + name + ', what do you do?')
//         }
//     }
// }

//Spremili smo u varijablu da bismo mogli proslijediti joj novi parametar
// var teacherQuestion = interviewQuestion('teacher')
// var designerQuestion = interviewQuestion('designer')

// teacherQuestion('John')
// designerQuestion('Eldin')

// //Drugi nacin bez spremanja funkcije u novu varijalbu
// interviewQuestion('teacher')('Edy')


//***************************************************************************************** */
//4.First class functions: Passing functions as arguments

// var years = [1990, 1965, 1937, 2005, 1998];

// function arrayCalc(arr, fn){
//     var arrRes = [];
//     for(let i = 0; i < arr.length; i++){
//         arrRes.push(fn(arr[i]));
//     }
//     return arrRes;
// }

// //age calculate
// function calculateAge(el){
//     return 2016-el;
// }

// //Is adult
// function isFullAge(el){
//     return el >= 18;
// }

// function maxHeartRate(el){

//     if(el >= 18 && el <= 81){
//         return Math.round(206.9 - (0.67 * el))
//     }else{
//         return -1
//     }
// }

// var ages = arrayCalc(years, calculateAge)
// var fullAges = arrayCalc(ages, isFullAge)
// var rates = arrayCalc(ages, maxHeartRate)

// console.log(ages);
// console.log(fullAges);
// console.log(rates)


//***************************************************************************************** */
//3. Primitives vs Objects

//Primitives
// var a = 23;
// var b = a;
// a = 46;
// console.log(a, b)

// //Objects
// var obj1 = {
//     name: 'John',
//     age: 26
// };
// var obj2 = obj1;
// obj1.age = 30;
// console.log(obj1.age)
// console.log(obj2.age)

// //Functions
// var age = 27;
// var obj = {
//     name: 'Jonas',
//     city: 'Lisbon'
// }
// function change(a, b){
//     a = 30;
//     b.city = 'San Francisco'
// }
// change(age, obj);
// console.log(age)
// console.log(obj.city)



//***************************************************************************************** */
//2. Object.create

// var personProto = {
//     calculateAge: function(){
//         console.log(2019 - this.yearOfBirth)
//     }
// }
// var john = Object.create(personProto);
// john.name = 'John';
// john.yearOfBirth = 1990;
// john.job = 'teacher';

// var jane = Object.create(personProto, {
//     name: { value: 'Jane' },
//     yearOfBirth: { value: 1969 },
//     job: { value: 'designer '}
// })


//***************************************************************************************** */
//1. Function constructor

// var john = {
//     name: 'john',
//     yearOfBirth: 1990,
//     job: 'teacher'
// }

// var Person = function(name, yearOfBirth, job){
//     this.name = name;
//     this.yearOfBirth = yearOfBirth;
//     this.job = job;
// }

// Person.prototype.calculateAge = function(){
//     console.log(2019-this.yearOfBirth)
// }
// Person.prototype.lastName = 'Smith';

// var john = new Person('John', 1990, 'teacher');
// var jane = new Person('Jane', 1969, 'designer');
// var mark = new Person('Mark', 1948, 'retired');


// john.calculateAge();
// mark.calculateAge();
// jane.calculateAge();

// console.log(john.lastName)
// console.log(mark.lastName)
// console.log(jane.lastName)




//***************************************************************************************** */
//Nevezano za kurs
// fetch('https://api.github.com/users?fbclid=IwAR07NOmaB-rsJokuiljVrPjSkGo7CZ5l_7SiD5LlJkxsYvKBvru9E_W-16Q')
// .then(response => response.json())
// .then(data => {
//     data.map(x => {
//         if(x.login.charAt(0)=='a'){
//             console.log(x.login)
//         }
//     }) 
// })
