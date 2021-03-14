module.exports = function (sequelize, DataTypes) {
  var Songs = sequelize.define("Songs", {

    song: DataTypes.STRING,
    artist: DataTypes.STRING,

  });

  // Performances.associate = function (models) {

  // };
  return Songs;
};
