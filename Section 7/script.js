//*********************************************************************** */
//****Lecture 13: Classes with Subclasses ****
//ES5
// var Person5 = function(name, yearOfBirth, job){
//     this.name = name;
//     this.yearOfBirth = yearOfBirth;
//     this.job = job;
// }
// Person5.prototype.calculateAge = function(){
//     var age = new Date().getFullYear() - this.yearOfBirth;
//     console.log(age)
// }
// var Athlete5 = function(name, yearOfBirth, job, olympicGames, medals){
//     Person5.call(this, name, yearOfBirth, job)
//     this.olympicGames = olympicGames;
//     this.medals = medals;
// }


// Athlete5.prototype = Object.create(Person5.prototype);

// Athlete5.prototype.wonMedal = function(){
//     this.medals++;
//     console.log(this.medals);
// }

// var johnAthlete5 = new Athlete5('John', 1990, 'swimmer', 3, 10)
// johnAthlete5.calculateAge();
// johnAthlete5.wonMedal()

//ES6
class Person6{
    constructor(name, yearOfBirth, job){
        this.name = name;
        this.yearOfBirth = yearOfBirth;
        this.job = job;
    }
    calculateAge(){
        var age = new Date().getFullYear() - this.yearOfBirth;
        console.log(age)
    }
    static greeting(){
        console.log('Hey there!');
    }
}

class Athlete6 extends Person6{
    constructor(name, yearOfBirth, job, olimpicGames, medals){
        super(name, yearOfBirth, job);
        this.olimpicGames = olimpicGames;
        this.medals = medals;
    }
    wonMedal(){
        this.medals++;
        console.log(this.medals)
    }
}
const johnAthlete6 = new Athlete6('John', 1990, 'Swimmer', 3, 10)
johnAthlete6.wonMedal();
johnAthlete6.calculateAge();



//*********************************************************************** */
//****Lecture 12: Classes ****
//ES5
// var Person5 = function(name, yearOfBirth, job){
//     this.name = name;
//     this.yearOfBirth = yearOfBirth;
//     this.job = job;
// }
// Person5.prototype.calculateAge = function(){
//     var age = new Date().getFullYear() - this.yearOfBirth;
//     console.log(age)
// }

// var john5 = new Person5('John', 1990, 'teacher')
// john5.calculateAge();


// //ES6
// class Person6{
//     constructor(name, yearOfBirth, job){
//         this.name = name;
//         this.yearOfBirth = yearOfBirth;
//         this.job = job;
//     }
//     calculateAge(){
//         var age = new Date().getFullYear() - this.yearOfBirth;
//         console.log(age)
//     }
//     static greeting(){
//         console.log('Hey there!');
//     }
// }
// const john6 = new Person6('John', 1990, 'teacher')
// Person6.greeting();


//*********************************************************************** */
//****Lecture 11: Maps ****
// const question = new Map();
// question.set('question', 'What is the official name of the latest major Javascript version?');

// question.set(1, 'ES5');
// question.set(2, 'ES6');
// question.set(3, 'ES2015')
// question.set(4, 'ES7');
// question.set('correct', 3);

// question.set(true, 'Correct Answer :D');
// question.set(false, 'Wrong, please try again');

// //console.log(question.get('question'))
// //console.log(question.size);

// if(question.has(4)){
//    // question.delete(4)
//    //console.log('Answer 4 is here')
// }

// //question.clear();
// question.forEach((value, key) => {
//     // console.log(`this is ${key} and it's set to ${value}`)
// })

// for(let [key, value] of question.entries()){
//     //console.log(key + ' of ' + value)
//     //console.log(key)
//     if(typeof(key) === 'number'){
//         console.log(`Answer ${key}: ${value}`)
//     }
// }

// console.log(question.get(2))

// const ans = +prompt('Write the correnct answer');
// console.log(question.get(ans === question.get('correct')));



//*********************************************************************** */
//****Lecture 10: Default parameters ****

//ES5
// function SmithPerson(firstName, yearOfBirth, lastName, nationality){
//     lastName === undefined ? lastName = 'Smith': lastName;
//     nationality === undefined ? nationality = 'american' : nationality;
//     this.firstName = firstName;
//     this.yearOfBirth = yearOfBirth; 
//     this.lastName = lastName;
//     this.nationality = nationality;
// }

// var john = new SmithPerson('John', 1990);
// var emily = new SmithPerson('Emily', 1983, 'Diaz', 'Spanish')


//ES6
// function SmithPerson(firstName, yearOfBirth, lastName = 'Smith', nationality = 'American1'){
//     this.firstName = firstName;
//     this.yearOfBirth = yearOfBirth; 
//     this.lastName = lastName;
//     this.nationality = nationality;
// }
// var john = new SmithPerson('John', 1990);
// var emily = new SmithPerson('Emily', 1983, 'Diaz', 'Spanish')


