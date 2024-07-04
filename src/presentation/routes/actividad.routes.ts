import { Router } from "express";
import { ActividadServicio } from "../services/actividad.service";
import { ActividadController } from "../controllers";


export class  ActividadRouter {
    static get routes(): Router {
        const router = Router();

        const service = new ActividadServicio();

        const controller = new ActividadController(service);

        router.get('/', controller.get);
        router.post('/', controller.post);
        router.get('/:id', controller.getById);

        return router;
    }
}