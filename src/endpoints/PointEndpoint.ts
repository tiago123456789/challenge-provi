import { Request, Response, NextFunction } from "express";
import PointRepositoryInterface from "../repositories/contracts/PointRepositoryInterface";
import PointService from "../service/PointService";

class PointEndpoint {

    constructor(
        private readonly repository: PointRepositoryInterface,
        private readonly service: PointService
    ) {
        this.repository = repository;
        this.service = this.service;
        this.create = this.create.bind(this);
        this.findAll = this.findAll.bind(this);
        this.findById = this.findById.bind(this);
    }

    async findAll(request: Request, response: Response) {
        const itens = await this.repository.findAll(["*"], {});
        return response.json(itens);
    }

    async findById(request: Request, response: Response, next: NextFunction) {
        try {
            const id = request.params.id;
            const item = await this.service.findById(Number(id));
            return response.json(item);
        } catch(error) {
            next(error);
        }
      
    }

    async create(request: Request, response: Response) {
        const newRegister = request.body;
        await this.repository.create(newRegister);
        return response.sendStatus(201);
    }
}

export default PointEndpoint;