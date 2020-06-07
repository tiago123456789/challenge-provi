import { NextFunction, Response, Request } from "express";

export default (error: Error, request: Request, response: Response, next: NextFunction) => {

    switch(error.name) {
        case "NotFoundException":
            return response.status(404).json({
                statusCode: 404,
                message: error.message
            });
        default: 
            return response.status(500).json({
                statusCode: 500,
                message: error.message
            });
    }
}