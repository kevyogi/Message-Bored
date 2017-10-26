module.exports = function (sequelize, DataTypes){
  var User = sequelize.define('user', {
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    password: DataTypes.STRING
  }, {
    tableName: 'users'
  }, {
    indexes: [
      {
        name: 'Users_pkey',
        unique: true,
        fields: ['id']
      },
      {
        name: 'Users_name_key',
        unique: true,
        fields: ['name']
      }
    ]
  });
  return User;
};