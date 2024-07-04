import { UserRole } from "../../enum/userRole";

export class CreateProfesorDto {
    private constructor(
        public readonly nombre: string,
        public readonly apellidoPaterno: string,
        public readonly apellidoMaterno: string,
        public readonly edad: number,
        public readonly sexo: 'MASCULINO' | 'FEMENINO' | 'OTRO',
        public readonly fechaNacimiento: Date,
        public readonly matricula: string,
        public readonly telefono: number,
    ) {}

    static create(object: { [key: string]: any }): [string?, CreateProfesorDto?] {
        const { nombre, apellidoPaterno, apellidoMaterno, edad, sexo, fechaNacimiento, matricula, telefono, } = object;

        if (!nombre) return ['Missing name'];
        if (!apellidoPaterno) return ['Missing father lastname'];
        if (!apellidoMaterno) return ['Missing mother lastname'];
        if (!edad) return ['Missing age'];
        if (!sexo) return ['Missing sex'];
        if (!fechaNacimiento) return ['Missing birthday'];
        if (!matricula) return ['Missing matricula'];
        if (!telefono) return ['Missing telefono']


        return [undefined, new CreateProfesorDto(nombre, apellidoPaterno, apellidoMaterno, edad, sexo, fechaNacimiento, matricula, telefono )];
    }
}
