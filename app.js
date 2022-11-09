const express = require("express");
const bodyParser = require("body-parser")
const sequelize = require("./util/database");
const cors = require("cors");
const app = express();
const Expense = require("./models/expense");
const User = require("./models/user");
const userRoutes = require("./routes/user");

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());

app.use("/user",userRoutes);
app.use("/expense",userRoutes);

User.hasMany(Expense)
Expense.belongsTo(User);

sequelize
// .sync({force:true})
.sync()
.then(()=>{
    app.listen(3000)
})
.catch(err=>console.log(err))