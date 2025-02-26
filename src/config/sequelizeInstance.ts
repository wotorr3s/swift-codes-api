import { CreationOptional, Model, Sequelize } from "sequelize";

export const sequelizeInstance = new Sequelize({
    host: '',
    database: '',
    username: 'user',
    password: '',
    dialect: 'postgres',
    port: 0,
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