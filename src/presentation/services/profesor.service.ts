import { ProfesorModel } from "../../data/mysql/models/profesores";
import { CreateProfesorDto } from "../../domain/dtos/profesor/create.profesor.dto";
import { CustomError } from "../../domain/errors/customs.error";

export class ProfesorService {
  // DI
  constructor() {}

  public async create(createProfesorDto: CreateProfesorDto) {
    const existProfesor = await ProfesorModel.findOne({
      where: { matricula: createProfesorDto.matricula },
    });
    if (existProfesor) throw CustomError.badRequest("Alumno alredy exist");

    // Almacenar en la db
    try {
      const profesor: ProfesorModel = await ProfesorModel.create({
        nombre: createProfesorDto.nombre,
        apellido_paterno: createProfesorDto.apellidoPaterno,
        apellido_materno: createProfesorDto.apellidoMaterno,
        edad: createProfesorDto.edad,
        sexo: createProfesorDto.sexo,
        fecha_nacimiento: createProfesorDto.fechaNacimiento,
        matricula: createProfesorDto.matricula,
        telefono: createProfesorDto.telefono,
      });

      return {
        profesor,
      }
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async getProfesorById(id: string | number) {
    const existProfesor = await ProfesorModel.findByPk(id);
    if(!existProfesor) throw CustomError.notFound(`Profesor with id: ${id} not found`);
    
    return {
        existProfesor,
    }
  }

  public async getAllProfesor() {
    try {
    const profesores = await ProfesorModel.findAll();
        return {
            profesores
        }
    } catch (error) {
        console.log(error);
        throw CustomError.internalServer('Server internal error');
    }    
  }
}
