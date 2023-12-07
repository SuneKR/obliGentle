
// Imports

// Local imports
import { ControllerInterface } from '../controllers';

class TaskController extends ControllerInterface {
    constructor() {
        super();
        this.subdirectory = "tasks/";
    }

    async create(name, description) {
        this.post("", { name, description });
    }

    async readMultiple() {
        this.get();
    }

    async readSingle(id) {
        this.get(id);
    }

    async updateSingle(id, name, description) {
        this.put(id, { name, description });
    }

    async deleteSignle(id) {
        this.del(id);
    }
}

export default TaskController;