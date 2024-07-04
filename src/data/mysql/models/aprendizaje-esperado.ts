import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../dbConfig';

export class AprendizajeEsperadoModel extends Model {
    public id_aprendizaje_esperado!: number;
    public nombre!: string;
    public estatus!: string;
}

AprendizajeEsperadoModel.init({
    id_aprendizaje_esperado: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    estatus: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'AprendizajeEsperado',
    tableName: 'aprendizajes_esperados',
    timestamps: false,
});
