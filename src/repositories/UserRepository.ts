import UserRepositoryInterface from "./contracts/UserRepositoryInterface";
import mongo from "mongodb";
import connection from "../config/Database";

class UserRepository implements UserRepositoryInterface {

    private collection: mongo.Collection;

    private connection: mongo.Db;

    constructor() {
        // @ts-ignore
        this.connection = connection;
        this.collection = this.connection.collection("users");
    }

    async save(register: { [key: string]: any }) {
        await this.collection.insertOne(register);
        return register.token;
    }

}

export default UserRepository;