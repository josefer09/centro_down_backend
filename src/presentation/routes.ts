import { Router } from "express";
import { UserRoutes } from "./user/routes";
import { AlumnoRouter } from "./routes/alumno.routes";
import {} from './routes'
import { ProfesorRouter } from "./routes/profesor.routes";
import { ActividadRouter } from "./routes/actividad.routes";
import { AprendizajeEsperadoRouter } from "./routes/aprendizaje-esperado.routes";
import { PropositoRouter } from './routes/proposito.routes';
import { PropositoAlcanzadoRouter } from "./routes/propositoAlcanzado.routes";
import { PlanSemestralRouter } from "./routes/planSemestral.routes";



export class AppRoutes {

    static get routes(): Router {
        const router = Router();

        // Definir las rutas
        router.use('/api/user', UserRoutes.routes );
        router.use('/api/alumno', AlumnoRouter.routes );
        router.use('/api/profesor', ProfesorRouter.routes );
        router.use('/api/actividad', ActividadRouter.routes);
        router.use('/api/aprendizaje_esperado', AprendizajeEsperadoRouter.routes);
        router.use('/api/proposito', PropositoRouter.routes);
        router.use('/api/propositoAlcanzado', PropositoAlcanzadoRouter.routes);
        router.use('/api/planSemestral', PlanSemestralRouter.routes);

        return router;
    }
}