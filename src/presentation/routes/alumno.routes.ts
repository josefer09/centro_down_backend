import { Router } from 'express';
import { AlumnoController } from '../controllers';
import { AlumnoService } from '../services';


export class AlumnoRouter {
    static get routes(): Router {
        const router = Router();

        const service = new AlumnoService()

        const controller = new AlumnoController(service);

        // Definir las rutas
        //router.post('/login', controller.loginUser);
        router.get('/:id', controller.getAlumnoById);
        router.post('/', controller.createAlumno);

        router.get('/', controller.getAlumnos);



        return router;
    }
}