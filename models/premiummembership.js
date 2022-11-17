const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const premiumMembership = sequelize.define('premiummembership',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
   
    orderId:Sequelize.STRING,

})

module.exports = premiumMembership;