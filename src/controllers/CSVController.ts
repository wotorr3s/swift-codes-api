import express from 'express';
import { StatusCodes } from "http-status-codes";

import {parse} from 'csv-parse';
import fs, { read } from 'fs';
import path from 'path';
import { BankModel } from '../models/BankModel';
import { DepartmentModel } from '../models/DepartmentModel';

require("dotenv").config();

const router = express.Router();

var csvRow:any=[];

router.get('/' , async (req, res) => {
    readFromCSV();
    res.status(StatusCodes.OK).send('Reading from CSV');
});

async function readFromCSV(){
    const csvFilePath = path.join(__dirname, '..', 'data', 'Interns_2025_SWIFT_CODES.csv');
    fs.createReadStream(csvFilePath)
      .pipe(parse({ columns: true }))
      .on('data', (row) => {
        csvRow.push({ name: row['NAME'], swiftCode: row['SWIFT CODE'], codeType: row['CODE TYPE'], address: row['ADDRESS'], town: row['TOWN NAME'], country: row['COUNTRY NAME'], countryISO2: row['COUNTRY ISO2 CODE'], timezone: row['TIME ZONE'] });
        // console.log(csvRow[0]);
      })
      .on('end', () => {
        console.log('CSV file successfully processed');
      })
      .on('error', (error) => {
        console.error(error);
      });
    await saveToDBHeadquerters();
    await saveToDBBranches();
}

async function saveToDBHeadquerters(){
    let headquerters = csvRow.filter((row:any)=> row.swiftCode.endsWith('XXX'));
    for (const headquerter of headquerters) {
        const bank = await BankModel.create({
            bankName: headquerter.name,
            swiftCode: headquerter.swiftCode,
        });
        try{
            await DepartmentModel.create({
                bankName: headquerter.name,
                swiftCode: headquerter.swiftCode,
                address: headquerter.address,
                town: headquerter.town,
                countryName: headquerter.country,
                countryISO2: headquerter.countryISO2,
                isHeadquerter: true,
                timezone: headquerter.timezone,
                bankId: bank.id,
            });
        }catch(e){
            // console.log(e);
        }
    }
}

async function saveToDBBranches(){
    let branches = csvRow.filter((row:any)=> !row.swiftCode.endsWith('XXX'));
    for (const branch of branches) {
        let swiftMain = branch.swiftCode.substring(0, 8) + 'XXX';
        console.log(swiftMain);
        const bank = await BankModel.findOne({
            where: {
                swiftCode: swiftMain,
            }
        });
        if (bank) {
            try{
                await DepartmentModel.create({
                    bankName: branch.name,
                    swiftCode: branch.swiftCode,
                    address: branch.address,
                    town: branch.town,
                    countryName: branch.country,
                    countryISO2: branch.countryISO2,
                    isHeadquerter: false,
                    timezone: branch.timezone,
                    bankId: bank.id,
                });
            }catch(e){
                // console.log(e);
            }
        }
        else{
            try{
                await DepartmentModel.create({
                    bankName: branch.name,
                    swiftCode: branch.swiftCode,
                    address: branch.address,
                    town: branch.town,
                    countryName: branch.country,
                    countryISO2: branch.countryISO2,
                    isHeadquerter: false,
                    timezone: branch.timezone,
                    bankId: -1,
                });
            }catch(e){
                // console.log(e);
            }
        }
    }
}

export {router, readFromCSV, saveToDBHeadquerters, saveToDBBranches};