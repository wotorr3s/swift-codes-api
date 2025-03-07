import { CreationOptional, Model, Sequelize } from "sequelize";
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined");
}
export const sequelizeInstance = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: true,
        native:true
      }
  });
//     {
//     host: process.env.DATABASE_HOST,
//     database: process.env.DATABASE_NAME,
//     username: process.env.DATABASE_USERNAME,
//     password: process.env.DATABASE_PASSWORD,
//     dialect: 'postgres',
//     port: process.env.DATABASE_PORT ? parseInt(process.env.DATABASE_PORT) : 0,
// });

export class BaseModel<A extends {}, CA extends {}> extends Model<A, CA> {
    declare id: CreationOptional<number>;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

export class BaseParanoidModel<A extends {}, CA extends {}> extends BaseModel<
    A,
    CA
> {
    declare deletedAt: CreationOptional<Date>;
}