//*********************************************************************** */
//****Lecture 9: Rest parameters ****
//ES5
// function isFullAge5(){
//     //console.log(arguments)
//     var argsArr = Array.prototype.slice.call(arguments);

//     argsArr.forEach(element => {
//         console.log((2019-element) >= 18)
//     });
// }
// isFullAge5(1990, 1999, 1965)

// //ES6
// function isFullAge6(...years){
//     //ne trebamo pretvarati u noz kao u ES5
//     years.forEach(cur => {
//         console.log((2019 - cur) >= 18)
//     })
// }
// isFullAge6(2002,1985, 1957, 1968, 1245)

//sa dodatnim argumentom koji ne treba da ulazi u arguments
//ES5
// function isFullAge5(limit){
//     console.log(arguments)
//     var argsArr = Array.prototype.slice.call(arguments, 1);
//     //console.log(argsArr)
//     argsArr.forEach(element => {
//         console.log((2019-element) >= limit)
//     });
// }
// isFullAge5(16, 1990, 1999, 1965)

// //ES6
// function isFullAge6(limit, ...years){
//     //ne trebamo pretvarati u noz kao u ES5
//     years.forEach(cur => {
//         console.log((2019 - cur) >= limit)
//     })
// }
// isFullAge6(18, 2002,1985, 1957, 1968, 1245, 2010)






//*********************************************************************** */
//****Lecture 8: Spread operator ****
// function addFourAges(a, b, c, d){
//     return a + b + c + d;
// }

// var sum1 = addFourAges(18, 30, 12, 21);
// console.log(sum1)

// //ES5
// var ages = [18, 30, 12, 21];
// var sum2 = addFourAges.apply(null, ages)
// console.log(sum2)

// //ES6
// const max3 = addFourAges(...ages)
// console.log(max3)

// //Joining array
// const familySmith = ['John', 'Jane', 'Mark'];
// const familyMiller = ['Mary', 'Bob', 'Ann'];
// const bigFamily = [...familySmith, 'Eldin', ...familyMiller];
// console.log(bigFamily)

// const h = document.querySelector('h1');
// const boxes = document.querySelectorAll('.box');
// const all = [h, ...boxes];
// console.log(all)
// //Pretvorili smo u niz i provrtili svaki element i dodali mu purple boju
// Array.from(all).forEach(cur => {
//     cur.style.color = 'purple'
// })


//*********************************************************************** */
//****Lecture 7: Arrays Method ****

// const boxes = document.querySelectorAll('.box');
// console.log(boxes)
// //ES5
// //Pretvorili smo u niz nodeList i spremili u boxesArr5
// var boxesArr5 = Array.prototype.slice.call(boxes);
// console.log(boxesArr5)

// // boxesArr5.forEach(function(cur){
// //     cur.style.backgroundColor = 'dodgerblue'
// // });

// //ES6
// const boxesArr6 = Array.from(boxes);
// console.log(boxesArr6)

// boxesArr6.forEach(cur => {
//     cur.style.backgroundColor = 'red'
// })


//Loops
//ES5
// for(var i = 0; i < boxesArr5.length; i++){
//     if(boxesArr5[i].className === 'box blue'){
//         //continue
//         break
//     }
//     boxesArr5[i].textContent = 'I changed to blue!'
// }

//ES6
// for(const cur of boxesArr6){
//     //Ako cur.className sadrzi 'blue' klasu vrati true
//     if(cur.className.includes('blue')){
//         continue
//     }
//     cur.textContent = 'I changed to red!'
// }

// //Find element methods in array
// //ES5
// var ages = [12, 17, 8, 21, 14, 11];
// var full = ages.map(function(cur, i){
//     return cur >= 18
// })
// console.log(full)
// console.log(full.indexOf(true));
// console.log(ages[full.indexOf(true)])

// //ES6
// //nadjemo poziciju indexa na laksi nacin
// console.log(ages.findIndex(cur => cur >= 18));
// //nadjemo element koji vraca true
// console.log('find metoda')
// console.log(ages.find(cur => cur >= 18))


//Pretvara u niz
// let strArr = 'jedan, dva, tri';
// console.log(strArr);
// let strNiz = Array.from(strArr);
// console.log(strNiz)





//*********************************************************************** */
//****Lecture 6: Destructuring****

// var john = ['John', 26];
// //var name = john[0];
// //var age = john[1];

// //ES6
// const [name, age] = ['John', 26];
// console.log(name);
// console.log(age);
// console.log('--------------')
// const obj = {
//     firstName: 'John',
//     lastName: 'Smith'
// };

// const {firstName, lastName} = obj;
// console.log(firstName);
// console.log(lastName)
// console.log('--------------')

// const {firstName: a, lastName: b} = obj;
// console.log(a);
// console.log(b);
// console.log('--------------')

