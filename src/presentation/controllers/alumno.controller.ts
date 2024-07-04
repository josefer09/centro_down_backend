import { Request, Response } from "express";
import { CustomError } from "../../domain/errors/customs.error";
import { CreateAlumnoDto } from "../../domain/dtos/alumno/create.alumno.dto";
import { AlumnoService } from "../services";


export class AlumnoController {

    // DI
    constructor(
        public readonly alumnoService: AlumnoService,
    ){}

    private handleError = (error: unknown, res: Response) => {
        if ( error instanceof CustomError ) {
            return res.status(error.statusCode).json({ msg: error.message });
        }

        console.log(error);
        return res.status(500).json({ msg: 'Internal Server Error '});
    }

    createAlumno = (req: Request, res: Response) => {

        const [error, createDto] = CreateAlumnoDto.create(req.body);
        if( error ) return res.status(400).json({error});

        this.alumnoService.create(createDto!)
        .then((alumno) => res.json(alumno))
        .catch( error => this.handleError( error, res ));
    }

    getAlumnoById = (req: Request, res: Response) => {
        const { id } = req.params;

        this.alumnoService.getAlumnoById(id)
        .then( (alumno) => res.json(alumno).status(200))
        .catch( error => this.handleError(error, res));
    }

    getAlumnos = (req: Request, res: Response) => {
        this.alumnoService.getAlumnos()
        .then( alumnos => res.json(alumnos).status(200))
        .catch( error => this.handleError(error, res));
    }

}