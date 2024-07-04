
export class UserEntity {
    // Nuevo estandar de declarar el constructor
    constructor(
        public id_user: number,
        public name: string,
        public email: string,
        public emailValidate: boolean,
        public password: string,
        public rol: string,
        public token: string,
        public img?: string,
        public phone?: number,
    ) {}

    public static fromObject(object: {[key: string]: any}) {
        const { id_user, name, phone, email, rol, password, emailValidate, img, token, } = object;

        if(!id_user) throw 'El id es requerido';
        if(!name) throw 'El nombre es requerido';
        if(!email) throw 'El email es requerido';
        if(!rol) throw 'El rol es requerido';
        if(!token) throw 'El token es requerido';

        return new UserEntity(id_user, name, email, emailValidate, password, token, phone, rol, img);

    }


}