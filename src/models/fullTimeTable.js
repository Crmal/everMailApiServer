import { DataTypes, Model } from 'sequelize';

class FullTimeTable extends Model {
  static init(sequelize) {
    return super.init(
      {
        subject_name: {
          type: DataTypes.STRING,
        },
        time: {
          type: DataTypes.STRING,
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
        timestamps: false,
      },
    );
  }
}

export default FullTimeTable;
