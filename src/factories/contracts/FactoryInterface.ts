interface FactoryInterface<T> {

    make(values: { [key: string]: any }): T;
}

export default FactoryInterface;