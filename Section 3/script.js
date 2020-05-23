//Hoisting
//*********functions
//calculateAge(1986);
//function calculateAge(year){//samo function declarations podrzava hoisting
//    console.log(2019-year)
//}
////***********************************
////retirement(1990);
//var retirement = function(year){ //function expressons ne podrzva hoisting
//    console.log(85 - (2019 - year));
//}

//**************variables
/*console.log(age)
var age = 23;
//console.log(age)
function foo(){
    var age = 65;
    console.log(age)
}*/

//foo();
//console.log(age)
//Scoping
//var a = "Hello!";
//first();

//function first(){
//    var b = "Hi";
//    second();
//    function second(){
//        var c ="Hey!";
//        console.log(a+b+c)
//    }
//}

/* ====- THIS KEYWORD -==== */

//console.log(this)
//--------------------------
//function this call
//calculateAge(1986)
//function calculateAge(year){
//    console.log(2019-year);
//    console.log(this)
//}
//--------------------------
//object this call
var john = {
    name: 'John',
    yearOfBirth: 1990,
    calculateAge: function(){
        console.log(this);
        console.log(2018 - this.yearOfBirth)
        
//        function innerFunction(){
//            console.log(this)
//        }
//        
//        innerFunction();
        
        
    }
}

john.calculateAge();


var mike = {
    name: 'Mike',
    yearOfBirth: 1984
}

mike.calculateAge = john.calculateAge;//kopirali smo metodu od john.calculate i dodjelili u mike.calculate
mike.calculateAge();


























