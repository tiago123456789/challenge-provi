interface ItemRepositoryInterface {

    findAll(columns: Array<string>, conditions: { [key: string]: any }): Promise<any>;
}

export default ItemRepositoryInterface;