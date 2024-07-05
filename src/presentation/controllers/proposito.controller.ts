import { Request, Response } from "express";
import { CustomError } from "../../domain/errors/customs.error";
import { PropositoService } from "../services/proposito.service";
import { CreatePropositoDto } from "../../domain/dtos/proposito/create.proposito.dto";


export class PropositoController {

    // DI
    constructor(
        public readonly propositoService: PropositoService,
    ){}

    private handleError = (error: unknown, res: Response) => {
        if ( error instanceof CustomError ) {
            return res.status(error.statusCode).json({ msg: error.message });
        }

        console.log(error);
        return res.status(500).json({ msg: 'Internal Server Error '});
    }

    post = (req: Request, res: Response) => {
        const [error, createDto] = CreatePropositoDto.create(req.body);
        if( error ) return res.status(400).json({error});

        this.propositoService.create(createDto!)
        .then(proposito => res.json(proposito))
        .catch( error => this.handleError(error, res));
    }

    getById = (req: Request, res: Response) => {
        const { id } = req.params;

        this.propositoService.getPropositoById(id)
        .then( (proposito) => res.json(proposito).status(200))
        .catch( error => this.handleError(error, res));
    }

    get = (req: Request, res: Response) => {
        this.propositoService.getAllPropositos()
        .then( proposito => res.json(proposito).status(200))
        .catch( error => this.handleError(error, res));
    }

    
}