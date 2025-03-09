import { DataTypes, InferAttributes, InferCreationAttributes } from "sequelize";
import { Department } from "../../types";
import { BankModel } from "./BankModel";
import {
    BaseParanoidModel,
    sequelizeInstance,
} from "../config/sequelizeInstance";

class DepartmentModel
    extends BaseParanoidModel<
        InferAttributes<DepartmentModel>,
        InferCreationAttributes<DepartmentModel>
    >
    implements Department {
        declare name: string;
        declare bankId: number;
        declare swiftCode: string;
        declare address: string;
        declare town: string;
        declare country: string;
        declare countryISO2: string;
        declare isHeadquerter: boolean;
        declare timezone: string;
}

DepartmentModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        bankId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
        },
        swiftCode: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        town: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        country: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        countryISO2: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isHeadquerter: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        timezone: {
            type: DataTypes.STRING,
            allowNull: false,
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

DepartmentModel.belongsTo(BankModel, {
    foreignKey: "bankId",
    as: "bank",
});
BankModel.hasMany(DepartmentModel, {
    foreignKey: "bankId",
    as: "branches",
});


export { DepartmentModel };