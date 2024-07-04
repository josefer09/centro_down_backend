import { UserRole } from "../../enum/userRole";

export class CreateAprendizajeEsperadoDto {
    private constructor(
        public readonly nombre: string,
        public readonly estatus: number,
        public readonly actividadIds: number[],
    ) {}

    static create(object: { [key: string]: any }): [string?, CreateAprendizajeEsperadoDto?] {
        const { nombre, estatus, actividadIds, } = object;

        if (!nombre) return ['Missing name'];
        if (!estatus) return ['Missing estatus'];
        if (!Array.isArray(actividadIds)) return ['Missing actividades'];


        return [undefined, new CreateAprendizajeEsperadoDto(nombre, estatus, actividadIds)];
    }
}