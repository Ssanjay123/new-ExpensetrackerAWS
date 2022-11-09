async function addExpense(e){
    e.preventDefault();
  const expenseDetails = {
    expense : e.target.expense.value,
    description : e.target.description.value,
    category : e.target.category.value
  }
  const response = await axios.post("http://localhost:3000/expense/add-expense",expenseDetails)
  console.log(response);
  showExpenseOnScreen(response.data.newExpense)
}

    window.addEventListener("DOMContentLoaded",async()=>{
        try{
      const res = await axios.get("http://localhost:3000/expense/get-expense")
      console.log(res);
      for(let i=0;i<res.data.allExpenses.length;i++){
        showExpenseOnScreen(res.data.allExpenses[i]);
      }
    }
    catch(err){
        console.log(err);
    }
    });

    async function showExpenseOnScreen(expense){
        try{
        document.getElementById('expense').value = '';
        document.getElementById('description').value = '';
        document.getElementById('category').value = '';

        const parentNode = document.getElementById('listOfExpense')
       const childHTML = `<li id="${expense.id}">${expense.expense} - ${expense.description} - ${expense.category}
                           <button onclick=deleteExpense("${expense.id}")>Delete</button>
                           <button onclick=editExpense("${expense.id}")>Edit</button></li>`
                           parentNode.innerHTML = parentNode.innerHTML + childHTML;
        }
        catch(err){
            console.log(err);
        }
    }
      
    async function deleteExpense(expenseId){
        try{
        await axios.delete(`http://localhost:3000/expense/delete-expense/${expenseId}`)
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