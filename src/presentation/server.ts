import express, { Router } from "express";
import path from "path";
import fileUpload from "express-fileupload";
import cors from "cors";
import colors from "colors";

interface Options {
  port: number;
  routes: Router;
  public_path?: string;
}

export class Server {
  public readonly app = express();
  private serverListener?: any;
  private readonly port: number;
  private readonly public_path: string;
  private readonly routes: Router;

  constructor(options: Options) {
    const { port, routes, public_path = "public" } = options;
    this.port = port;
    this.public_path = public_path;
    this.routes = routes;
  }

  async start() {
    //* Cors
    const corsOption = {
      origin: '*'
    };

    this.app.use(cors(corsOption));

    //* Middlewares
    this.app.use(express.json()); // raw
    this.app.use(express.urlencoded({ extended: true })); // x-www-form-urlencoded
    this.app.use(
      fileUpload({
        limits: { fileSize: 50 * 1024 * 1024 },
      })
    );

    //* Public Folder
    this.app.use(express.static(this.public_path));

    //* Routes
    this.app.use(this.routes);


    this.serverListener = this.app.listen(this.port, () => {
      console.log(
        colors.cyan.bold(`Server ejecutandose en el puerto ${this.port}`)
      );
    });
  }

  public close() {
    this.serverListener?.close();
  }
}
