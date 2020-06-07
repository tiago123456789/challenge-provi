import knex from "knex";
import Config from "./Config";

class Database implements Config {

    public serviceName: string;

    constructor() {
        this.serviceName = "database";
    }

    bootstrap(): any {
        return knex({
            client: 'mysql2',
            connection: {
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_DATABASE
            },
            migrations: {
                tableName: "migrations"
            }
        });
    };
}

export default Database;