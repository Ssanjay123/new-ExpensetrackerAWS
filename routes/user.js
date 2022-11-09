const express = require("express")

const userController = require("../controllers/user");
const expenseController = require("../controllers/expense");

const router = express.Router();

router.post("/signup",userController.signup);
router.post("/login",userController.login);
router.post("/add-expense",expenseController.addexpense);
router.get("/get-expense",expenseController.getexpense);
router.delete("/delete-expense/:id",expenseController.deleteexpense);

module.exports = router;
