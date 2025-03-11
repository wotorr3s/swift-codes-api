import { CreationOptional, Model, Sequelize } from "sequelize";
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined");
}

export const sequelizeInstance = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    logging: false,
});

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