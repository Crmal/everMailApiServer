import { DataTypes, Model } from 'sequelize';

class fullTimeTable extends Model {
  static init(sequelize) {
    return super.init(
      {
        subject_name: {
          type: DataTypes.STRING(5),
        },
        time: {
          type: DataTypes.STRING(30),
          unique: true,
          allowNull: false,
        },
        professor_name: {
          type: DataTypes.STRING,
        },
        professor_email: {
          type: DataTypes.STRING,
        },
        lecture_room: {
          type: DataTypes.STRING,
        },
      },
      {
        sequelize,
        modelName: 'FullTimeTable',
        tableName: 'fullTimeTables',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      },
    );
  }
}

export default fullTimeTable;
