import { UserRole } from "../../enum/userRole";

export class CreateAlumnoDto {
    private constructor(
        public readonly nombre: string,
        public readonly apellidoPaterno: string,
        public readonly apellidoMaterno: string,
        public readonly edad: number,
        public readonly sexo: 'MASCULINO' | 'FEMENINO' | 'OTRO',
        public readonly fechaNacimiento: Date,
        public readonly curp: string,
    ) {}

    static create(object: { [key: string]: any }): [string?, CreateAlumnoDto?] {
        const { nombre, apellidoPaterno, apellidoMaterno, edad, sexo, fechaNacimiento, curp, } = object;

        if (!nombre) return ['Missing name'];
        if (!apellidoPaterno) return ['Missing father lastname'];
        if (!apellidoMaterno) return ['Missing mother lastname'];
        if (!edad) return ['Missing age'];
        if (!sexo) return ['Missing sex'];
        if (!fechaNacimiento) return ['Missing birthday'];
        if (!curp) return ['Missin CURP'];


        return [undefined, new CreateAlumnoDto(nombre, apellidoPaterno, apellidoMaterno, edad, sexo, fechaNacimiento, curp, )];
    }
}
