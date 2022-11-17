const express = require("express")
const Expense = require("../models/expense")
const expenseController = require("../controllers/expense");
const router = express.Router();
const userAuthentication = require("../middleware/auth");


router.post("/add-expense",userAuthentication.authenticate,expenseController.addexpense);
router.get("/get-expense",userAuthentication.authenticate,expenseController.getexpense);
router.delete("/delete-expense/:id",userAuthentication.authenticate,expenseController.deleteexpense);
router.get("/allusers",userAuthentication.authenticate,expenseController.getAllUsers)
router.get("/allExpense/:id",expenseController.getAllExpenses)
module.exports = router;