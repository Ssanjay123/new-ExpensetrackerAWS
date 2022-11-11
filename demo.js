var name1 = "Dattatray"
function say(){
    return this.name1;
}

const tell= ()=>{
    // console.log("123")
    return this.name1;
    
}
const person = {
name:"Balaji",
age:25,
say,
tell
}

console.log(say());
console.log(tell());