import { DataTypes, Model } from "sequelize";
import { sequelize } from "../dbConfig";


export class PropositoModel extends Model {
    public id_proposito!: number;
    public nombre!: string;
    public descripcion!: string;
}

PropositoModel.init({
    id_proposito: {
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
}, {
    sequelize,
    modelName: 'PropositoModel',
    tableName: 'propositos',
    timestamps: false
});