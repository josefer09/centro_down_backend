import { Router } from 'express';
import { EmailService } from '../services/emailService';
import { envs } from '../../config';
import { UserService } from '../services/userService';
import { UserController } from './controller';
import { AuthMiddleware } from '../middleware/auth.middleware';


export class UserRoutes {
    static get routes(): Router {
        const router = Router();

        const emailService = new EmailService(
            envs.MAILER_SERVICE,
            envs.MAILER_EMAIL,
            envs.MAILER_SECRET_KEY,
            envs.SEND_EMAIL,
        );
        const userService = new UserService(emailService);

        const controller = new UserController(userService);

        // Definir las rutas
        //router.post('/login', controller.loginUser);
        router.get('/:id', controller.getUserById);
        router.post('/register', controller.registeUser);
        router.get(`/validate-email/:token`, controller.validateEmailToken);
        router.post('/login', controller.loginUser);

        router.get('/', [AuthMiddleware.validateJWT], controller.getUsers);



        return router;
    }
}