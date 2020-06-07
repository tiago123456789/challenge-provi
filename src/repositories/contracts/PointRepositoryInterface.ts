import { Transaction } from "knex";

interface PointRepositoryInterface {

    findAll(columns: Array<string>, conditions: { [key: string]: any }): Promise<any>;
    findById(id: number): Promise<any>;
    create(newRegister: { [key: string]: any } ): Promise<any>;
    insertManyPointsItens(registers: { [key: string]: any}[], trx: Transaction): Promise<any>;
}

export default PointRepositoryInterface;