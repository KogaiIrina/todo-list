const crypto = require('crypto');

class SessionStorage {
    constructor() {
    }

    createSession(data) {
        if(!data) {
            return;
        } else {
        this.data = data;
        this.key = crypto.randomBytes(256).toString('hex');
        this.user =   (this.data, this.key);
        return sessionStorage.User.data, sessionStorage.User.key;
        }
    }

    getSession(key) {
        if (key === this.key) {
            return sessionStorage.User.data;
        } else {
            return;
        }
    }
}

module.exports = SessionStorage;