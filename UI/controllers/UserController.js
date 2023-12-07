
// Imports

// Local imports
import { ControllerInterface } from '../controllers';

class UserController extends ControllerInterface {
    constructor() {
        super("users/");
        this.subdirectory = "users/";
    }

    async currentUser() {
        this.get("me")
    }

    async patchCurrentUser(password, email, is_active, is_superuser, is_verified) {
        this.patch("me", { password, email, is_active, is_superuser, is_verified });
    }

    async readUser(id) {
        this.get(id);
    }

    async deleteUser(id) {
        this.del(id);
    }

    async readSingle(id) {
        this.get(id);
    }

    async patchUser(id, password, email, is_active, is_superuser, is_verified) {
        this.patch(id, { password, email, is_active, is_superuser, is_verified });
    }
}

export default UserController;