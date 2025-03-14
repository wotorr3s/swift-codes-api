import request from 'supertest';
import express from 'express';
import router from '../controllers/SwiftCodesController';
import { sequelizeInstance } from '../config/sequelizeInstance';

const app = express();
app.use(express.json());
app.use('/swift-codes', router);

beforeAll(async () => {
  await sequelizeInstance.sync({ force: true });
});

describe('SwiftCodesController', () => {
    it('should create a new swift code', async () => {
        const response = await request(app)
            .post('/swift-codes')
            .send({
                bankName: 'Test Bank',
                swiftCode: 'TESTBANKXXX',
                address: '123 Test St',
                countryName: 'Test Country',
                countryISO2: 'TC',
                isHeadquarter: true,
            });
        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Swift code created successfully');
    });

    it('should return 400 if required fields are missing', async () => {
        const response = await request(app)
            .post('/swift-codes')
            .send({
                bankName: 'Test Bank',
                swiftCode: 'TESTBANKXXX',
            });
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Missing required fields');
    });

    it('should get all departments', async () => {
        const response = await request(app).get('/swift-codes');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('should get a department by swift code', async () => {
        await request(app)
            .post('/swift-codes')
            .send({
                bankName: 'Test Bank',
                swiftCode: 'TESTBANKXXX',
                address: '123 Test St',
                countryName: 'Test Country',
                countryISO2: 'TC',
                isHeadquarter: true,
            });

        const response = await request(app).get('/swift-codes/TESTBANKXXX');
        expect(response.status).toBe(200);
        expect(response.body.swiftCode).toBe('TESTBANKXXX');
    });

    it('should return 404 if swift code not found', async () => {
        const response = await request(app).get('/swift-codes/NONEXISTENT');
        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Swift code not found');
    });

    it('should get departments by country ISO2', async () => {
        await request(app)
            .post('/swift-codes')
            .send({
                bankName: 'Test Bank',
                swiftCode: 'TESTBANKXXX',
                address: '123 Test St',
                countryName: 'Test Country',
                countryISO2: 'TC',
                isHeadquarter: true,
            });

        const response = await request(app).get('/swift-codes/country/TC');
        expect(response.status).toBe(200);
        expect(response.body.countryISO2).toBe('TC');
        expect(Array.isArray(response.body.swiftCodes)).toBe(true);
    });

    it('should return 404 if no swift codes found for country', async () => {
        const response = await request(app).get('/swift-codes/country/XX');
        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Country not found');
    });

    it('should delete a swift code', async () => {
        await request(app)
            .post('/swift-codes')
            .send({
                bankName: 'Test Bank',
                swiftCode: 'TESTBANKXXX',
                address: '123 Test St',
                countryName: 'Test Country',
                countryISO2: 'TC',
                isHeadquarter: true,
            });

        const response = await request(app).delete('/swift-codes/TESTBANKXXX');
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Swift code deleted successfully');
    });

    it('should return 404 if swift code to delete not found', async () => {
        const response = await request(app).delete('/swift-codes/NONEXISTENT');
        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Swift code not in the database');
    });

    it('should return 200 and the correct country name for a valid country ISO2', async () => {
        await request(app)
            .post('/swift-codes')
            .send({
                bankName: 'Test Bank',
                swiftCode: 'TESTBANKXXX',
                address: '123 Test St',
                countryName: 'Test Country',
                countryISO2: 'TC',
                isHeadquarter: true,
            });

        const response = await request(app).get('/swift-codes/country/TC');
        expect(response.status).toBe(200);
        expect(response.body.countryName).toBe('Test Country');
    });

    it('should return 404 if no departments found for a valid country ISO2', async () => {
        const response = await request(app).get('/swift-codes/country/XX');
        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Country not found');
    });

    it('should return 200 and the correct department for a valid swift code', async () => {
        await request(app)
            .post('/swift-codes')
            .send({
                bankName: 'Test Bank',
                swiftCode: 'TESTBANKXXX',
                address: '123 Test St',
                countryName: 'Test Country',
                countryISO2: 'TC',
                isHeadquarter: true,
            });

        const response = await request(app).get('/swift-codes/TESTBANKXXX');
        expect(response.status).toBe(200);
        expect(response.body.swiftCode).toBe('TESTBANKXXX');
    });

    it('should return 404 if no department found for a valid swift code', async () => {
        const response = await request(app).get('/swift-codes/NONEXISTENT');
        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Swift code not found');
    });
});