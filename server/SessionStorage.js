import crypto from 'crypto';

// export default class SessionStorage {
//     constructor() {
//         this.storage = {};
//     }

//     createSession(data) {
//         let key;
//         do {
//             key = crypto.randomBytes(256).toString('hex');
//         } while (key in this.storage);

//         this.storage[key] = data;

//         return key;
//     }

//     getSession(key) {
//         return this.storage[key];
//     }
// }


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

        this.storage[key] = { data, date };
        return key;
    }

    getSession(key) {
        return this.storage[key].data;
    }

    deleteSession() {
        let newDate = +new Date();
        setInterval(() => {
            let difInTime = newDate - (1000 * 60 *1440 * 7);
            if (this.storage[key].date >= difInTime) {
                delete this.storage[key];
            }
            return this.storage[key].date;
        }, 43200000);
    }
}
