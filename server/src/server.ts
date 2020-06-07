import express from 'express';
import routes from './routes';
import cors from 'cors';
import path from 'path';


const server = express();

server.use(cors());
server.use(express.json());
server.use(routes);

server.use('/upload', express.static(path.resolve(__dirname, '..', 'upload')))

server.listen(3000);