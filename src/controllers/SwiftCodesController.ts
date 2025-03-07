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


export default router;