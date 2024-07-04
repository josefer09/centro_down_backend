import { ActividadModel } from "../../data/mysql/models/actividad";
import { AprendizajeActividadModel } from "../../data/mysql/models/actividadAprendizaje";
import {AprendizajeEsperadoModel} from '../../data/mysql/models/aprendizaje-esperado';
import { CreateAprendizajeEsperadoDto } from "../../domain/dtos/aprendizaje-esperado/create.aprendizaje-esperado.dto";
import { CustomError } from "../../domain/errors/customs.error";



export class AprendizajeEsperadoServicio {

    // DI
    constructor(){}

    public async createAprendizaje( createAprendizajeEsperadoDto: CreateAprendizajeEsperadoDto) {
        try {
            const existAprendizaje = await AprendizajeEsperadoModel.findOne({
                where: { nombre: createAprendizajeEsperadoDto.nombre}
            });
            if(existAprendizaje) throw CustomError.badRequest('Aprendizaje Esperado alredy exist');

            // Guardar en la db
            // Crear el AprendizajeEsperado
            const aprendizaje = await AprendizajeEsperadoModel.create({
                nombre: createAprendizajeEsperadoDto.nombre,
                estatus: createAprendizajeEsperadoDto.estatus,
            });

            // Asociar actividades
            if (createAprendizajeEsperadoDto.actividadIds.length > 0) {
                for (const actividadId of createAprendizajeEsperadoDto.actividadIds) {
                    await AprendizajeActividadModel.create({
                        id_aprendizaje_esperado: aprendizaje.id_aprendizaje_esperado,
                        id_actividad: actividadId,
                    });
                }
            }

            return {aprendizaje};
        } catch (error) {
            console.log(error);
            throw CustomError.internalServer('Internal Server Error MySql');
        }
    }

    public async getAprendizajeById( id: string | number ) {
        try {
            const existAprendizaje = await AprendizajeEsperadoModel.findOne({
                where: {id_aprendizaje_esperado: id},
                include: [{ model: ActividadModel, as: 'actividades'}],
            });
            return {existAprendizaje};
        } catch (error) {
            console.log(error);
            throw CustomError.internalServer('Internal Server Error MySql');
        }
    }

    public async getAll() {
        try {
            const aprendizajes = await AprendizajeEsperadoModel.findAll();
            return {aprendizajes};
        } catch (error) {
            console.log(error);
            throw CustomError.internalServer('Internal Server Error MySql');
        }
    }
}