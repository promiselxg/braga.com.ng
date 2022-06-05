module.exports = (sequelize, DataTypes) => {
  const Reservation = sequelize.define('reservation', {
    userid: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    roomid: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    checkIn: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    checkOut: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    totalAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },

    totalDays: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('pending', 'success', 'cancelled'),
      defaultValue: 'pending',
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    specialRequest: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    reservation_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    referenceNo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    transactionId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  return Reservation;
};
