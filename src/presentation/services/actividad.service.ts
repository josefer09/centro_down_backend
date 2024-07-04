import { ActividadModel } from '../../data/mysql/models/actividad';
import { CreateActividadDto } from '../../domain/dtos/actividad/create.actividad.dto';
import { CustomError } from '../../domain/errors/customs.error';
export class ActividadServicio {
    // DI

    constructor(){}

    public async createActividad( createActividadDto: CreateActividadDto) {

        const existActividad = await ActividadModel.findOne({ where: { nombre: createActividadDto.nombre}});
        if(existActividad) throw CustomError.badRequest(`Activity with name: ${createActividadDto.nombre} alredy exist`);

        // Guardar en la db
        try {
            const actividad = await ActividadModel.create({
                nombre: createActividadDto.nombre,
                descripcion: createActividadDto.descripcion,
            });
            return {actividad};
        } catch (error) {
            console.log(error);
            throw CustomError.internalServer('Server Internal Error');
        }
    }

    public async getAllActividad() {
        try {
            const actividades = await ActividadModel.findAll();
            return {actividades};
        } catch (error) {
            console.log(error);
            throw CustomError.internalServer('Internal Server Error MySql')
        }
    }

    public async getActividadById(id: string | number ) {
        try {
            const existActividad = await ActividadModel.findByPk(id);
            if(!existActividad) throw CustomError.notFound(`Activity with id: ${id} not found`);

            return {existActividad};
        } catch (error) {
            console.log(error);
            throw CustomError.notFound(`Activity with id: ${id} not found`);
        }
    }
}