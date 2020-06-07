import Serializator from "./Serializator";

export default class ItemSerializator implements Serializator {
    
    serialize(values: { [key: string]: any; }[]): { [key: string]: any; }[] {
        return values.map(value => {
            value.path_image = `${process.env.APP_URL}/${value.path_image}`; 
            return value;
        });
    }
    
}