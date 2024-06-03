import mongoose from 'mongoose';

interface Options {
    mongoUrl: string;
    dbName: string;
}

export class MongoDatabase {
    static async connect(options: Options) {
        const { mongoUrl, dbName } = options;

        try {
            await mongoose.connect(mongoUrl, {
                dbName
            });
            console.log(`Conectado a mongo en la url: ${mongoUrl}`);
            return true;
        } catch (error) {
            console.log(`Error en la conexion con mongo: ${error}`);
            throw error;
        }
    }

    static async disconnect() {
        await mongoose.disconnect();
    }
}