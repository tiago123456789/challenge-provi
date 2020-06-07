import { Request, Response } from "express";
import ItemRepositoryInterface from "../repositories/contracts/ItemRepositoryInterface";
import Serializator from "../serialization/Serializator";

class ItemEndpoint {

    constructor(
        private readonly serializator: Serializator,
        private readonly repository: ItemRepositoryInterface) {
        this.serializator = serializator;
        this.repository = repository;
        this.findAll = this.findAll.bind(this);
    }

    async findAll(request: Request, response: Response) {
        let itens = await this.repository.findAll(["*"], {});
        itens = this.serializator.serialize(itens);
        return response.json(itens);
    }

}

export default ItemEndpoint;