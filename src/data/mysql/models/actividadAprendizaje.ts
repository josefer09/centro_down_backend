import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../dbConfig';

export class AprendizajeActividadModel extends Model {}

AprendizajeActividadModel.init({
    id_aprendizaje_esperado: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'aprendizajes_esperados',
            key: 'id_aprendizaje_esperado',
        },
    },
    id_actividad: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'actividades',
            key: 'id_actividad',
        },
    },
}, {
    sequelize,
    modelName: 'AprendizajeActividad',
    tableName: 'aprendizaje_actividad',
    timestamps: false,
});
