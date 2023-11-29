// var name1 = "Dattatray"
// function say(){
//     return this.name1;
// }

// const tell= ()=>{
//     // console.log("123")
//     return this.name1;
    
// }
// const person = {
// name:"Balaji",
// age:25,
// say,
// tell
// }

// console.log(say());
// console.log(tell());

// const name = (arr)=>{
//     let count=0;
//     return `Hello ${arr[count++]}`
// }

// let fun = name(["Ram","Shyam"])

// console.log(name(["Ram","Shyam"]));


// function Person(firstName, lastName, age, sex) {
//   this.age = age;
//   this.firstName = firstName;
//   this.lastName = lastName;
//   this.sex = sex;
//   this.printFullName = () => {
//     console.log("Full Name = ", this.firstName, this.lastName);
//   };
// }

// Person.prototype.findEligibleOrNOt = function findEligibleOrNOt(minAge) {
//     console.log(this.age);
//   if(this.age>minAge){
//     console.log(this.firstName + ' is eligible');
//   }
//   else{
//     console.log(this.firstName + ' is not eligible');
//   }
// };

// function createNewStudents(){
//     const person1 = new Person("Balaji","Thorbole",26,"M");
//     const person2 = new Person("Dattatray","Thorbole",17,"M");

//     person1.printFullName();
//     person1.findEligibleOrNOt(18);
//     person2.printFullName();
//     person2.findEligibleOrNOt(18);
// }

// // createNewStudents();

// console.log(Person.prototype);


