import { Request, Response, NextFunction } from "express";
import Joi from "@hapi/joi";
import PointRepositoryInterface from "../repositories/contracts/PointRepositoryInterface";
import PointService from "../service/PointService";
import Endpoint from "./Endpoint";

class PointEndpoint extends Endpoint {
    
    constructor(
        private readonly repository: PointRepositoryInterface,
        private readonly service: PointService
    ) {
        super();
        this.repository = repository;
        this.service = this.service;
        this.create = this.create.bind(this);
        this.findAll = this.findAll.bind(this);
        this.findById = this.findById.bind(this);
    }

    getRulesValidation(): { [key: string]: any; } {
        return Joi.object({
            name: Joi.string().min(2).required(),
            email: Joi.string().email().required(),
            whatsapp: Joi.string().min(15).max(15).required(),
            latitude: Joi.number().required(),
            longitude: Joi.number().required(),
            city: Joi.string().min(2).required(),
            uf: Joi.string().min(2).max(2).required(),
            itens: Joi.array().min(1).required(),
            path_image: Joi.string().min(2).required()
        });
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

    async create(request: Request, response: Response, next: NextFunction) {
        try {
            const newRegister = request.body;
            this.isValidDatas(newRegister);
            await this.service.create(newRegister);
            return response.sendStatus(201);
        } catch(error) { 
            next(error);
        }
    } 
}

export default PointEndpoint;