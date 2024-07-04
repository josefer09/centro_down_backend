import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../dbConfig';
import { ActividadModel } from './actividad';
import { AprendizajeActividadModel } from './actividadAprendizaje'; 

export class AprendizajeEsperadoModel extends Model {
    public id_aprendizaje_esperado!: number;
    public nombre!: string;
    public estatus!: string;

    static associate(models: any) {
        AprendizajeEsperadoModel.belongsToMany(models.ActividadModel, {
            through: models.AprendizajeActividadModel,
            foreignKey: 'id_aprendizaje_esperado',
            as: 'actividades',
        });
    }
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
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'AprendizajeEsperado',
    tableName: 'aprendizajes_esperados',
    timestamps: false,
});
