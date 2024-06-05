import { Request, Response } from "express";
import { CustomError } from "../../domain/errors/customs.error";
import { UserService } from "../services/userService";
import { CreateUserDTO } from "../../domain/dtos/user/create-user-dto";




export class UserController {

    // DI
    constructor(
        public readonly userService: UserService,
    ){}

    private handleError = (error: unknown, res: Response) => {
        if ( error instanceof CustomError ) {
            return res.status(error.statusCode).json({ msg: error.message });
        }

        console.log(error);
        return res.status(500).json({ msg: 'Internal Server Error '});
    }

    registeUser = (req: Request, res: Response) => {

        const [error, createDto] = CreateUserDTO.create(req.body);
        if( error ) return res.status(400).json({error});

        this.userService.registerUser(createDto!) // Aseguro que sera un objeto
        .then((user) => res.json(user))
        .catch( error => this.handleError(error, res));
    }


}