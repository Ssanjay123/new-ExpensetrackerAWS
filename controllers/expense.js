const Expense = require("../models/expense");
const User = require("../models/user")
const itemsPerPage = 2;

exports.addexpense = async(req,res,next)=>{
    try{
    const {expense,description,category} = req.body;
   const result =  await req.user.createExpense({expense,description,category})
  res.status(201).json({newExpense:[result],message:'successful'})
    }
    catch(err){
        res.status(500).json({message:'failed'});
    }
}

exports.getexpense = async(req,res,next)=>{
    let totalItems;
    const page = Number(req.query.page || 1);
    const numberOfExpenses = Number(req.query.numOfExp);
    console.log(numberOfExpenses)
    Expense.count()
    .then(total=>{
      totalItems=total;
      return req.user.getExpenses(
        {offset: (page-1)*numberOfExpenses,
          limit:numberOfExpenses
    });
    
    })
      .then(expenses => { 
        res.json(
          {allExpenses:expenses,
           currentpage:page,
           hasNextPage:numberOfExpenses*page<totalItems,
           nextPage:page+1,
           hasPreviousPage:page > 1,
           previousPage:page - 1,
           limit:numberOfExpenses,
          lastPage:Math.ceil(totalItems/numberOfExpenses)})
      })
      .catch(err => {
        console.log(err);
      });
    }
    

exports.deleteexpense = async(req,res)=>{
 try{
    const id = req.params.id
    console.log(id);
    const expense = await Expense.destroy({where:{id:id,userId:req.user.id}})
    console.log(expense)
    res.status(200).json({message:'successfully deleted'})
 }
 catch(err){
    res.status(500).json({err:err});
 }
}

exports.getAllUsers = (req,res)=>{
    User.findAll()
     .then(result=>{
       return res.status(201).json({success:true , data:result})
     })
     .catch(err =>{
       return res.status(500).json({success:false , message:"failed"})
     })
}

exports.getAllExpenses = (req,res)=>{
   const userid = req.params.id
   Expense.findAll({where:{userId:userid}})
   .then(result=>{
       return res.status(201).json({success:true , data:result})
   })
   .catch(err =>{
       return res.status(500).json({success:false , data:err})
   })
}