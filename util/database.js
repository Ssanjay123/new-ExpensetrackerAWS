const Sequelize = require("sequelize");
const sequelize = new Sequelize("expense-project","root","Balaji@123",{
dialect:"mysql",
host:"localhost"
})

module.exports = sequelize;