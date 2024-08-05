import express from "express";
import cors from 'cors';
import {mongoConnection} from "./db";
import {citiesRouter} from "./cities";
import {countriesRouter} from "./countries";
import {hotelsRouter} from "./hotels";

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());
app.use(express.json());

app.use('/cities', citiesRouter);
app.use('/countries', countriesRouter);
app.use('/hotels', hotelsRouter);

app.listen(PORT, () => {
    console.log(`API Server Started at ${PORT}`)
});

process.on('exit', async () => {
    await mongoConnection.close();
    console.log('API Server closing');
});