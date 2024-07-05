import { PropositoModel } from '../../data/mysql/models/proposito';
import { CreatePropositoDto } from '../../domain/dtos/proposito/create.proposito.dto';
import { CustomError } from '../../domain/errors/customs.error';



export class PropositoService {

    // DI 
    constructor() {}

    public async create(createPropositDto: CreatePropositoDto) {
        try {
            const existProposito = await PropositoModel.findOne({
                where: { nombre: createPropositDto.nombre }
            });
            if(existProposito) throw CustomError.badRequest('Proposito alredy exist');

            // Almacenar en la db
            const proposito: PropositoModel = await PropositoModel.create({
                nombre: createPropositDto.nombre,
                descripcion: createPropositDto.descripcion,
            });

            return {
                proposito,
            };
        } catch (error) {
            console.log(error);
            throw CustomError.internalServer(`Error`);
        }
    }

    public async getPropositoById(id: string | number ) {
        try {
            const existProposito = await PropositoModel.findByPk(id);
            if(!existProposito) throw CustomError.notFound(`Proposito with id: ${ id } not found`);
            return { existProposito };
        } catch (error) {
            console.log(error);
            throw CustomError.notFound(`Proposito with id: ${ id } not found`)
        }
    }

    public async getAllPropositos() {
        try {
            const propositos = await PropositoModel.findAll();
            return { propositos };
        } catch (error) {
            console.log(error);
            throw CustomError.internalServer('Error with MySql');
        }
    }
}