import { DataTypes, Model } from 'sequelize';

class EmailTable extends Model {
  static init(sequelize) {
    return super.init(
      {
        sander_name: {
          type: DataTypes.STRING(20),
          allowNull: true,
        },
        receive_name: {
          type: DataTypes.STRING(20),
          allowNull: true,
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
      foreignKey: { name: 'sand_id', allowNull: false },
      sourceKey: 'id',
      onDelete: 'CASCADE',
    });
  }
}

export default EmailTable;
