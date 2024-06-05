import { UserEntity } from "../domain/user";
import { CreateUserDTO } from "../dtos/user/create-user-dto";


export abstract class UserDatasource {
    abstract create( createUserDto: CreateUserDTO): Promise<UserEntity>;
    abstract getAll(): Promise<UserEntity[]>;
    //abstract findById( id: number ): Promise<>
}