import { DataTypes, Model } from "sequelize";
import { sequelize } from "../dbConfig";

export class PropositoAlcanzadoAprendizajeModel extends Model {}

PropositoAlcanzadoAprendizajeModel.init({
    id_proposito_alcanzado: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'PropositoAlcanzado',
            key: 'id_proposito_alcanzado',
        },
    },
    id_aprendizaje_esperado: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'AprendizajeEsperado',
            key: 'id_aprendizaje_esperado',
        },
    },
}, {
    sequelize,
    modelName: 'PropositoAlcanzadoAprendizaje',
    tableName: 'proposito_alcanzado_aprendizaje',
    timestamps: false,
});
