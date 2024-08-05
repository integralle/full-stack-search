import {mongoConnection} from "../db";
import {Router} from 'express';

export const citiesRouter = Router();

citiesRouter.get('/:name', async (req, res) => {
  const name = req.params.name;
  console.log(`Received get city ${name} request`);
  if (!name) {
    res.status(400).send('City name missing');
    return;
  }
  try {
    const db = mongoConnection.db();
    const city = await db
      .collection('cities')
      .findOne({name});
    if (city === null) {
      res.status(404).send('City not found');
      return;
    }
    res.send(city);
    console.log(`Get city by name ${name} result`, JSON.stringify(city));
  } catch (err) {
    console.log(`Failed to get city ${name} details`, err);
    res.status(500).send('Failed to get city details');
  }
});

citiesRouter.get('/', async (req, res) => {
  const searchToken = req.query.search;
  if (!searchToken) {
    res.status(400).send('Search token cannot be empty');
    return;
  }
  console.log(`Received search cities request for ${searchToken}`);
  try {
    const db = mongoConnection.db();
    const cities = await db
      .collection('cities')
      .find({name: {$regex: searchToken, $options: "i"}})
      .toArray();
    console.log(`Search cities result for ${searchToken}`, JSON.stringify(cities));
    res.send(cities);
  } catch (err) {
    console.log(`Failed to search cities for ${searchToken}`, err);
    res.status(500).send('Failed to search cities');
  }
});