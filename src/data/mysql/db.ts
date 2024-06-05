import colors from "colors";
import { sequelize } from "./dbConfig";



export class MysqlDatabase {
  static async connect() {
    try {
      await sequelize.authenticate();
      console.log(colors.green.bold(`Conectado a MySQL`));
      return true;
    } catch (error) {
      console.log(colors.red.bold(`Error en la conexión con MySQL: ${error}`));
      throw error;
    }
  }

  static async disconnect() {
    if (sequelize) {
      await sequelize.close();
      console.log("Desconectado de MySQL");
    }
  }
}
