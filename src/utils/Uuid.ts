import { v4 as uuid } from "uuid";

class Uuid {

    get(): string {
        return uuid();
    }
}

export default Uuid;