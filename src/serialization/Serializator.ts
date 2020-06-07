export default interface Serializator {

    serialize(values: Array<{ [key: string]: any}>):  Array<{ [key: string]: any}>;
}