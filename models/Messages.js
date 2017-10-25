module.exports = function(sequelize, DataTypes){
  var Message = sequelize.define('message', {
    body: {type: DataTypes.TEXT, allowNull: false}
  }, {
    tableName: 'messages'
  }, {
    indexes: [
      {
        name: 'Messages_pkey',
        method: 'BTREE',
        unique: true,
        fields: ['id']
      }
    ]
  });

  Message.associate = function(models){
    Message.belongsTo(models.user, {foreignKey: 'author_id'});
    Message.belongsTo(models.topic, {foreignKey: 'topic_id'});
  };
  return Message;
};