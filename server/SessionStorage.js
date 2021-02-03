import crypto from 'crypto';

export default class SessionStorage {
    constructor() {
        this.storage = {};
    }

    createSession(data) {
        let key;
        let date = +new Date();
        do {
            key = crypto.randomBytes(256).toString('hex');
        } while (key in this.storage);

        this.storage[key] = { 
            data
        };
        this.storage[key].date = date;
        return key;
    }


    getSession(key) {
        if (this.storage[key] != undefined) {
          return this.storage[key].data;
        }
    }

    deleteSession(key) {

        let newDate = +new Date();
        let date = this.storage[key].date;
        let difInTime = newDate - (1000 * 60 *1440 * 7);
            if (date >= difInTime) {
                delete this.storage[key];
                console.log('empty');
            } else {
                return this.storage[key].date;
            }
    }
}

// const spyFunc = setInterval(SessionStorage.deleteSession(1612362826827), 1000 );

// 43200000
const h = new SessionStorage();
let w = h.createSession('ssds');
console.log(w);
let b = h.getSession(w);
console.log(b);
let d = h.deleteSession(w);
console.log(d);

