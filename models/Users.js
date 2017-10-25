module.exports = function (sequelize, DataTypes){
  var User = sequelize.define('user', {
    name: {type: DataTypes.STRING, unique: true, allowNull: false}
  }, {
    tableName: 'users'
  }, {
    indexes: [
      {
        name: 'Users_pkey',
        method: 'BTREE',
        unique: true,
        fields: ['id']
      },
      {
        name: 'Users_name_key',
        method: 'BTREE',
        unique: true,
        fields: ['name']
      }
    ]
  });

  User.associate = function(models){
    User.hasMany(models.topic);
    User.hasMany(models.message);
  };
  return User;
};