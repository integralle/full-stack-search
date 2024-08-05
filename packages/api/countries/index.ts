import {mongoConnection} from "../db";
import { Router } from 'express';

export const countriesRouter = Router();

countriesRouter.get('/:isoCode', async (req, res) => {
  const isoCode = req.params.isoCode;
  console.log(`Received get country ${isoCode} request`);
  if (!isoCode) {
    res.status(400).send('Country iso code missing');
    return;
  }
  try {
    const db = mongoConnection.db();
    const country = await db
      .collection('countries')
      .findOne({countryisocode: isoCode});
    if (country === null) {
      res.status(404).send('Country not found');
      return;
    }
    console.log(`Get country by iso code ${isoCode} result`, JSON.stringify(country));
    res.send(country);
  } catch (err) {
    console.log(`Failed to get country ${isoCode} details`, err);
    res.status(500).send('Failed to get country details');
  }
});

countriesRouter.get('/', async (req, res) => {
  const searchToken = req.query.search;
  if (!searchToken) {
    res.status(400).send('Search token cannot be empty');
    return;
  }
  console.log(`Received search countries request for ${searchToken }`);
  try {
    const db = mongoConnection.db();
    const countries = await db
      .collection('countries')
      .find({country: {$regex: searchToken, $options: "i"}})
      .toArray();
    console.log(`Search countries result for ${searchToken}`, JSON.stringify(countries));
    res.send(countries);
  } catch (err) {
    console.log(`Failed to search countries for ${searchToken}`, err);
    res.status(500).send('Failed to search countries');
  }
});