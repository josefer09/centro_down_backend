import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../dbConfig';

export class PlanSemestralPropositosModel extends Model {}

PlanSemestralPropositosModel.init({
    id_planSemestral: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'PlanSemestralModel',
            key: 'id_planSemestral',
        },
    },
    id_proposito_alcanzado: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'PropositoAlcanzadoModel',
            key: 'id_proposito_alcanzado',
        },
    },
}, {
    sequelize,
    modelName: 'PlanSemestralPropositosModel',
    tableName: 'plan_semestral_propositos',
    timestamps: false,
});
