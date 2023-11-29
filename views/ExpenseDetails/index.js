async function addExpense(e){
    e.preventDefault();
  const expenseDetails = {
    expense : e.target.expense.value,
    description : e.target.description.value,
    category : e.target.category.value
  }
  const token = localStorage.getItem("token");
  const response = await axios.post("http://52.66.200.118:3000/expense/add-expense",expenseDetails,{headers:{"authorization":token}})
  console.log(response);
  showExpenseOnScreen(response.data.newExpense)
}

    window.addEventListener("DOMContentLoaded",async()=>{
        try{
           let NumberOfexpenses = document.getElementById("showExpense").value
           console.log(NumberOfexpenses);
            let page = 1;
          const token = localStorage.getItem("token");
      const res = await axios.get(`http://52.66.200.118:3000/expense/get-expense?page=${page}&numOfExp=${NumberOfexpenses}`,{headers:{"authorization":token}})
      console.log(res);
        showExpenseOnScreen(res.data.allExpenses);
        showPagination(res.data)
    
    }
    catch(err){
        console.log(err);
    }
    });

    async function showExpenseOnScreen(expense){
        try{
            document.getElementById("expense").value = ''
            document.getElementById("description").value = ''
            document.getElementById("category").value = ''
       
        const parentNode = document.getElementById('listOfExpense')
        parentNode.innerHTML = ''
        expense.forEach(expense=>{
       parentNode.innerHTML += `<li id="${expense.id}">${expense.expense} - ${expense.description} - ${expense.category}
                           <button onclick=deleteExpense("${expense.id}")>Delete</button></li>`
                        
                        })
        }
        catch(err){
            console.log(err);
        }
    }
      
    async function deleteExpense(expenseId){
        try{
            const token = localStorage.getItem('token');
        await axios.delete(`http://52.66.200.118:3000/expense/delete-expense/${expenseId}`,{headers:{"authorization":token}})
        removeExpenseFromScreen(expenseId);
    }
    catch(err){
     console.log(err);
    }
}

async function removeExpenseFromScreen(expenseId){
    const parentNode = document.getElementById('listOfExpense')
    const childToBeRemoved = document.getElementById(expenseId)
    if(childToBeRemoved){
        parentNode.removeChild(childToBeRemoved);
    }
}

document.getElementById('rzp-button1').onclick = async function (e) {
    const token = localStorage.getItem("token")
    const response  = await axios.get('http://52.66.200.118:3000/purchase/premiummembership', { headers: {"authorization" : token} });
    console.log(response);
    var options =
    {
     "key": response.data.key_id, // Enter the Key ID generated from the Dashboard
     "name": "Test Company",
     "order_id": response.data.order.id, // For one time payment
     "prefill": {
       "name": "Test User",
       "email": "test.user@example.com",
       "contact": "7003442036"
     },
     "theme": {
      "color": "#3399cc"
     },
     // This handler function will handle the success payment
     "handler": function (response) {
         console.log(response);
         axios.post('http://52.66.200.118:3000/purchase/updatetransactionstatus',{
             order_id: options.order_id,
             payment_id: response.razorpay_payment_id,
         }, { headers: {"authorization" : token} }).then(() => {
             alert('You are a Premium User Now')
         }).catch(() => {
             alert('Something went wrong. Try Again!!!')
         })
     },
  };

  const rzp1 = new Razorpay(options);
  rzp1.open();
  e.preventDefault();

  rzp1.on('payment.failed', function (response){
  alert(response.error.code);
  alert(response.error.description);
//   alert(response.error.source);
//   alert(response.error.step);
//   alert(response.error.reason);
//   alert(response.error.metadata.order_id);
//   alert(response.error.metadata.payment_id);
 });
}

function showPagination({
    currentpage,
    hasNextPage,
     nextPage,
     hasPreviousPage,
    previousPage,
    lastPage}){
        let pagination = document.getElementById('pagination')
        pagination.innerHTML='';
    
             const btn1 = document.createElement('button');
                btn1.innerHTML =`<h3>${currentpage}</h3>`
                btn1.addEventListener('click',()=>getExpenses(currentpage))
               pagination.appendChild(btn1);
    
    
            if(hasPreviousPage){
                const btn2 = document.createElement('button');
                btn2.innerHTML = previousPage;
                btn2.addEventListener('click',()=>getExpenses(previousPage))
               pagination.appendChild(btn2);
            }
            
                if(hasNextPage){
                const btn3 = document.createElement('button');
                btn3.innerHTML =  nextPage;
                btn3.addEventListener('click',()=>getExpenses(nextPage))
               pagination.appendChild(btn3);
            }
    }

    function getExpenses(page){
        const token = localStorage.getItem('token');
        axios.get(`http://52.66.200.118:3000/expense/get-expense?page=${page}`,{headers:{"authorization":token}})
        .then(res=>{
            showExpenseOnScreen(res.data.allExpenses);
            
            showPagination(res.data);
        })
    }

    const leaderBoard=document.getElementById('leader');
leaderBoard.addEventListener('click',()=>{
  if (confirm('Are you sure')) {
    window.location='../leaderboard.html';
  }
})


// function showDynamicExpenses(){
    
// }