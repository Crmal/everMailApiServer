import { DataTypes, Model } from 'sequelize';

class EmailTable extends Model {
  static init(sequelize) {
    return super.init(
      {
        sender_name: {
          type: DataTypes.STRING(20),
          allowNull: true,
        },
        receive_name: {
          type: DataTypes.STRING(20),
          allowNull: true,
        },
        text: {
          type: DataTypes.STRING,
        },
        subject: {
          type: DataTypes.STRING,
        },
        subject_name: {
          type: DataTypes.STRING,
        },
        receive: {
          type: DataTypes.STRING,
        },
      },
      {
        sequelize,
        modelName: 'EmailTable',
        tableName: 'emailTables',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      },
    );
  }

  static associate(db) {
    db.EmailTable.belongsTo(db.User, {
      foreignKey: { name: 'send_id', allowNull: false },
      sourceKey: 'id',
      onDelete: 'CASCADE',
    });
  }
}

export default EmailTable;
