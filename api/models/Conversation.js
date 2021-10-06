const {
  Sequelize,
  DataTypes
} = require('sequelize');

const sequelize = new Sequelize('postgres://localhost:5432/dunia')

const ConversationSchema = sequelize.define('proj-conv', {
  members: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [],
  }

}



)




module.exports = ConversationSchema;