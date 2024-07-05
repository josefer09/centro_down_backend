import { DataTypes, Model } from "sequelize";
import { sequelize } from "../dbConfig";

// Modelo User

export class UserModel extends Model {
    public id_user!: number;
    public name!: string;
    public email!: string;
    public emailValidated!: boolean;
    public password!: string;
    public token!: string;
    public rol!: 'ADMIN' | 'MAESTRO' | 'TUTOR' | 'COORDINADOR';
}

UserModel.init({
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: false, 
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    emailValidated: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    token: {
        type: DataTypes.STRING,
        allowNull: true
    },
    rol: {
        type: DataTypes.ENUM('ADMIN', 'MAESTRO', 'TUTOR', 'COORDINADOR'),
        allowNull: false
    },
}, {
    sequelize,
    tableName: 'users',
    timestamps: false});

