import { Router } from "express";
import { PropositoService } from "../services/proposito.service";
import { PropositoController } from "../controllers/proposito.controller";


export class PropositoRouter {
    static get routes(): Router {
        const router = Router();

        const service = new PropositoService();

        const controller = new PropositoController(service);

        router.get('/', controller.get);
        router.post('/', controller.post);
        router.get('/:id', controller.getById);

        return router;
    }
}