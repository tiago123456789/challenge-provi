import Repository from "./Repository";
import ItemRepositoryInterface from "./contracts/ItemRepositoryInterface";

class ItemRepository extends Repository implements ItemRepositoryInterface {

    constructor() {
        super("itens");
    }
};

export default ItemRepository;