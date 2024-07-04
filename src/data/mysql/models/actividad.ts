import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../dbConfig';

export class ActividadModel extends Model {
    public id_actividad!: number;
    public nombre!: string;
    public descripcion?: string;
    // Definir asociación
    static associate(models: any) {
        ActividadModel.belongsToMany(models.AprendizajeEsperadoModel, {
            through: models.AprendizajeActividadModel,
            foreignKey: 'id_actividad',
            as: 'aprendizajesEsperados',
        });
    }
}

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

export default ActividadModel;

