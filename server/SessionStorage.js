import crypto from 'crypto';

export default class SessionStorage {
    constructor() {
        this.storage = {};
    }

    createSession(data) {
        let key;
        do {
            key = crypto.randomBytes(256).toString('hex');
        } while (key in this.storage);

        this.storage[key] = data;

        return key;
    }

    getSession(key) {
        return this.storage[key];
    }
}
