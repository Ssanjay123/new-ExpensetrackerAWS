const Expense = require("../models/expense");

exports.addexpense = async(req,res,next)=>{
    try{
    const {expense,description,category} = req.body;
   const result =  await Expense.create({expense,description,category})
  res.status(201).json({newExpense:result,message:'successful'})
    }
    catch(err){
        res.status(500).json({message:'failed'});
    }
}

exports.getexpense = async(req,res,next)=>{
    try{
        const result = await Expense.findAll()
        res.status(200).json({allExpenses:result,message:'successful'})
    }
    catch(err){
        res.status(500).json({err:err})
    }
}

exports.deleteexpense = async(req,res)=>{
 try{
    const id = req.params.id
    console.log(id);
    await Expense.destroy({where:{id:id}})
    res.status(200).json({message:'successfully deleted'})
 }
 catch(err){
    res.status(500).json({err:err});
 }
}