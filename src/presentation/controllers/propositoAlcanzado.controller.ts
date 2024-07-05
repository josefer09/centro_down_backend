import { Request, Response } from "express";
import { CustomError } from "../../domain/errors/customs.error";
import { PropositoAlcanzadoServicio } from "../services/proposito-alcanzado.service"
import { CreatePropositoAlcanzadoDto } from "../../domain/dtos/proposito-alcanzado/create.proposito-alcanzado.dto";


export class PropositoAlcanzadoController {

    // DI
    constructor(
        readonly propositoAlcanzadoService: PropositoAlcanzadoServicio,
    ){}

    private handleError = (error: unknown, res: Response) => {
        if ( error instanceof CustomError ) {
            return res.status(error.statusCode).json({ msg: error.message });
        }

        console.log(error);
        return res.status(500).json({ msg: 'Internal Server Error '});
    }

    post = (req: Request, res: Response) => {
        const [error, createDto] = CreatePropositoAlcanzadoDto.create(req.body);
        if( error ) return res.status(400).json({error});

        this.propositoAlcanzadoService.createPropositoAlcanzado(createDto!)
        .then((propositoAlcanzado) => res.json(propositoAlcanzado))
        .catch( error => this.handleError( error, res ));
    }

    getById = (req: Request, res: Response) => {
        const { id } = req.params;

        this.propositoAlcanzadoService.getPropositoAlcanzadoById(id)
        .then((propositoAlcanzado) => res.json(propositoAlcanzado).status(200))
        .catch( error => this.handleError(error, res));
    }

    get = (req: Request, res: Response) => {
        this.propositoAlcanzadoService.getAllPropositoAlcanzado()
        .then((propositoAlcanzado) => res.json(propositoAlcanzado).status(200))
        .catch( error => this.handleError(error, res));
    }
}