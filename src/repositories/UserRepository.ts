import UserRepositoryInterface from "./contracts/UserRepositoryInterface";
import mongo, { ObjectId } from "mongodb";
import connection from "../config/Database";
import FieldUpdate from "../models/FieldUpdate";

class UserRepository implements UserRepositoryInterface {

    private table: string;

    private connection: mongo.Db;

    constructor() {
        // @ts-ignore
        this.connection = connection;
        this.table = "users";
    }


    async save(register: { [key: string]: any }) {
        const connection = await this.connection;
        connection.collection(this.table).insertOne(register);
        return register.token;
    }

    async findByEmail(email: string): Promise<any> {
        const connection = await this.connection;
        return connection
            .collection(this.table)
            .find({ email: email })
            .toArray();
    }

    async findByToken(token: string): Promise<any[]> {
        const connection = await this.connection;
        return connection
            .collection(this.table)
            .find({ token: token })
            .toArray();
    }

    async update(
        conditions: { [key: string]: any },
        datasModified: { [key: string]: any }
    ): Promise<any> {
        const connection = await this.connection;
        return connection
            .collection(this.table)
            .updateOne(conditions, datasModified);
    }

    async findByFieldAnIdDifferenteMencionated(field: FieldUpdate, id: string): Promise<any> {
        const connection = await this.connection;
        return connection
            .collection(this.table)
            .find({
                _id: { $ne: new ObjectId(id) },
                [field.field]: {
                    $elemMatch: { data: field.data }
                }
            })
            .toArray();
    }

    async findByFieldAnId(field: FieldUpdate, id: string): Promise<any> {
        const connection = await this.connection;
        return connection
            .collection(this.table)
            .find({
                _id: new ObjectId(id),
                [field.field]: {
                    $elemMatch: { data: field.data }
                }
            })
            .toArray();
    }
}

export default UserRepository;