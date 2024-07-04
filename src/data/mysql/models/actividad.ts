import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../dbConfig';

export class ActividadModel extends Model {}

ActividadModel.init({
    id_actividad: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    sequelize,
    modelName: 'Actividad',
    tableName: 'actividades',
    timestamps: false,
});
