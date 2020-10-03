interface StepRepositoryInterface {

    findByFiled(field: string): Promise<any>;
    getFirstStep(): Promise<any>;
    getNextStep(stepCurrent: { [key: string]: any }): Promise<any>;
}

export default StepRepositoryInterface;