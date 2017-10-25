module.exports = function(sequelize, DataTypes){
  var Topic = sequelize.define('topic', {
    name: {type: DataTypes.STRING, unique: true, allowNull: false}
  }, {
    tableName: 'topics'
  }, {
    indexes: [
      {
        name: 'Topics_pkey',
        unique: true,
        fields: ['id']
      },
      {
        name: 'Topics_name_key',
        unique: true,
        fields: ['name']
      }
    ]
  });

  Topic.associate = function(models){
    Topic.belongsTo(models.user, {
      foreignKey: {
        name: 'author_id',
        allowNull: false
      },
      onDelete: 'NO ACTION'
    });
  };
  return Topic;
};