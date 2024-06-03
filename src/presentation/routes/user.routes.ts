import { Request, Response, Router } from "express";


export class UserRouter {
    static get routes(): Router {
        const router = Router();

        // Definir las rutas
        router.get('/',( req: Request, res: Response) => {
            res.json({message: 'Hello World from user routes'});
        });

        return router;
    }
}