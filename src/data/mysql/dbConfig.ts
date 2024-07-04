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

sequelize.sync({ alter: true })
    .then(() => {
        console.log('Todas las tablas han sido creadas o actualizadas.');
    })
    .catch(err => {
        console.error('Hubo un error al crear o actualizar las tablas:', err);
    });


export { sequelize };
