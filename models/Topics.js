module.exports = function(sequelize, DataTypes){
  var Topic = sequelize.define('topic', {
    name: {type: DataTypes.STRING, unique: true, allowNull: false}
  }, {
    tableName: 'topics'
  }, {
    indexes: [
      {
        name: 'Topics_pkey',
        method: 'BTREE',
        unique: true,
        fields: ['id']
      },
      {
        name: 'Topics_name_key',
        method: 'BTREE',
        unique: true,
        fields: ['name']
      }
    ]
  });

  Topic.associate = function(models){
    Topic.belongsTo(models.user, {foreignKey: 'author_id'});
  };
  return Topic;
};