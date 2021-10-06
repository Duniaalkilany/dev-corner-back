const {
  Sequelize,
  DataTypes
} = require('sequelize');

// const sequelize = new Sequelize('postgres://localhost:5432/dunia')
const sequelize = new Sequelize(process.env.DATABASE_URL)

const PostSchema = sequelize.define('proj-post', {
  userId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  desc: {
    type: DataTypes.STRING,
    validate: {
      len: [0, 500]
    },
  },
  img: {
    type: DataTypes.STRING,
  },
  likes: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [],
  },
});

module.exports = PostSchema;