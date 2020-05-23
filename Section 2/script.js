//******* Loops and Iterations  Assigment *******
var johnBillObj = {
    bill: [124, 48, 268, 180, 42],
    payedTips: [],
    payedBills: [],
    calculateTip: function(){
        for(var i = 0; i < this.bill.length; i++){
           if(this.bill[i] < 50){
               this.payedTips.push(this.bill[i] * 0.2);
               this.payedBills.push(this.bill[i] * 0.2 + this.bill[i]);
           }else if(this.bill[i] >= 50 && this.bill[i] <= 200){
               this.payedTips.push(this.bill[i] * 0.15);
               this.payedBills.push(this.bill[i] * 0.15 + this.bill[i]);
           }else{
               this.payedTips.push(this.bill[i] * 0.1);
               this.payedBills.push(this.bill[i] * 0.1 + this.bill[i]);
           }
        }
    }
}
johnBillObj.calculateTip();

var marksBillArr = [77, 375, 110, 45];
function avgTips(arr){
    var sum = 0; 
    var avgTipsResult;
    
    for(var i = 0; i < arr.length; i++){
        if(arr[i] < 100){
           sum += arr[i] * 0.2 
        }else if(arr[i] >= 100 && arr[i] <= 300){
            sum += arr[i] * 0.10
        }else{
            sum += arr[i] * 0.25
        }
    }
    avgTipsResult = sum / arr.length;
    return avgTipsResult
}
var marksAvgTips = avgTips(marksBillArr);

var sum = 0; 
var avgJohnTips;
for(var i = 0; i < johnBillObj.payedTips.length; i++){
    sum += johnBillObj.payedTips[i];
}
avgJohnTips = sum / johnBillObj.payedTips.length

if(marksAvgTips > avgJohnTips){
    console.log('Mark payed more tips')
}else{
    console.log('John payed more tips')
}

//Teachers solution
var john = {
    fullName: 'John Smith',
    bills: [124, 48, 268, 180, 42],
    calcTips: function(){
        this.tips = [];
        this.finalValues = [];
        
        for(var i = 0; i < this.bills.length; i++){
        var bill = this.bills[i];
        var percentage;
        
            if(bill < 50){
                percentage = 0.2
            }else if(bill >= 50 && bill < 200){
                percentage = 0.15
            }else{
                percentage = 0.1
            }
            this.tips[i] = bill * percentage;
            this.finalValues[i] = bill + percentage;
        }
    }
}

var mark = {
    fullName: 'Mark Doe',
    bills: [77, 475, 110, 45],
    calcTips: function(){
        this.tips = [];
        this.finalValues = [];
        
        for(var i = 0; i < this.bills.length; i++){
        var bill = this.bills[i];
        var percentage;
        
            if(bill < 100){
                percentage = 0.2
            }else if(bill >= 100 && bill < 300){
                percentage = 0.1
            }else{
                percentage = 0.25
            }
            this.tips[i] = bill * percentage;
            this.finalValues[i] = bill + percentage;
        }
    }
}

function calcAverage(tips){
    var sum = 0;
    for(var i = 0; i < tips.length; i++){
        sum += tips[i]
    }
    return sum / tips.length;
}

john.calcTips();
mark.calcTips();
console.log(john, mark);

john.average = calcAverage(john.tips)
mark.average = calcAverage(mark.tips)

if(john.average > mark.average){
    console.log(john.fullName + ' family pays higher tips, with an average of $' + john.average)
}else{
    console.log(mark.fullName + ' family pays higher tips, with an average of $' + mark.average)
}

//***********Teachers solution ends*****************

//******* Loops and Iterations *******
//for(var i = 0; i < 10; i++){
//    console.log(i+1)
//}
//var john = ['John', 'Smith', 1990, 'designer', false, 'blue'];
//
//for(var i = 0; i < john.length; i++){
//    if(typeof john[i] !== 'string') continue;
//    console.log(john[i])
//}


//-------------------------------------------------
//******* Object Assigment *******
/*
var johnInfo = {
    fullName: 'John Smith',
    mass: 92,
    height: 1.95,
    BMI: function(){
        return this.mass / (Math.pow(this.height, 2))
    }
}
var markInfo = {
    fullName: 'Mark Marka',
    mass: 78,
    height: 1.69,
    BMI: function(){
        return this.mass / (Math.pow(this.height, 2))
    }
}
//markInfo.BMI();
//console.log('Mark: ' + markInfo.BMI())

//johnInfo.BMI();
//console.log(johnInfo.BMI())

//if(johnInfo.BMI() > markInfo.BMI()){
//    console.log(johnInfo.fullName + ' has greather BMI than ' + markInfo.fullName)
//}else{
//    console.log(markInfo.fullName + ' has greather BMI than ' + johnInfo.fullName)
//}

johnInfo.BMI() > markInfo.BMI() ? console.log(johnInfo.fullName + ' has greather BMI than ' + markInfo.fullName) : console.log(markInfo.fullName + ' has greather BMI than ' + johnInfo.fullName)
*/
//--------------------------------------------------------

