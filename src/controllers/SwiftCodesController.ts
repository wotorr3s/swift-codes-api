import express from 'express';
import { StatusCodes } from "http-status-codes";
import { BankModel } from '../models/BankModel';
import { DepartmentModel } from '../models/DepartmentModel';

require("dotenv").config();

const router = express.Router();

router.get('/' , async (req, res) => {
    const departments = await DepartmentModel.findAll();
    res.status(StatusCodes.OK).send(departments);
});

router.get('/:swiftCode', async (req, res) => {
    const swiftCode = req.params.swiftCode;
    if(swiftCode.endsWith('XXX')){
        const department = await DepartmentModel.findOne({
            where: {
                swiftCode: swiftCode
            },
            attributes: ['address', 'bankName', 'countryISO2', 'countryName', 'isHeadquerter', 'swiftCode'],
        });
        const bank = await BankModel.findOne({
            where: {
                swiftCode: swiftCode
            },
            include:{
                model: DepartmentModel,
                as: 'branches',
                attributes: ['address', 'bankName', 'countryISO2', 'isHeadquerter', 'swiftCode'],
            }
        });
        if(!department){
            res.status(StatusCodes.NOT_FOUND).send({ message: 'Swift code not found' });
            return;
        }

        res.status(StatusCodes.OK).send({address: department?.address, bankName: department?.bankName, countryISO2: department?.countryISO2, countryName: department?.countryName, isHeadquerter: department?.isHeadquerter, swiftCode: department?.swiftCode, branches: bank?.branches});
    }
    else{
        const department = await DepartmentModel.findOne({
            where: {
                swiftCode: swiftCode
            },
            attributes: ['address', 'bankName', 'countryISO2', 'countryName', 'isHeadquerter', 'swiftCode'],
        });
        if(!department){
            res.status(StatusCodes.NOT_FOUND).send({ message: 'Swift code not found' });
            return;
        }
        res.status(StatusCodes.OK).send(department);
    }
    
});

router.get('/country/:countryISO2', async (req, res) => {
    const countryISO2 = req.params.countryISO2;
    const country = await DepartmentModel.findOne({
        where: {
            countryISO2: countryISO2
        },
        attributes: ['countryName'],
    });
    if (!country) {
        res.status(StatusCodes.NOT_FOUND).send({ message: 'Country not found' });
        return;
    }
    const departments = await DepartmentModel.findAll({
        where: {
            countryISO2: countryISO2
        },
        attributes: ['address', 'bankName', 'countryISO2', 'isHeadquerter', 'swiftCode'],
    });
    if (departments.length === 0) {
        res.status(StatusCodes.NOT_FOUND).send({ message: 'No swift codes found for this country' });
        return;
    }
    res.status(StatusCodes.OK).send({ countryISO2: countryISO2, countryName: country?.countryName, swiftCodes: departments });
});

router.post('/', async (req, res) => {
    const { bankName, swiftCode, address, countryName, countryISO2, isHeadquarter } = req.body;
    if (!bankName || !swiftCode || !address || !countryName || !countryISO2 || isHeadquarter === undefined) {
        res.status(StatusCodes.BAD_REQUEST).send({ message: 'Missing required fields' });
        return;
    }
    try {
        if (!isHeadquarter) {
            const timezone = await DepartmentModel.findOne({
                where: {
                    countryISO2: countryISO2
                },
                attributes: ['timezone'],
            }).then((timezone) => {
                return timezone?.timezone;
            });
            const bankId = await BankModel.findOne({
                where: {
                    swiftCode: swiftCode.substring(0, 8) + 'XXX'
                },
                attributes: ['id'],
            }).then((bankId) => {
                return bankId?.id;
            });
            if (!bankId) {
                res.status(StatusCodes.BAD_REQUEST).send({ message: 'Headquarter bank not found for the given swift code' });
                return;
            }
            await DepartmentModel.create({
                bankName: bankName,
                swiftCode: swiftCode,
                address: address,
                town: '',
                countryName: countryName,
                countryISO2: countryISO2,
                isHeadquerter: isHeadquarter,
                timezone: timezone ? timezone : '',
                bankId: bankId,
            });
            res.status(StatusCodes.CREATED).send({ message: 'Swift code created successfully' });
        } else {
            const bank = await BankModel.create({
                bankName: bankName,
                swiftCode: swiftCode,
            });
            await DepartmentModel.create({
                bankName: bankName,
                swiftCode: swiftCode,
                address: address,
                town: '',
                countryName: countryName,
                countryISO2: countryISO2,
                isHeadquerter: true,
                timezone: '',
                bankId: bank.id,
            });
            res.status(StatusCodes.CREATED).send({ message: 'Swift code created successfully' });
        }
    } catch (e:any) {
        console.error(e);
        if (e.name === 'SequelizeUniqueConstraintError') {
            res.status(StatusCodes.BAD_REQUEST).send({ message: 'Swift code already exists' });
        } else {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: 'An error occurred while creating the swift code' });
        }
    }
});

router.delete('/:swiftCode', async (req, res) => {
    const swiftCode = req.params.swiftCode;
    try {
        const department = await DepartmentModel.findOne({
            where: {
                swiftCode: swiftCode
            },
            attributes: ['id'],
        });
        if (!department) {
            res.status(StatusCodes.NOT_FOUND).send({ message: 'Swift code not in the database' });
            return;
        }
        await DepartmentModel.destroy({
            where: {
                swiftCode: swiftCode
            }
        });
        res.status(StatusCodes.OK).send({ message: 'Swift code deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: 'An error occurred while deleting the swift code' });
    }
});


export default router;