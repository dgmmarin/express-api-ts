import 'dotenv/config'
import "reflect-metadata"
import express, { NextFunction, Request, Response } from 'express';
import task from './routes/task';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import { AppDataSource } from "./data-source";
import root from "./routes/root";

AppDataSource.initialize().then(async () => {
    console.log("Here you can setup and run express / fastify / any other framework.")
    const app = express();
    const port = process.env.PORT || 3000;
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cors())

    app.use("/", root)
    app.use('/tasks', task);

    // Add this error handling middleware
    app.use((err: Error, req: Request, res: Response, next: NextFunction): any => {
        console.error(err.stack);
        res.status(500).send('Something went wrong');
    });
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}).catch(error => console.log(error))
