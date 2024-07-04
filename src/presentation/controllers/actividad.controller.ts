import { Request, Response } from "express";
import { CustomError } from "../../domain/errors/customs.error";
import { ActividadServicio } from "../services/actividad.service";
import { CreateActividadDto } from "../../domain/dtos/actividad/create.actividad.dto";


export class ActividadController {

    // DI
    constructor(
        public readonly activiadServicio: ActividadServicio,
    ){}

    private handleError = (error: unknown, res: Response) => {
        if ( error instanceof CustomError ) {
            return res.status(error.statusCode).json({ msg: error.message });
        }

        console.log(error);
        return res.status(500).json({ msg: 'Internal Server Error '});
    }

    post = (req: Request, res: Response) => {
        const [error, createDto] = CreateActividadDto.create(req.body);
        if( error ) return res.status(400).json({error});

        this.activiadServicio.createActividad(createDto!)
        .then((actividad) => res.json(actividad))
        .catch( error => this.handleError( error, res ));
    }

    get = (req: Request, res: Response) => {
        this.activiadServicio.getAllActividad()
        .then( actividades => res.json(actividades).status(200))
        .catch( error => this.handleError(error, res));
    }

    getById = (req: Request, res: Response) => {
        const { id } = req.params;

        this.activiadServicio.getActividadById(id)
        .then(actividad => res.json(actividad).status(200))
        .catch( error => this.handleError(error, res));
    }
}