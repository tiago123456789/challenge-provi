import Repository from "./Repository";
import PointRepositoryInterface from "./contracts/PointRepositoryInterface";

class PointRepository extends Repository implements PointRepositoryInterface {

    constructor() {
        super("points");
    }

};

export default PointRepository;