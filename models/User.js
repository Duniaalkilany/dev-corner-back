require ("dotenv").config()


const {
  Sequelize,
  DataTypes
} = require('sequelize');

// const sequelize = new Sequelize('postgres://localhost:5432/dunia')
const sequelize = new Sequelize(process.env.DATABASE_URL)

const UserSchema = sequelize.define('proj', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      len: [3, 20]
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      len: [0, 50]
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [6, 500]
    },
  },
  profilePicture: {
    type: DataTypes.STRING,
    defaultValue: '',
  },
  coverPicture: {
    type: DataTypes.STRING,
    defaultValue: '',
  },
  followers: {
    type: DataTypes.ARRAY(DataTypes.NUMBER),
    defaultValue: [],
  },
  followings: {
    type: DataTypes.ARRAY(DataTypes.NUMBER),
    defaultValue: [],
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  desc: {
    type: DataTypes.STRING,
    validate: {
      len: [0, 50]
    },
  },
  city: {
    type: DataTypes.STRING,
    validate: {
      len: [0, 50]
    },
  },
  from: {
    type: DataTypes.STRING,
    validate: {
      len: [0, 50]
    },
  },
  relationship: {
    type: DataTypes.ENUM(["1", "2", "3"]),
  },
  
});

module.exports = UserSchema