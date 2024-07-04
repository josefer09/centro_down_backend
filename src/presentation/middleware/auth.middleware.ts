import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../../config";
import { UserModel } from "../../data/mysql/models/user";


export class AuthMiddleware {

    static async validateJWT( req: Request, res: Response, next: NextFunction) {
        const authorization = req.header('Authorization');
        if ( !authorization ) return res.status(401).json({ error: 'No token provided' });
        if( !authorization.startsWith('Bearer ') ) return res.status(401).json({ error: 'Invalid Bearer token' });
        
        const token = authorization.split(' ').at(1) || ''; // Cortare por el espacio y tomare la segunda posicion del token, si no viene nada enviare un string vacio

        try {
            const payload = await JwtAdapter.validateToken<{ id: string }>(token);
            if ( !payload ) return res.status(401).json({ error: 'Invalid Token' });

            const user = await UserModel.findByPk( payload.id );
            if ( !user ) return res.status(401).json({ error: 'Invalid token - user' });

            // todo: validar si el usuario esta activo
            // req.body.user = UserEntity.fromObject(user);

            next();


        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}