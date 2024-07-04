import { Request, Response } from "express";
import { CustomError } from "../../domain/errors/customs.error";
import { ProfesorService } from "../services/profesor.service";
import { CreateProfesorDto } from "../../domain/dtos/profesor/create.profesor.dto";


export class ProfesorController {

    // DI
    constructor(
        public readonly profesorService: ProfesorService,
    ){}

    private handleError = (error: unknown, res: Response) => {
        if ( error instanceof CustomError ) {
            return res.status(error.statusCode).json({ msg: error.message });
        }

        console.log(error);
        return res.status(500).json({ msg: 'Internal Server Error '});
    }

    post = (req: Request, res: Response) => {
        const [error, createDto] = CreateProfesorDto.create(req.body);
        if(error) return res.status(400).json({error});

        this.profesorService.create(createDto!)
        .then(profesor => res.json(profesor))
        .catch( error => this.handleError(error, res));
    }

    getById = (req: Request, res: Response) => {
        const { id } = req.params;

        this.profesorService.getProfesorById(id)
        .then( (profesor) => res.json(profesor).status(200))
        .catch( error => this.handleError(error, res));
    }

    get = (req: Request, res: Response) => {
        this.profesorService.getAllProfesor()
        .then( profesor => res.json(profesor).status(200))
        .catch( error => this.handleError(error, res));
    }
}