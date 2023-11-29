async function login(e){
    try{
    e.preventDefault();
    const loginDetails ={
    email:e.target.email.value,
    password:e.target.password.value
    } 
  const response = await axios.post("http://52.66.200.118:3000/user/login",loginDetails)
  alert(response.data.message)
  localStorage.setItem("token",response.data.token);
  window.location.href="../ExpenseDetails/index.html"
  }
catch(err){
    console.log(JSON.stringify(err))   
    document.body.innerHTML += `<div style=color:red>${err}</div>`;
}
}

function forgotPassword(){
  window.location.href = "../forgotPassword/forgotPassword.html"
}