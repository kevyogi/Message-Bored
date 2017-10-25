module.exports = function(sequelize, DataTypes){
  var Message = sequelize.define('message', {
    body: {type: DataTypes.TEXT, allowNull: false}
  }, {
    tableName: 'messages'
  }, {
    indexes: [
      {
        name: 'Messages_pkey',
        unique: true,
        fields: ['id']
      }
    ]
  });

  Message.associate = function(models){
    Message.belongsTo(models.user, {
      foreignKey: {
        name: 'author_id',
        allowNull: false
      },
      onDelete: 'NO ACTION'
    });
    Message.belongsTo(models.topic, {
      foreignKey: {
        name: 'topic_id',
        allowNull: false
      },
      onDelete: 'NO ACTION'
    });
  };
  return Message;
};