//******* Objects and Propertyes
//var john = {
//    firstName: 'John',
//    lastName: 'Smith',
//    birthYear: 1990,
//    family: ['Jane', 'Mark', 'Bob', 'Emily'],
//    job: 'teacher',
//    isMarried: false
//};
//
//console.log(john.firstName);
//console.log(john['lastName'])
//var x = 'birthYear';
//console.log(john[x])
//
//john.job = 'designer';
//console.log(john.job);
//john['isMarried'] = true;
//
//console.log(john);
//
//var jane = new Object();
//jane.name = 'Jane';
//jane.birthdate = 1969;
//jane['lastName'] = 'Smith';
//console.log(jane)

//************* Object methods
//var john = {
//    firstName: 'John',
//    lastName: 'Smith',
//    birthYear: 1991,
//    family: ['Jane', 'Mark', 'Bob', 'Emily'],
//    job: 'teacher',
//    isMarried: false,
//    calcAge: function(){
//        this.age = 2018 - this.birthYear;
//    }
//};
//
//john.calcAge();
//
//console.log(john)

//------------------------------------------------------------------
/*
//******* Array Assigment *******
var tipsArray = [];
var totalBills = [];
function tipCalculator(billAmount){
    if(billAmount < 50){
        return (20/100) * billAmount
    }else if(billAmount >= 50 && billAmount <= 200){
        return (15/100) * billAmount;
    }else{
        return (10/100) * billAmount
    }
}
tipsArray.push(tipCalculator(268));
tipsArray.push(tipCalculator(48));
tipsArray.push(tipCalculator(124));
totalBills.push(tipCalculator(268) + 268);
totalBills.push(tipCalculator(48) + 48);
totalBills.push(tipCalculator(124) + 124)
console.log(totalBills, tipsArray)

//********** Array **************
var names = ['Eldin', 'Edi', 'Edy'];
var years = new Array(1990, 1979, 1949);

console.log(names.length);

names[1] = 'Ben';
console.log(names);

names[names.length] = 'Mery';
console.log(names)

// == - Methods - == 
var john = ['John', 'Smith', 1990, 'teacher', false, 'designer'];
john.push('blue');//Pusha na kraj niza
console.log(john);
john.unshift('Mr');//pusha na pocetak niza
console.log(john);
john.pop();//uklanja zadnji elemenat u nizu
console.log(john);
john.shift();//uklanja prvi elemenat u nizu
console.log(john);
console.log(john.indexOf(1990));

var isDesigner = john.indexOf('designer') === -1 ? 'John is Not designer' : 'John is designer';
console.log(isDesigner);
console.log(john.indexOf('designer'))
*/


//-----------------------------------------------------------------
/*
//*************** Functions *************
var whatYouDo = function(job, firstName){
    switch(job){
        case 'teacher':
            return firstName + ' teaches kids how to code';
        case 'driver':
            return firstName + ' teaches kid how to drive';
        case 'designer': 
            return firstName + ' teaches kid how to design';
        default: 
            return firstName + ' does something else.'
    }
}

console.log(whatYouDo('teacher', 'Eldin'))
console.log(whatYouDo('swiming', 'Edy'))
*/
/*
function calculateAge(birthYear){
    return 2019 - birthYear;
}

var ageJohn = calculateAge(1990);
var ageMike = calculateAge(1948);
var ageJane = calculateAge(1969);
*/
//*****************************************
/*
function yearsUntilRetirement(year, firstName){
    var age = calculateAge(year);
    var retirement = 65 - age;
    
    if(retirement > 0){
        console.log(firstName + ' retires in ' + retirement + ' years.')
    }else{
        console.log(firstName + ' is retired.')
    }
    
}
yearsUntilRetirement(1986, 'Eldin')
yearsUntilRetirement(1948, 'Mike')
yearsUntilRetirement(1969, 'Jane')
*/


var elem = document.getElementById('result')
elem.innerHTML ='drink' + ' ';
