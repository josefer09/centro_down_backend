import { Router } from "express";
import { UserRouter } from "./user.routes";



export class AppRoutes {

    static get routes(): Router {
        const router = Router();

        // Definir las rutas
        router.use('/api/user', UserRouter.routes );

        return router;
    }
}