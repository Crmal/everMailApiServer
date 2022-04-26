import { DataTypes, Model } from 'sequelize';

class User extends Model {
  static init(sequelize) {
    return super.init(
      {
        name: {
          type: DataTypes.STRING(5),
        },
        email: {
          type: DataTypes.STRING(30),
          unique: true,
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING,
        },
      },
      {
        sequelize,
        modelName: 'User',
        tableName: 'user',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      },
    );
  }

  static associate(db) {
    db.User.hasOne(db.Apply, { foreignKey: { name: 'userId', allowNull: false }, sourceKey: 'id' });
  }
}

export default User;
