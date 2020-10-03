import { NextFunction, Response, Request } from "express";
import AuthFactory from "../factories/AuthFactory";

const auth = new AuthFactory().make({});

export default {

    hasPermission: async (request: Request, response: Response, next: NextFunction) => {
        try {
            const data = request.body;
            await auth.hasPermission({ token: data.token });
            next();
        } catch (error) {
            next(error);
        }
    }
}