import { UserModel } from "../../data/mysql/models/user";
import { CustomError } from "../../domain/errors/customs.error";
import { Model } from "sequelize";
import { JwtAdapter, envs, Uuid, BcryptAdapter, } from "../../config";
import { UserEntity } from "../../domain/entity/user";
import { UserLoginType } from "../types";
import { CreateAlumnoDto } from '../../domain/dtos/alumno/create.alumno.dto';
import { AlumnoModel } from "../../data/mysql/models/alumno";

export class AlumnoService {
  // DI - Email Service
  constructor() {}

  public async create(createAlumnoDto: CreateAlumnoDto) {
    const existAlumno = await AlumnoModel.findOne({
      where: { curp: createAlumnoDto.curp },
    });
    if (existAlumno) throw CustomError.badRequest("Alumno alredy exist");

    // Almacenar en db
    try {
      // Almacenar en la db
      const alumno: AlumnoModel = await AlumnoModel.create({
        nombre: createAlumnoDto.nombre,
        apellido_paterno: createAlumnoDto.apellidoPaterno,
        apellido_materno: createAlumnoDto.apellidoMaterno,
        edad: createAlumnoDto.edad,
        sexo: createAlumnoDto.sexo,
        fecha_nacimiento: createAlumnoDto.fechaNacimiento,
        curp: createAlumnoDto.curp,
      });

      

      return {
        alumno, // Retornamos el user que nos genera el modelo
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async getAlumnoById(id: string | number) {
    // Obtener id
    const existAlumno = await AlumnoModel.findByPk(id);

    if(!existAlumno) throw CustomError.badRequest(`Alumno with id: ${id} don't found`);
    return {
        alumno: existAlumno,
    }
  }

  public async getAlumnos() {
    try {
        const alumnos = await AlumnoModel.findAll();
        return {
            alumnos,
        }
    } catch (error) {
        console.log(error)
        throw CustomError.internalServer('Server Error');
    }
  }

}
