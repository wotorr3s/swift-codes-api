import cors from "cors";
import express from 'express';
import { sequelizeInstance } from './config/sequelizeInstance';
import dotenv from 'dotenv';


import routes from "./routes";

const app = express();
// app.use(bodyParser.json());

app.use(cors());
app.disable("x-powered-by");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/v1", routes);

dotenv.config();

const port = 8080;


app.get('/', (req, res) => {
  res.send('Hello World');
  
});

const server = app.listen(port, async () => {
    console.log(`Express is listening at http://localhost:${port}`);
    await sequelizeInstance.sync();
});

