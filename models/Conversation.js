require ("dotenv").config()


const {
  Sequelize,
  DataTypes
} = require('sequelize');

// const sequelize = new Sequelize('postgres://localhost:5432/dunia')
const sequelize = new Sequelize(process.env.DATABASE_URL)

const ConversationSchema = sequelize.define('conv', {
  members: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [],
  }

}



)




module.exports = ConversationSchema;