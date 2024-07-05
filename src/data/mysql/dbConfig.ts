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

AprendizajeEsperadoModel.associate({
    ActividadModel,
    AprendizajeActividadModel,
});

ActividadModel.associate({
    AprendizajeEsperadoModel,
    AprendizajeActividadModel,
});

 sequelize.sync({ alter: true })
     .then(() => {
         console.log('Todas las tablas han sido creadas o actualizadas.');
     })
     .catch(err => {
         console.error('Hubo un error al crear o actualizar las tablas:', err);
     });


export { sequelize };
