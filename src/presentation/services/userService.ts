import { UserModel } from "../../data/mysql/models/user";
import { EmailService } from "./emailService";
import { CreateUserDTO } from "../../domain/dtos/user/create-user-dto";
import { CustomError } from "../../domain/errors/customs.error";
import { BcryptAdapter } from "../../config/bycript.adapter";
import { Model } from "sequelize";
import { JwtAdapter } from "../../config/jwt.adapter";
import { envs } from "../../config";
import { UserEntity } from "../../domain/entity/user";
import { Uuid } from "../../config/uuid.adapter";

export class UserService {
  // DI - Email Service
  constructor(private readonly emailService: EmailService) {}

  public async registerUser(createUserDto: CreateUserDTO) {
    const existUser = await UserModel.findOne({
      where: { email: createUserDto.email },
    });
    if (existUser) throw CustomError.badRequest("El email ya existe");

    // Almacenar en db
    try {
      // Encriptar la contrasena
      createUserDto.password = BcryptAdapter.hash(createUserDto.password);
      // Generar el token
      createUserDto.token = Uuid.v4();
      // Almacenar en la db
      const user: UserModel = await UserModel.create({
        name: createUserDto.name,
        email: createUserDto.email,
        password: createUserDto.password,
        rol: createUserDto.rol,
        token: createUserDto.token,
      });

      // Email de confirmacion
      const isSent = this.sendEmailValidationLink(user.email, user.token);

      if (!isSent) throw CustomError.internalServer('Error al enviar el correo');

      return {
        user, // Retornamos el user que nos genera el modelo
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  private async sendEmailValidationLink(email: string, token: string,) {
    //const token = await JwtAdapter.generatetoken({ email });
    //if (!token) throw CustomError.internalServer("Error getting token");

    const link = `${envs.WEBSERVICE_URL}/auth/validate-email/${token}`;

    const html = `
        <h1>Valida tu Email</h1>
        <p>Da click en el siguiente link para validar tu cuenta</p>
        <a href="${link}">Validar tu email: ${email}</a>
        `;

    const options = {
      to: email,
      subject: "Validate your email",
      htmlBody: html,
    };

    const isSent = await this.emailService.sendEmail(options);
    if (!isSent) throw CustomError.internalServer("Error sending email");

    return true;
  }
}
