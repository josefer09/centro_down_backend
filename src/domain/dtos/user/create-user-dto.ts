import { regularExps } from "../../../config";
import { UserRole } from "../../enum/userRole";

export class CreateUserDTO {
    private constructor(
        public readonly name: string,
        public readonly email: string,
        public password: string,
        public rol: 'ADMIN' | 'MAESTRO' | 'TUTOR',
        public token: string,
    ) {}

    static create(object: { [key: string]: any }): [string?, CreateUserDTO?] {
        const { name, email, password, rol, token } = object;

        if (!name) return ['Missing name'];
        if (!email) return ['Missing email'];
        if (!regularExps.email.test(email)) return ['Email is not valid'];
        if (!password) return ['Missing password'];
        if (password.length < 6) return ['Password too short'];
        if (!rol) return ['Missing rol'];

        return [undefined, new CreateUserDTO(name, email, password, rol, token)];
    }
}
