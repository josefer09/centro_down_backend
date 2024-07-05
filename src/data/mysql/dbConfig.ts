import { Sequelize } from "sequelize";
import { envs } from "../../config";

const sequelize = new Sequelize(
  envs.MYSQL_DB_NAME,
  envs.MYSQL_USERNAME,
  envs.MYSQL_PASSWORD,
  {
    host: envs.MYSQL_HOST,
    port: envs.MYSQL_PORT,
    dialect: "mysql",
    logging: false,
  }
);

// Importa y asocia los modelos aquí
import { AprendizajeEsperadoModel } from "./models/aprendizaje-esperado";
import {ActividadModel} from './models/actividad';
import {AprendizajeActividadModel} from './models/actividadAprendizaje';
import { PropositoAlcanzadoModel } from "./models/propositoAlcanzado";
import { PropositoModel } from "./models/proposito";
import { PropositoAlcanzadoAprendizajeModel } from "./models/propositoAlcanzadoAprendizaje";
import { PlanSemestralModel } from "./models/planSemestral";
import { AlumnoModel } from "./models/alumno";
import { ProfesorModel } from "./models/profesores";
import { PlanSemestralPropositosModel } from "./models/planSemestralPropositos";

AprendizajeEsperadoModel.associate({
    ActividadModel,
    AprendizajeActividadModel,
});

ActividadModel.associate({
    AprendizajeEsperadoModel,
    AprendizajeActividadModel,
});

PropositoAlcanzadoModel.associate({
    PropositoModel,
    AprendizajeEsperadoModel,
    PropositoAlcanzadoAprendizajeModel,
});

// Asociar los modelos
PlanSemestralModel.associate({
    PropositoAlcanzadoModel,
    AlumnoModel,
    ProfesorModel,
    PlanSemestralPropositosModel, // Asegúrate de pasar este modelo aquí
});


async function syncTables() {
    await sequelize.sync({ alter: true })
     .then(() => {
         console.log('Todas las tablas han sido creadas o actualizadas.');
     })
     .catch(err => {
         console.error('Hubo un error al crear o actualizar las tablas:', err);
     });
}

syncTables();


export { sequelize };

