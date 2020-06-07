import Config from "./Config";
import LoaderEnvironmentVariable from "./LoaderEnvironmentVariable";
import Database from "./Database";
import Server from "./Server";

class Bootstrap implements Config {
    
    public serviceName: string;

    private configsLoad: Array<Config> = [
        new LoaderEnvironmentVariable(),
        new Database(),
        new Server()
    ];

    private configsLoaded: { [key: string]: any } = {};

    constructor() {
        this.serviceName = "";
    }
    
    bootstrap(): any {
        if (this.isAlreadyFirstBootstrapExecution()) {
            return;
        }

        this.configsLoad.forEach(config => {
            this.configsLoaded[config.serviceName] = config.bootstrap();
        });
        return this.configsLoaded; 
    }

    public getConfigLoaded(serviceName: string): null | Object {
        const isExistServiceName = this.configsLoaded[serviceName] != null;
        if (isExistServiceName) {
            return this.configsLoaded[serviceName];
        }

        return null;
    }

    private isAlreadyFirstBootstrapExecution(): boolean {
        const quantityItensConfigsLoaded = Object.keys(this.configsLoaded).length;
        return this.configsLoad.length == quantityItensConfigsLoaded;
    }

}

const bootstrap = new Bootstrap();

export default bootstrap;