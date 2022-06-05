module.exports = (sequelize, DataTypes) => {
  const Room = sequelize.define('room', {
    roomid: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.ENUM('delux', 'presidential', 'executive'),
      defaultValue: 'delux',
    },
    qty: {
      type: DataTypes.INTEGER,
      allowNull: false,
      default: 1,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      default: 1000,
    },
    bedSize: {
      type: DataTypes.ENUM('king', 'twin'),
      defaultValue: 'king',
    },
    roomFeatures: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ac: {
      type: DataTypes.ENUM('true', 'false'),
      defaultValue: 'true',
    },
    allowChildren: {
      type: DataTypes.ENUM('true', 'false'),
      defaultValue: 'true',
    },
    adult: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      max: 5,
    },
    kids: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      max: 5,
    },
    cancellation: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
    thumbnail: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
    otherImg: {
      type: DataTypes.JSON,
      defaultValue: '',
    },
    imageId: {
      type: DataTypes.JSON,
      defaultValue: '',
    },
    discount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  });

  return Room;
};
