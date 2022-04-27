import { DataTypes, Model } from 'sequelize';

class UserTimeTable extends Model {
  static init(sequelize) {
    return super.init(
      {
        one_id: {
          type: DataTypes.INTEGER,
        },
        two_id: {
          type: DataTypes.INTEGER,
        },
        three_id: {
          type: DataTypes.INTEGER,
        },
        four_id: {
          type: DataTypes.INTEGER,
        },
        five_id: {
          type: DataTypes.INTEGER,
        },
        six_id: {
          type: DataTypes.INTEGER,
        },
        seven_id: {
          type: DataTypes.INTEGER,
        },
        eight_id: {
          type: DataTypes.INTEGER,
        },
        nine_id: {
          type: DataTypes.INTEGER,
        },
      },
      {
        sequelize,
        modelName: 'UserTimeTable',
        tableName: 'userTimeTables',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      },
    );
  }

  static associate(db) {
    db.UserTimeTable.belongsTo(db.User, {
      foreignKey: { name: 'user_id', allowNull: false },
      sourceKey: 'id',
      onDelete: 'CASCADE',
    });
  }
}

export default UserTimeTable;
