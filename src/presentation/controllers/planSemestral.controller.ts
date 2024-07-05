import { Request, Response } from "express";
import { CustomError } from "../../domain/errors/customs.error";
import { PlanSemestralServicio } from "../services/planSemestral.service";
import { CreatePlanSemestralDto } from "../../domain/dtos/plan-semestral/create.plan-semestral.dto";


export class PlanSemestralController {

    // DI
    constructor(
        public readonly planSemestralServicio: PlanSemestralServicio,
    ){}

    private handleError = (error: unknown, res: Response) => {
        if ( error instanceof CustomError ) {
            return res.status(error.statusCode).json({ msg: error.message });
        }

        console.log(error);
        return res.status(500).json({ msg: 'Internal Server Error '});
    }

    post = (req: Request, res: Response) => {
        const [error, createDto] = CreatePlanSemestralDto.create(req.body);
        if(error) return res.status(400).json({error});

        this.planSemestralServicio.createPlanSemestral(createDto!)
        .then(planSemestral => res.json(planSemestral))
        .catch( error => this.handleError(error, res));
    }

    getById = (req: Request, res: Response) => {
        const { id } = req.params;

        this.planSemestralServicio.getPlanSemestralById(id)
        .then( (planSemestral) => res.json(planSemestral).status(200))
        .catch( error => this.handleError(error, res));
    }

    get = (req: Request, res: Response) => {
        this.planSemestralServicio.getAllPlanSemestral()
        .then( planSemestral => res.json(planSemestral).status(200))
        .catch( error => this.handleError(error, res));
    }
}