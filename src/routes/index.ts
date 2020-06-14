import { Express, Request, Response } from "express";
import storage from "./../config/Storage";
import ItemEndpoint from "../endpoints/ItemEndpoint";
import PointEndpoint from "../endpoints/PointEndpoint";
import ItemRepository from "../repositories/ItemRepository";
import handlerExceptionMiddleware from "../middleware/HandlerExceptionMiddleware";
import PointRepository from "../repositories/PointRepository";
import PointService from "../service/PointService";
import ItemSerializator from "../serialization/ItemSerializator";
import PointSerializator from "../serialization/PointSerializator";

const pointRepository = new PointRepository();
const itemRepository = new ItemRepository();
const itemEndpoint = new ItemEndpoint(new ItemSerializator(), itemRepository);
const pointEndpoint = new PointEndpoint(
    pointRepository, new PointService(pointRepository),
    new PointSerializator()
);

export default (app: Express) => {

    app.get("/itens", itemEndpoint.findAll);
    app.get("/points", pointEndpoint.findAll);
    app.get("/points/:id", pointEndpoint.findById);
    app.post("/points", storage.single('image'), pointEndpoint.create);

    // Setting middleware handler exceptions application.
    app.use(handlerExceptionMiddleware);
}