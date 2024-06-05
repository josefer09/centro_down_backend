import { Router } from "express";
import { UserRoutes } from "./user/routes";



export class AppRoutes {

    static get routes(): Router {
        const router = Router();

        // Definir las rutas
        router.use('/api/user', UserRoutes.routes );

        return router;
    }
}