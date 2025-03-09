import express from 'express';
import { StatusCodes } from "http-status-codes";
import { BankModel } from '../models/BankModel';
import { DepartmentModel } from '../models/DepartmentModel';

require("dotenv").config();

const router = express.Router();

router.get('/' , async (req, res) => {
    const departments = await DepartmentModel.findAll();
    console.log(departments)
    res.status(StatusCodes.OK).send(departments);
});

router.get('/:swiftCode', async (req, res) => {
    const swiftCode = req.params.swiftCode;
    console.log(swiftCode)
    if(swiftCode.endsWith('XXX')){
        const bank = await BankModel.findOne({
            where: {
                swiftCode: swiftCode
            },
            include:{
                model: DepartmentModel,
                as: 'branches'
            }
        });
        res.status(StatusCodes.OK).send(bank);
    }
    else{
        const department = await DepartmentModel.findOne({
            where: {
                swiftCode: swiftCode
            }
        });
        console.log(department)
        res.status(StatusCodes.OK).send(department);
    }
    
});


export default router;