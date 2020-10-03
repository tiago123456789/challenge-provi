import UserRepositoryInterface from "./contracts/UserRepositoryInterface";
import mongo from "mongodb";
import connection from "../config/Database";
import StepRepositoryInterface from "./contracts/StepRepositoryInterface";

class StepRepository implements StepRepositoryInterface {

    private table: string;

    private connection: mongo.Db;

    constructor() {
        // @ts-ignore
        this.connection = connection;
        this.table = "steps";
    }

    async findByField(field: string): Promise<any> {
        const connection = await this.connection;
        return connection.collection(this.table).findOne({ field: field });
    }

    async getFirstStep(): Promise<any> {
        const connection = await this.connection;
        const steps = await connection
            .collection(this.table)
            .find({})
            .sort({ createdAt: 1 })
            .limit(1)
            .toArray();

        return steps[0] || null;
    }

    async getNextStep(stepCurrent: { [key: string]: any }): Promise<any> {
        const connection = await this.connection;
        const steps = await connection
            .collection(this.table)
            .find({ createdAt: { $gt: stepCurrent.createdAt } })
            .sort({ createdAt: 1 })
            .limit(1)
            .toArray();

        return steps[0] || null;
    }


}

export default StepRepository;