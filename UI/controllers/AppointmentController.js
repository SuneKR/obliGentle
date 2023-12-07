
// Imports

// Local imports
import { ControllerInterface } from '.';

class AppointmentController extends ControllerInterface {
    constructor() {
        super();
        this.subdirectory = "chores/";
    }

    async create(name, description, dueDate, isActive) {
        this.post("", { name, description, dueDate, isActive });
    }

    async readMultiple() {
        this.get();
    }

    async readSingle(id) {
        this.get(id);
    }

    async updateSingle(id, name, description, dueDate, isActive) {
        this.put(id, { name, description, dueDate, isActive });
    }

    async deleteSignle(id) {
        this.del(id);
    }
}

export default AppointmentController;