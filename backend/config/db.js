const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 1000,
    },
    logging: false,
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log(`Database connection successfull.`.cyan.bold.underline);
  })
  .catch((error) => {
    console.log('Error' + error.red.bold);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// create Table
db.users = require('../model/userModel')(sequelize, DataTypes);
db.rooms = require('../model/roomModel')(sequelize, DataTypes);
db.reservation = require('../model/reservationModel')(sequelize, DataTypes);

//  Table Relationships
db.reservation.hasMany(db.rooms, {
  foreignKey: 'roomid',
  as: 'room',
});

db.rooms.belongsTo(db.reservation, {
  foreignKey: 'roomid',
  as: 'reservation ',
});

db.sequelize.sync({ force: false }).then(() => {});

module.exports = db;
