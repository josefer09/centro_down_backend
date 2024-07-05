export class CreatePlanSemestralDto {
    private constructor(
        public readonly nombre: string,
        public readonly descripcion: string,
        public readonly fechaInicio: Date,
        public readonly fechaFin: Date,
        public readonly id_alumno: number,
        public readonly id_profesor: number,
        public readonly estatus: number,
        public readonly propositosIds: number[]
    ) {}

    static create(object: {
        [key: string]: any;
    }): [string?, CreatePlanSemestralDto?] {
        const { nombre, descripcion, fechaInicio, fechaFin, id_alumno, id_profesor, estatus, propositosIds } = object;

        if (!nombre) return ["Missing nombre"];
        if (!descripcion) return ["Missing descripcion"];
        if (!fechaInicio) return ["Missing fechaInicio"];
        if (!fechaFin) return ["Missing fechaFin"];
        if (!id_alumno) return ["Missing id_alumno"];
        if (!id_profesor) return ["Missing id_profesor"];
        if (!estatus) return ["Missing estatus"];
        if (!propositosIds) return ["Missing propositosIds"];

        return [
            undefined,
            new CreatePlanSemestralDto(
                nombre,
                descripcion,
                new Date(fechaInicio),
                new Date(fechaFin),
                id_alumno,
                id_profesor,
                estatus,
                propositosIds
            ),
        ];
    }
}
