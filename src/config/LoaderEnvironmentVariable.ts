import dotenv from "dotenv";
import Config from "./Config";


class LoaderEnvironmentVariable implements Config {
    
    public serviceName: string;

    constructor() {
        this.serviceName = "loaderEnvironmentVariable";
    }
    
    bootstrap(): any {
        dotenv.config();
    }

}

export default LoaderEnvironmentVariable;