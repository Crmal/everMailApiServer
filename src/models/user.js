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
        nickName: {
          type: DataTypes.STRING,
        },
        phone: {
          type: DataTypes.STRING,
        },
      },
      {
        sequelize,
        modelName: 'User',
        tableName: 'users',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      },
    );
  }

  static associate(db) {
    db.User.hasMany(db.EmailTable, {
      foreignKey: { name: 'send_id', allowNull: false },
      sourceKey: 'id',
    });
    db.User.hasOne(db.UserTimeTable, {
      foreignKey: { name: 'user_id', allowNull: false },
      sourceKey: 'id',
    });
  }
}

export default User;
