import express from 'express';

import PointController from './controllers/pointController';
import ItemController from './controllers/itemController';

const routes = express.Router();
const pointController = new PointController();
const itemController = new ItemController();

//Pega TODOS items de coleta
routes.get('/items', itemController.index);

//Cria o ponto de coleta
routes.post('/points', pointController.create);
//Pega TODOS os pontos de coleta baseado em um argumento
routes.get('/points', pointController.index);
//Pega um ÚNICO ponto de coleta baseado no ID
routes.get('/points/:id', pointController.show);


export default routes;