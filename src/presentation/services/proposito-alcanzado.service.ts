import { PropositoAlcanzadoModel } from '../../data/mysql/models/propositoAlcanzado';
import { PropositoModel } from '../../data/mysql/models/proposito';
import { AprendizajeEsperadoModel } from '../../data/mysql/models/aprendizaje-esperado';
import { CreatePropositoAlcanzadoDto } from '../../domain/dtos/proposito-alcanzado/create.proposito-alcanzado.dto';
import { CustomError } from '../../domain/errors/customs.error';
import { PropositoAlcanzadoAprendizajeModel } from '../../data/mysql/models/propositoAlcanzadoAprendizaje';

export class PropositoAlcanzadoServicio {
    // DI

    constructor() {}

    public async createPropositoAlcanzado(createPropositoAlcanzadoDto: CreatePropositoAlcanzadoDto) {
        const { id_proposito, avance, aprendizajesEsperadosIds } = createPropositoAlcanzadoDto;

        const proposito = await PropositoModel.findByPk(id_proposito);
        if (!proposito) throw CustomError.notFound(`Proposito with id: ${id_proposito} not found`);

        const aprendizajesEsperados = await AprendizajeEsperadoModel.findAll({
            where: { id_aprendizaje_esperado: aprendizajesEsperadosIds },
        });
        if (aprendizajesEsperados.length !== aprendizajesEsperadosIds.length) {
            throw CustomError.badRequest('One or more AprendizajeEsperado IDs are invalid');
        }

        // Guardar en la db
        try {
            const propositoAlcanzado = await PropositoAlcanzadoModel.create({
                id_proposito,
                avance,
            });

            // Asociar actividades
            if (createPropositoAlcanzadoDto.aprendizajesEsperadosIds.length > 0) {
                for (const aprendizajeEsperadoId of createPropositoAlcanzadoDto.aprendizajesEsperadosIds) {
                    await PropositoAlcanzadoAprendizajeModel.create({
                        id_proposito_alcanzado: propositoAlcanzado.id_proposito_alcanzado,
                        id_aprendizaje_esperado: aprendizajeEsperadoId,
                    });
                }
            }


            return { propositoAlcanzado };
        } catch (error) {
            console.log(error);
            throw CustomError.internalServer('Server Internal Error');
        }
    }

    public async getAllPropositoAlcanzado() {
        try {
            const propositosAlcanzados = await PropositoAlcanzadoModel.findAll({
                include: [
                    {
                        model: PropositoModel,
                        as: 'proposito',
                    },
                    {
                        model: AprendizajeEsperadoModel,
                        as: 'aprendizajesEsperados',
                    },
                ],
            });
            return { propositosAlcanzados };
        } catch (error) {
            console.log(error);
            throw CustomError.internalServer('Internal Server Error MySql');
        }
    }

    public async getPropositoAlcanzadoById(id: string | number) {
        try {
            const propositoAlcanzado = await PropositoAlcanzadoModel.findByPk(id, {
                include: [
                    {
                        model: PropositoModel,
                        as: 'proposito',
                    },
                    {
                        model: AprendizajeEsperadoModel,
                        as: 'aprendizajesEsperados',
                    },
                ],
            });
            if (!propositoAlcanzado) throw CustomError.notFound(`PropositoAlcanzado with id: ${id} not found`);

            return { propositoAlcanzado };
        } catch (error) {
            console.log(error);
            throw CustomError.notFound(`PropositoAlcanzado with id: ${id} not found`);
        }
    }
}
