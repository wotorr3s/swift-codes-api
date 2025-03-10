import { DataTypes, InferAttributes, InferCreationAttributes } from "sequelize";
import { Bank, Department } from "../../types";
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
        declare bankName: string;
        declare swiftCode: string;
        declare branches?: Department[];
}

BankModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        bankName: {
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