import { Sequelize } from "sequelize";
import { envs } from "../../config";


  
   const sequelize = new Sequelize(envs.MYSQL_DB_NAME,
      envs.MYSQL_USERNAME,
      envs.MYSQL_PASSWORD,
      {
        host: envs.MYSQL_HOST,
        port: envs.MYSQL_PORT,
        dialect: "mysql",
        logging: false,
      });

      export {sequelize};