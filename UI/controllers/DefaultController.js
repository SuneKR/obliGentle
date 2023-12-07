
// Imports

// Local imports
import { ControllerInterface } from '.';

class DefaultController extends ControllerInterface {
    constructor() {
        super();
        this.subdirectory = "";
    }

    async root() {
        this.get("");
    }

    async authticatedRoute() {
        this.get("authticated-route");
    }

    async status() {
        this.get("status");
    }
}

export default DefaultController;