import { Router } from "express";
import { PropositoAlcanzadoServicio } from "../services/proposito-alcanzado.service";
import { PropositoAlcanzadoController } from "../controllers/propositoAlcanzado.controller";


export class PropositoAlcanzadoRouter {
    static get routes(): Router {
        const router = Router();

        const service = new PropositoAlcanzadoServicio();

        const controller = new PropositoAlcanzadoController(service);

        router.get('/', controller.get);
        router.post('/', controller.post);
        router.get('/:id', controller.getById);

        return router;
    }
}