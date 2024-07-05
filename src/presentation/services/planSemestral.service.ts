import { PlanSemestralModel } from "../../data/mysql/models/planSemestral";
import { PropositoAlcanzadoModel } from "../../data/mysql/models/propositoAlcanzado";
import { AlumnoModel } from "../../data/mysql/models/alumno";
import { ProfesorModel } from "../../data/mysql/models/profesores";
import { CreatePlanSemestralDto } from "../../domain/dtos/plan-semestral/create.plan-semestral.dto";
import { CustomError } from "../../domain/errors/customs.error";
import { PlanSemestralPropositosModel } from "../../data/mysql/models/planSemestralPropositos";
import { model } from "mongoose";
import { PropositoModel } from "../../data/mysql/models/proposito";
import { AprendizajeEsperadoModel } from "../../data/mysql/models/aprendizaje-esperado";
import ActividadModel from "../../data/mysql/models/actividad";

export class PlanSemestralServicio {
  constructor() {}

  public async createPlanSemestral(
    createPlanSemestralDto: CreatePlanSemestralDto
  ) {
    const {
      nombre,
      descripcion,
      fechaInicio,
      fechaFin,
      id_alumno,
      id_profesor,
      estatus,
      propositosIds,
    } = createPlanSemestralDto;

    const alumno = await AlumnoModel.findByPk(id_alumno);
    if (!alumno)
      throw CustomError.notFound(`Alumno with id: ${id_alumno} not found`);

    const maestro = await ProfesorModel.findByPk(id_profesor);
    if (!maestro)
      throw CustomError.notFound(`Maestro with id: ${id_profesor} not found`);

    const propositos = await PropositoAlcanzadoModel.findAll({
      where: { id_proposito_alcanzado: propositosIds },
    });
    if (propositos.length !== propositosIds.length) {
      throw CustomError.badRequest(
        "One or more PropositoAlcanzado IDs are invalid"
      );
    }

    // Guardar en la db
    try {
      const planSemestral = await PlanSemestralModel.create({
        nombre,
        descripcion,
        fechaInicio,
        fechaFin,
        id_alumno,
        id_profesor,
        estatus,
      });

      // Asociar actividades
      if (createPlanSemestralDto.propositosIds.length > 0) {
        for (const propositosAlcanzadosIds of createPlanSemestralDto.propositosIds) {
          await PlanSemestralPropositosModel.create({
            id_planSemestral: planSemestral.id_planSemestral,
            id_proposito_alcanzado: propositosAlcanzadosIds,
          });
        }
      }

      return { planSemestral };
    } catch (error) {
      console.log(error);
      throw CustomError.internalServer("Server Internal Error");
    }
  }

  public async getAllPlanSemestral() {
    try {
      const planesSemestrales = await PlanSemestralModel.findAll({
        include: [
          {
            model: PropositoAlcanzadoModel,
            as: "propositoAlcanzadoPS",
          },
          {
            model: AlumnoModel,
            as: "alumno",
          },
          {
            model: ProfesorModel,
            as: "profesor",
          },
        ],
      });
      return { planesSemestrales };
    } catch (error) {
      console.log(error);
      throw CustomError.internalServer("Internal Server Error MySql");
    }
  }

  public async getPlanSemestralById(id: string | number) {
    try {
      const planSemestral = await PlanSemestralModel.findByPk(id, {
        include: [
          {
            model: PropositoAlcanzadoModel,
            as: "propositoAlcanzadoPS",
            include: [
              {
                model: PropositoModel,
                as: "proposito",
              },
              {
                model: AprendizajeEsperadoModel,
                as: "aprendizajesEsperados",
                include: [
                    {
                        model: ActividadModel,
                        as: 'actividades'
                    }
                ]
              },
            ],
          },
          {
            model: AlumnoModel,
            as: "alumno",
          },
          {
            model: ProfesorModel,
            as: "profesor",
          },
        ],
      });
      if (!planSemestral)
        throw CustomError.notFound(`PlanSemestral with id: ${id} not found`);

      return { planSemestral };
    } catch (error) {
      console.log(error);
      throw CustomError.notFound(`PlanSemestral with id: ${id} not found`);
    }
  }
}
