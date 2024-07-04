import { Request, Response } from "express";
import { CustomError } from '../../domain/errors/customs.error';
import { AprendizajeEsperadoServicio } from '../services/aprendizaje-esperado.service';
import { CreateAprendizajeEsperadoDto } from "../../domain/dtos/aprendizaje-esperado/create.aprendizaje-esperado.dto";


export class AprendizajeEsperadoController {

    // DI
    constructor(
        public readonly aprendizajeService: AprendizajeEsperadoServicio,
    ){}

    private handleError = (error: unknown, res: Response) => {
        if ( error instanceof CustomError ) {
            return res.status(error.statusCode).json({ msg: error.message });
        }

        console.log(error);
        return res.status(500).json({ msg: 'Internal Server Error '});
    }

    post = (req: Request, res: Response) => {

        const [error, createDto] = CreateAprendizajeEsperadoDto.create(req.body);
        if( error ) return res.status(400).json({error});

        this.aprendizajeService.createAprendizaje(createDto!)
        .then((aprendizaje) => res.json(aprendizaje))
        .catch( error => this.handleError( error, res ));
    }

    getById = (req: Request, res: Response) => {
        const { id } = req.params;

        this.aprendizajeService.getAprendizajeById(id)
        .then( (aprendizaje) => res.json(aprendizaje).status(200))
        .catch( error => this.handleError(error, res));
    }

    get = (req: Request, res: Response) => {
        this.aprendizajeService.getAll()
        .then( aprendizaje => res.json(aprendizaje).status(200))
        .catch( error => this.handleError(error, res));
    }
}