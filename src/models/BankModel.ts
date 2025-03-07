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
        declare id: number;
        declare bankName: string;
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
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
        deletedAt: DataTypes.DATE,
    },
    {
        sequelize: sequelizeInstance,
        tableName: "departments",
        paranoid: true,
    }
    
);
    
export { BankModel };