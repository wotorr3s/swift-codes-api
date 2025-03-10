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

});