import crypto from 'crypto';

export default class SessionStorage {
    constructor() {
        this._storage = {};
    }

    createSession(data) {
        let key;
        do {
            key = crypto.randomBytes(256).toString('hex');
        } while (key in this._storage);

        this._storage[key] = { data, accessedAt: Date.now() };
        return key;
    }

    getSession(key) {
        const session = this._storage[key];
        if (session) {  
          session.accessedAt = Date.now();
          return session.data;
        }
    }
}
