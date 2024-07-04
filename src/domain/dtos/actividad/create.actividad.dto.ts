import { UserRole } from "../../enum/userRole";

export class CreateActividadDto {
    private constructor(
        public readonly nombre: string,
        public readonly descripcion: string,
    ) {}

    static create(object: { [key: string]: any }): [string?, CreateActividadDto?] {
        const { nombre, descripcion, } = object;

        if (!nombre) return ['Missing name'];
        if (!descripcion) return ['Missing description'];


        return [undefined, new CreateActividadDto(nombre, descripcion )];
    }
}
