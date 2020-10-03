import { Express, Request, Response } from "express";
import handlerException from "../middleware/HandlerExceptionMiddleware";
import UserEndpointFactory from "../factories/UserEndpointFactory";
import authMiddleware from "../middleware/AuthMiddleware";

const userEnpoint = new UserEndpointFactory().make({});

export default (app: Express) => {
    
    app.post("/api/v1/users", userEnpoint.register);

    app.post("/api/v1/users/:field", authMiddleware.hasPermission, userEnpoint.updateField);
    
    // Handler exceptions in aplication.
    app.use(handlerException);
}