import { ActividadModel } from './actividad';
import { AprendizajeEsperadoModel } from './aprendizaje-esperado';
import { AprendizajeActividadModel } from './actividadAprendizaje';

// Definir las relaciones
AprendizajeEsperadoModel.belongsToMany(ActividadModel, {
    through: AprendizajeActividadModel,
    as: 'actividades',
    foreignKey: 'id_aprendizaje_esperado',
});

ActividadModel.belongsToMany(AprendizajeEsperadoModel, {
    through: AprendizajeActividadModel,
    as: 'aprendizajesEsperados',
    foreignKey: 'id_actividad',
});

// Exportar los modelos
export { ActividadModel, AprendizajeEsperadoModel, AprendizajeActividadModel };
