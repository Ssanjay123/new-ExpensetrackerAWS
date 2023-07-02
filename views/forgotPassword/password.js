async function forgotPassword(e){
   e.preventDefault();
   const form = new FormData(e.target)

   const userDetails = {
    email:form.get("email")
   }

   console.log(userDetails);
   axios.post("http://16.16.199.5:3000/password/forgotpassword",userDetails).then(response=>{
    console.log(response)
if(response.status===202){
document.body.innerHTML = `<div style="color:red">Mail Sent Successfully</div>`
}
else{
    throw new Error("something went wrong")
}

   })
   .catch(err=>{
   document.body.innerHTML = `<div style="color:red">$(err)</div>`;
   })
}