// function calculateAgeRetirement(year){
//     const age = new Date().getFullYear() - year;
//     return [age, 65-age]
// }

// const [age2, retirement] = calculateAgeRetirement(1990);
// console.log(age)
// console.log(retirement)
// console.log('--------------')






//*********************************************************************** */
//****Lecture 5: Arrow function - Lexical this keyword****

//ES5
//posto je unutar function zato imamo undefined, posto unutar funkcije this pokazuje na globalni objekat( window)
// var box5 = {
//     color: 'green',
//     position: 1,
//     clickMe: function(){
//         var self = this;
//         document.querySelector('.green').addEventListener('click', function(){
//             var str = 'This is box number ' + self.position + ' and it is ' + self.color;
//             alert(str)
//         })
//     }
// }
// box5.clickMe();

// //ES6
// const box6 = {
//     color: 'green',
//     position: 1,
//     clickMe: function(){
//         document.querySelector('.green').addEventListener('click', () => {
//             var str = 'This is box number ' + this.position + ' and it is ' + this.color;
//             alert(str)
//         })
//     }
// }
// box6.clickMe();


// function Person(name){
//     this.name = name;
// }

// //ES5
// Person.prototype.myFriends5 = function(friends){
//     var arr = friends.map(function(el){
//         return this.name + ' is friends with ' + friends;
//     }.bind(this))
//     console.log(arr)
// }

// var friends = ['Bob', 'Jane', 'Mark']
// new Person('John').myFriends5(friends);


// //ES5
// Person.prototype.myFriends6 = function(friends){
//     var arr = friends.map(el => this.name + ' is friends with ' + el)
//     console.log(arr)
// }

// new Person('Mike').myFriends6(friends);



// const box66 = {
//     color: 'green',
//     position: 1,
//     clickMe: () => {
//         document.querySelector('.green').addEventListener('click', () => {
//             var str = 'This is box number ' + this.position + ' and it is ' + this.color;
//             alert(str)
//         })
//     }
// }
// box66.clickMe();





//*********************************************************************** */
//****Lecture 4: Arrow function****
// const years = [1990, 1987, 1958, 1937];

// //ES5
// var ages5 = years.map(function(el){
//     return 2016 - el
// })
// console.log(ages5)

// //ES6
// let ages6 = years.map(el => 2019-el)
// console.log(ages6)

// ages6 = years.map((el, i) => `Age element ${i+1}: ${2019-el}`)
// console.log(ages6)

// ages6 = years.map((el, index) => {
//     const now = new Date().getFullYear();
//     const age = now - el;
//     return `Age element ${index+1}: ${age}`
// })
// console.log(ages6)





//*********************************************************************** */
//****Lecture 3: Strings****
// let firstNAme = 'John';
// let lastName = 'Smith';
// const yearOfBirth = 1990;
// function calculateAge(year){
//     return 2019 - year;
// }

// //ES5
// console.log('This is ' + firstNAme + ' ' + lastName + '. He was born in ' + yearOfBirth + '. Today is is ' + calculateAge(yearOfBirth) + ' years old.')

// //ES6
// console.log(`This is ${firstNAme}  ${lastName}. He was born...`)

// const n = `${firstNAme} ${lastName}`;

// console.log(n.startsWith('Joh'))
// console.log(n.endsWith('th'))
// console.log(n.includes(' '))
// console.log(firstNAme.repeat(2))






//*********************************************************************** */
//****Lecture 2: Blocks and IIFEs****

//ES6
// {
//     const a = 1;
//     let b = 2;
//     var c = 3;
// }

//console.log(a + b)
// console.log(c)

//ES5
// (function(){
//     var c = 3;
// })();
//console.log(c)




//*********************************************************************** */
//****Lecture 1: let and const****

// //ES5
// var name5 = 'Jane Smith';
// var age5 = 23;
// name5 = 'Jane Miller';

// console.log(name5)

// //ES6
// const name6 = 'Jane Smith';
// let age6 = 23;
// //name6 = 'Jane Miller';
// console.log(name6)

//ES5
// function driversLicence5(passedTest){
//     if(passedTest){
//         console.log(firstNAme)
//         var firstNAme = 'John';
//         var yearOfBirth = 1990;
//     }
//     console.log(firstNAme + ', ' + yearOfBirth)
// }
// driversLicence5(true)

// //ES6
// function driversLicence6(passedTest){
//     //console.log(firstNAme)
//     let firstNAme;
//     const yearOfBirth = 1990;
//     if(passedTest){
//         firstNAme = 'John';
//     }
//     console.log(firstNAme + ', ' + yearOfBirth)
// }
// driversLicence6(true)


// var i = 23;
// for(var i = 0; i < 5; i++){
//     console.log(i)
// }

// console.log(i)