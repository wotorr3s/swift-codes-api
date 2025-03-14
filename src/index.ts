import cors from "cors";
import express from 'express';
import { sequelizeInstance } from './config/sequelizeInstance';
import dotenv from 'dotenv';
import routes from "./routes";
import { readFromCSV } from './controllers/CSVController';
const { runCLI } = require('jest');

dotenv.config();

const app = express();
const port = 8080;

app.use(cors());
app.disable("x-powered-by");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/v1", routes);

app.get('/', (req, res) => {
  res.send('Hello World');
});

// Initialize database schema
sequelizeInstance.sync().then(() => {
  app.listen(port, async () => {
    console.log(`Express is listening at http://localhost:${port}`);
    await readFromCSV();
    await readFromCSV();
  });
}).catch((error) => {
  console.error('Unable to synchronize the database:', error);
});

