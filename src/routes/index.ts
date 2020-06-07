import { Express, Request, Response } from "express";
import ItemEndpoint from "../endpoints/ItemEndpoint";
import PointEndpoint from "../endpoints/PointEndpoint";
import ItemRepository from "../repositories/ItemRepository";
import handlerExceptionMiddleware from "../middleware/HandlerExceptionMiddleware";
import PointRepository from "../repositories/PointRepository";
import PointService from "../service/PointService";

const pointRepository = new PointRepository();
const itemEndpoint = new ItemEndpoint(new ItemRepository());
const pointEndpoint = new PointEndpoint(
    pointRepository, new PointService(pointRepository)
);

export default (app: Express) => {

    app.get("/itens", itemEndpoint.findAll);
    app.get("/points", pointEndpoint.findAll);
    app.get("/points/:id", pointEndpoint.findById);
    app.post("/points", pointEndpoint.create);

    // Setting middleware handler exceptions application.
    app.use(handlerExceptionMiddleware);
}