import { DataTypes, Model } from "sequelize";
import { sequelize } from "../dbConfig";
import { PropositoAlcanzadoModel } from "./propositoAlcanzado";
import { AlumnoModel } from "./alumno";
import { ProfesorModel } from "./profesores";
import { PlanSemestralPropositosModel } from './planSemestralPropositos';

export class PlanSemestralModel extends Model {
    public id_planSemestral!: number;
    public nombre!: string;
    public descripcion!: string;
    public fechaInicio!: Date;
    public fechaFin!: Date;
    public id_alumno!: number;
    public id_profesor!: number;
    public estatus!: number;

    static associate(models: any) {

        PlanSemestralModel.belongsToMany(models.PropositoAlcanzadoModel, {
            through: models.PlanSemestralPropositosModel,
            foreignKey: 'id_planSemestral',
            otherKey: 'id_proposito_alcanzado',
            as: 'propositoAlcanzadoPS', // Cambié el alias para que sea único
        });

        PlanSemestralModel.belongsTo(models.AlumnoModel, {
            foreignKey: 'id_alumno',
            as: 'alumno',
        });

        PlanSemestralModel.belongsTo(models.ProfesorModel, {
            foreignKey: 'id_profesor',
            as: 'profesor',
        });
    }
}

PlanSemestralModel.init({
    id_planSemestral: {
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
        allowNull: false,
    },
    fechaInicio: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    fechaFin: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    id_alumno: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'alumnos',
            key: 'id_alumno',
        },
    },
    id_profesor: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'profesores',
            key: 'id_Profesor',
        },
    },
    estatus: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize,
    tableName: 'planes_semestrales',
    timestamps: false,
});
