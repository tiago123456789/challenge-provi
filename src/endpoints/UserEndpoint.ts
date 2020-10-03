import Endpoint from "./Endpoint";
import Joi from "joi";
import UserService from "../service/UserService";
import { NextFunction, Request, Response } from "express";

class UserEndpoint extends Endpoint {

    constructor(private readonly service: UserService) {
        super();
        this.register = this.register.bind(this);
        this.updateField = this.updateField.bind(this);
    }

    getRulesValidation(): { [key: string]: any; } {
        return Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required(),
        });
    }

    public async register(request: Request, response: Response, next: NextFunction) {
        try {
            const register = request.body;
            this.isValidDatas(register);
            const token = await this.service.register(register);
            return response.json({ token });
        } catch(error) {
            next(error);
        }
    }

    async updateField(request: Request, response: Response, next: NextFunction) {
        try {
            const field = request.params.nextStep
            const datas = request.body;
            const nextStep = await this.service.updateField({
                field: field, token: datas.token, data: datas.data
            });
            return response.status(201).json({
                success: true,
                next_end_point: nextStep
            });
        } catch(error) {
            next(error);
        }
    }

}

export default UserEndpoint;