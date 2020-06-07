import {Request, Response, response} from 'express';
import knex from '../database/connection';

class PointController {
    async create (req: Request, res: Response) {
        const {
            name,
            email,
            whatsapp,
            lat,
            lon,
            city,
            uf,
            items
        } = req.body;
    
        const trx = await knex.transaction();
        
        const point = {
            image: 'https://images.unsplash.com/photo-1556767576-5ec41e3239ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
            name,
            email,
            whatsapp,
            lat,
            lon,
            city,
            uf
        };

        const insertedIds = await trx('points').insert(point);
        
        const id_point = insertedIds[0];
    
        const pointItems = items.map((id_item: number) => {
            return {
                id_item,
                id_point
            };
        });

        await trx('point_item').insert(pointItems);
    
        await trx.commit();
        return res.json({
             id: id_point,
            ...point
        });
    }

    async show (req: Request, res: Response) {
        const { id } = req.params;

        const point = await knex('points').where('id', id).first();

        if (!point) {
            return res.status(400).json({message: 'Point not found.'})
        }

        const items = await knex('items')
            .join('point_item', 'items.id', '=', 'point_item.id_item')
            .where('point_item.id_point', id)
            .select('items.title');

        return res.json({point,items});
    }

    async index (req: Request, res: Response) {
        const { city, uf ,items } = req.query;
        console.log(city, uf, items);

        const parsedItems = String(items)
            .split(',')
            .map(item => Number(item.trim()));

        const points = await knex('points')
            .join('point_item', 'point_item.id_point', '=', 'points.id')
            .whereIn('point_item.id_item', parsedItems)
            .where('city', String(city))
            .where('uf', String(uf))
            .distinct()
            .select('points.*');

        return res.json(points);
    }

}

export default PointController;