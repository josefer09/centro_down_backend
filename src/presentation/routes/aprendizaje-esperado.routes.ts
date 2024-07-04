import { Router } from "express";
import { AprendizajeEsperadoServicio } from "../services/aprendizaje-esperado.service";
import { AprendizajeEsperadoController } from "../controllers";


export class AprendizajeEsperadoRouter {
    static get routes(): Router {
        const router = Router();

        const service = new AprendizajeEsperadoServicio();

        const controller = new AprendizajeEsperadoController(service);

        router.get('/', controller.get);
        router.post('/', controller.post);
        router.get('/:id', controller.getById);

        return router;
    }
}