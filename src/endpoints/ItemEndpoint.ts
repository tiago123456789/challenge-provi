import { Request, Response } from "express";
import ItemRepositoryInterface from "../repositories/contracts/ItemRepositoryInterface";

class ItemEndpoint {

    constructor(private readonly repository: ItemRepositoryInterface) {
        this.repository = repository;
        this.findAll = this.findAll.bind(this);
    }

    async findAll(request: Request, response: Response) {
        const itens = await this.repository.findAll(["*"], {});
        return response.json(itens);
    }

}

export default ItemEndpoint;