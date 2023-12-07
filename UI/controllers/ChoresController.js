
// Imports

// Local imports
import { ControllerInterface } from '../controllers';

class ChoreController extends ControllerInterface {
    constructor() {
        super();
        this.subdirectory = "chores/";
    }

    async create(name, description, priority, interval) {
        this.post("", { name, description, priority, interval });
    }

    async readMultiple() {
        this.get();
    }

    async readSingle(id) {
        this.get(id);
    }

    async updateSingle(id, name, description, priority, interval) {
        this.put(id, { name, description, priority, interval });
    }

    async deleteSignle(id) {
        this.del(id);
    }
}

export default ChoreController;