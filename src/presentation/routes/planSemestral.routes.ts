import { Router } from "express";
import { PlanSemestralServicio } from "../services/planSemestral.service";
import { PlanSemestralController } from "../controllers/planSemestral.controller";


export class PlanSemestralRouter {
    static get routes(): Router {
        const router = Router();

        const service = new PlanSemestralServicio();

        const controller = new PlanSemestralController(service);

        router.get('/', controller.get);
        router.post('/', controller.post);
        router.get('/:id', controller.getById);

        return router;
    }
}