import express, { Express } from "express";
const cors = require("cors");
import Config from "./Config";
import AppRoutes from "../routes/index";

class Server implements Config {
    
    public serviceName: string;

    private app: Express;

    constructor() {
        this.serviceName = "server";
        this.app = express();
    }

    bootstrap(): any {

        // Setting middleware make parse datas to json.
        this.app.use(express.json());

        // Setting middleware enable cors in application.
        this.app.use(cors());

        // Loading routes application.
        AppRoutes(this.app);

        this.app.get("/test", (request, response) => response.json({ msg: "Success!!! "}))
        this.app.listen(3000, (error) => {
            if (error) {
                console.log(error);
                return;
            }
        
            console.log("Server running in address: http://localhost:3000");
        });
    }
}

export default Server;