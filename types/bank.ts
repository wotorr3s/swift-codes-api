import { Department } from './department';

export interface Bank {
    id: number;
    bankName: string;
    swiftCode: string;
    branches?: Department[];
}