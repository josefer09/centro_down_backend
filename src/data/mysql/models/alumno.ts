import { DataTypes, Model } from "sequelize";
import { sequelize } from "../dbConfig";

// Modelo User

export class AlumnoModel extends Model {
    public id_alumno!: number;
    public nombre!: string;
    public apellido_paterno!: string;
    public apellido_materno!: string;
    public edad!: number;
    public sexo!: 'MASCULINO' | 'FEMENINO' | 'OTRO';
    public fecha_nacimiento!: Date;
}

AlumnoModel.init({
    id_alumno: {
        type: DataTypes.INTEGER,
        allowNull: false, 
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    apellido_paterno: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    apellido_materno: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    edad: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    sexo: {
        type: DataTypes.ENUM('MASCULINO', 'FEMENINO', 'OTRO'),
        allowNull: false,
    },
    fecha_nacimiento: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    curp: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
}, {
    sequelize,
    modelName: 'AlumnoModel',
    tableName: 'alumnos',
    timestamps: false});

