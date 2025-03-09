import { DataTypes, InferAttributes, InferCreationAttributes } from "sequelize";
import { Bank } from "../../types";
import {
    BaseParanoidModel,
    sequelizeInstance,
} from "../config/sequelizeInstance";

class BankModel
    extends BaseParanoidModel<
        InferAttributes<BankModel>,
        InferCreationAttributes<BankModel>
    >
    implements Bank {
        declare name: string;
        declare swiftCode: string;
}

BankModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
        },
        swiftCode: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
        deletedAt: DataTypes.DATE,
    },
    {
        sequelize: sequelizeInstance,
        tableName: "banks",
        paranoid: true,
    }
    
);
    
export { BankModel };