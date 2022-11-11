const express = require("express");
const bodyParser = require("body-parser")
const sequelize = require("./util/database");
const cors = require("cors");
const app = express();
const Expense = require("./models/expense");
const User = require("./models/user");
const Order = require("./models/orders")
const userRoutes = require("./routes/user");
const expenseRoutes = require("./routes/expense");
const purchaseRoutes = require("./routes/purchase");
const dotenv = require("dotenv")

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());
dotenv.config();

app.use("/user",userRoutes);
app.use("/expense",expenseRoutes);
app.use("/purchase",purchaseRoutes)

User.hasMany(Expense)
Expense.belongsTo(User);

User.hasMany(Order)
Order.belongsTo(User)



sequelize
// .sync({force:true})
.sync()
.then(()=>{
    app.listen(3000)
})
.catch(err=>console.log(err))