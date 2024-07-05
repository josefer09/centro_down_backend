

export class CreatePropositoDto {
    private constructor(
        public readonly nombre: string,
        public readonly descripcion: string,
    ){}

    static create(object: { [key: string]: any }): [string?, CreatePropositoDto?] {
        const { nombre, descripcion, } = object;

        if(!nombre) return ['Missing name'];
        if (!descripcion) return ['Missing description'];

        return [undefined, new CreatePropositoDto(nombre, descripcion, )];
    }
}