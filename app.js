const express = require("express");
const bodyParser = require("body-parser")
const dotenv = require("dotenv")
const path = require("path");
dotenv.config();
const sequelize = require("./util/database");
const cors = require("cors");
const app = express();
const Expense = require("./models/expense");
const User = require("./models/user");
const Order = require("./models/orders")
const premiumMembership = require("./models/premiummembership")
const Forgotpassword = require("./models/forgotPassword");
const userRoutes = require("./routes/user");
const expenseRoutes = require("./routes/expense");
const purchaseRoutes = require("./routes/purchase");
const resetPasswordRoutes = require('./routes/resetpassword')

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());

app.use("/user",userRoutes);
app.use("/expense",expenseRoutes);
app.use("/purchase",purchaseRoutes)
app.use("/password",resetPasswordRoutes)

app.use((req,res)=>{
 res.sendFile(path.join(__dirname,`views/${req.url}`));
})

User.hasMany(Expense)
Expense.belongsTo(User);

User.hasMany(Order)
Order.belongsTo(User)

User.hasMany(Forgotpassword);
Forgotpassword.belongsTo(User);

User.hasMany(premiumMembership);
premiumMembership.belongsTo(User);



sequelize
// .sync({force:true})
.sync()
.then(()=>{
    app.listen(process.env.PORT)
})
.catch(err=>console.log(err))