import { UserModel } from "../../data/mysql/models/user";
import { EmailService } from "./emailService";
import { CreateUserDTO } from "../../domain/dtos/user/create-user-dto";
import { CustomError } from "../../domain/errors/customs.error";
import { Model } from "sequelize";
import { JwtAdapter, envs, Uuid, BcryptAdapter, } from "../../config";
import { UserEntity } from "../../domain/entity/user";
import { UserLoginType } from "../types";

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

      if (!isSent)
        throw CustomError.internalServer("Error al enviar el correo");

      return {
        user, // Retornamos el user que nos genera el modelo
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async validateEmailToken(token: string) {
    try {
      // Validar si el token existe en nuestra db
      const existToken = await UserModel.findOne({ where: { token: token } });

      if (!existToken) throw CustomError.badRequest("El token es invalido");

      // console.log(existToken.dataValues);
      // Operaciones necesarias
      // Actualizar el token y el status del email
      const userUpdate = await UserModel.update(
        { emailValidated: true, token: "" },
        { where: { token: token } }
      );

      return {
        msg: 'Email validado',
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async getUserById(id: string | number) {
    // obtener id
    const existUser = await UserModel.findByPk(id);

    if(!existUser) throw CustomError.badRequest(`El usuario con id: ${id} no existe`);

    return {
      user: existUser,
    }
  }

  public async loginUser(userData: UserLoginType) {
    // Obtenemos los datos y destructuramos para facilitar el trabajo
    const { email, password } = userData;

    // Validamos si el usuario o email existe
    const existUser = await UserModel.findOne({ where: {email}});
    if(!existUser) throw CustomError.notFound(`No existe un usuario con el email: ${email}`);

    // Validamos las contrasenas
    const isMatch = BcryptAdapter.compare(password, existUser.password); // :a primera pass es la del usuario ej: admin y la segunda la encriptada ej: JKSDFH
    if(!isMatch) throw CustomError.unauthorized('Password Incorrecta');

    // Construir un jwt
    const token = await JwtAdapter.generatetoken({id: existUser.id_user,} )
    if(!token) throw CustomError.internalServer('Error al crear el token');

    return {
      msg: 'Usuario autenticado correctamente',
      data: {
        user: existUser,
        token: token,
      }
    }
  }

  private async sendEmailValidationLink(email: string, token: string) {
    //const token = await JwtAdapter.generatetoken({ email });
    //if (!token) throw CustomError.internalServer("Error getting token");

    const link = `${envs.WEBSERVICE_URL}/user/validate-email/${token}`;

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
