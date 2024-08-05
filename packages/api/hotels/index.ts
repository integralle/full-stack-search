import {mongoConnection} from "../db";
import {ObjectId} from "mongodb";
import { Router } from 'express';

export const hotelsRouter = Router();

hotelsRouter.get('/:id', async (req, res) => {
  const id = req.params.id;
  console.log(`Received get hotel ${id} request`);
  if (!id) {
    res.status(400).send('Hotel id missing');
    return;
  }
  try {
    const db = mongoConnection.db();
    const hotel = await db
      .collection('hotels')
      .findOne({_id: new ObjectId(id)});
    if (hotel === null) {
      res.status(404).send('Hotel not found');
      return;
    }
    console.log(`Get hotel by id ${id} result`, JSON.stringify(hotel));
    res.send(hotel);
  } catch (err) {
    console.log(`Failed to get hotel ${id} details`, err);
    res.status(500).send('Failed to get hotel details');
  }
});

hotelsRouter.get('/', async (req, res) => {
  const searchToken = req.query.search;
  if (!searchToken) {
    res.status(400).send('Search token cannot be empty');
    return;
  }
  console.log(`Received search hotels request for ${searchToken}`);
  try {
    const db = mongoConnection.db();
    const hotels = await db
      .collection('hotels')
      .find({
        $or: [
          {hotel_name: {$regex: searchToken, $options: "i"}},
          {country: {$regex: searchToken, $options: "i"}},
        ]
      })
      .toArray();
    console.log(`Search hotels result for ${searchToken}`, JSON.stringify(hotels));
    res.send(hotels);
  } catch (err) {
    console.log(`Failed to search hotels for ${searchToken}`, err);
    res.status(500).send('Failed to search hotels');
  }
});