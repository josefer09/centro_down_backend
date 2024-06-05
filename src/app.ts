import { envs } from './config/envs';
import { Server } from "./presentation/server";
import { AppRoutes } from "./presentation/routes"; 
import { MysqlDatabase } from "./data/mysql/db";

(async () => {
    main();
})();

async function main() {
    

    await MysqlDatabase.connect();

    const server = new Server({
        port: envs.PORT,
        routes: AppRoutes.routes,
    });

    server.start(); // Inicializamos le server
}