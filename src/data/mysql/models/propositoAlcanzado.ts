import { DataTypes, Model } from "sequelize";
import { sequelize } from "../dbConfig";
import { PropositoModel } from './proposito';
import { AprendizajeEsperadoModel } from './aprendizaje-esperado';
import { PropositoAlcanzadoAprendizajeModel } from './propositoAlcanzadoAprendizaje';

export class PropositoAlcanzadoModel extends Model {
    public id_proposito_alcanzado!: number;
    public id_proposito!: number;
    public avance!: number;

    static associate(models: any) {
        // Asociación con PropositoModel
        PropositoAlcanzadoModel.belongsTo(models.PropositoModel, {
            foreignKey: 'id_proposito',
            as: 'proposito',
        });

        // Asociación de muchos a muchos con AprendizajeEspera  doModel
        PropositoAlcanzadoModel.belongsToMany(models.AprendizajeEsperadoModel, {
            through: models.PropositoAlcanzadoAprendizajeModel,
            foreignKey: 'id_proposito_alcanzado',
            otherKey: 'id_aprendizaje_esperado',
            as: 'aprendizajesEsperados',
        });
    }
}

PropositoAlcanzadoModel.init({
    id_proposito_alcanzado: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    id_proposito: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: PropositoModel,
            key: 'id_proposito',
        },
    },
    avance: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'PropositoAlcanzadoModel',
    tableName: 'propositos_alcanzados',
    timestamps: false,
});