import { DataTypes, Model } from "sequelize";
import { sequelize } from "../dbConfig";

// Modelo User

export class ProfesorModel extends Model {
    public id_profesor!: number;
    public nombre!: string;
    public apellido_paterno!: string;
    public apellido_materno!: string;
    public edad!: number;
    public sexo!: 'MASCULINO' | 'FEMENINO' | 'OTRO';
    public fecha_nacimiento!: Date;
    public matricula!: string;
    public telefono!: string;
}

ProfesorModel.init({
    id_profesor: {
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
    matricula: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    telefono: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
    },
}, {
    sequelize,
    tableName: 'profesores',
    timestamps: false});

