
// Imports

// Local imports
import { ControllerInterface } from '.';

class AuthController extends ControllerInterface {
    constructor() {
        super();
        this.subdirectory = "auth/";
    }

    login = async (username, password) =>{
        this.post("jwt/login/", { username, password });
    };

    async logout() {
        this.post("jwt/logout/");
    }

    async register(username, password) {
        this.post("register/", { username, password });
    }

    async forgotPassword(email) {
        this.post("forgot-password/", email);
    }

    async resetPassword(token, email) {
        this.post("reset-password/", { token, email });
    }

    async requestToken(email) {
        this.post("request-verify-token/", email);
    }

    async verifyToken(token) {
        this.post("verify/", token);
    }
}

export default AuthController;