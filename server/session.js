const crypto = require('crypto');

class sessionStorage {
    constructor (data, key) {
        this.data = data;
        this.key = key;
    }

    createSession(data) {
        if(!data) {
            return;
        } else {
        this.data = data;
        this.key = crypto.randomBytes(256).toString('hex');
        sessionStorage.User = new sessionStorage(this.data, this.key);
        // return this.data, this.key;
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





const SessionStorage = new sessionStorage();

console.log(SessionStorage.getSession('non-existent key') === undefined); // should be true

const newKey = SessionStorage.createSession('important data');
console.log(SessionStorage.getSession(newKey) === 'important data'); // should be true

const anotherSessionStorage = new sessionStorage();
console.log(anotherSessionStorage.getSession(newKey) === undefined); // should be true

const oneMoreKey = SessionStorage.createSession('another data');
console.log(SessionStorage.getSession(oneMoreKey) === 'another data'); // should be true
console.log(SessionStorage.getSession(newKey) === 'important data'); // should be true