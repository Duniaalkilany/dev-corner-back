require ("dotenv").config()

const {
  Sequelize,
  DataTypes
} = require('sequelize');

// const sequelize = new Sequelize('postgres://localhost:5432/dunia')
const sequelize = new Sequelize(process.env.DATABASE_URL)

const MessageSchema = sequelize.define('message', {
  conversationId: {
    type: DataTypes.STRING,
  },
  //sender contain sender id 
  sender: {
    type: DataTypes.STRING,
  },
  text: {
    type: DataTypes.STRING,
  },
})

module.exports = MessageSchema