import { Router } from "express";
import { ProfesorService } from "../services/profesor.service";
import { ProfesorController } from "../controllers";



export class ProfesorRouter {
    static get routes(): Router {
        const router = Router();

        const service = new ProfesorService();

        const controller = new ProfesorController(service);

        router.get('/', controller.get);
        router.post('/', controller.post);
        router.get('/:id', controller.getById);

        return router;
    }
}