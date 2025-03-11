import cors from "cors";
import express from 'express';
import { sequelizeInstance } from './config/sequelizeInstance';
import dotenv from 'dotenv';
import routes from "./routes";

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
  console.log('Database synchronized');
  // Start the server
  app.listen(port, () => {
    console.log(`Express is listening at http://localhost:${port}`);
  });
}).catch((error) => {
  console.error('Unable to synchronize the database:', error);
});

