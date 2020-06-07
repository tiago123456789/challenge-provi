import bootstrap from "../config/Bootstrap";

abstract class Repository {

    private connection: any;
    protected table: string; 

    constructor(table: string) {
        this.connection = bootstrap.getConfigLoaded("database");
        this.table = table;
    }

    public findAll(columns: Array<string> = ["*"], conditions: { [key: string]: any } = {}) {
        const columnsReturnedQuery: string = columns.join(",");
        return this.connection(this.table)
            .where(conditions)
            .select(columnsReturnedQuery);
    }

    public findById(id: number) {
        return this.connection(this.table)
                   .where({ id: id })
                   .select("*");
    }

    public remove(id: number) {
        return this.connection(this.table)
                   .where({ id: id })
                   .delete();
    }

    public create(newRegister: { [key: string]: any } ) {
        return this.connection(this.table).insert(newRegister);
    }

    public update(id: number, datasModified: { [key: string]: any } ) {
        return this.connection(this.table).where({ id: id }).update(datasModified);
    }

    protected getConnection() {
        return this.connection;
    }

}

export default Repository;