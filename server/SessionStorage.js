import crypto from 'crypto';

const KEY_LENGTH = 256;
const RELATIVE_EXPIRATION_FREQUENCY = 1 / 14;


export default class SessionStorage {
  constructor() {
    this._storage = {};
  }

  startExpirationInterval(shelfLifeMs) {
    if (this._expirationInterval) {
      this.stopExpirationInterval();
    }
    this._expirationInterval = setInterval(
      () => this.deleteExpired(shelfLifeMs),
      shelfLifeMs * RELATIVE_EXPIRATION_FREQUENCY
    );
  }

  stopExpirationInterval() {
    clearInterval(this._expirationInterval);
    this._expirationInterval = undefined;
  }

  createSession(data) {
    let key;
    do {
      key = crypto.randomBytes(KEY_LENGTH).toString('hex');
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

  deleteExpired(shelfLifeMs) {
    const bestBefore = Date.now() - shelfLifeMs;
    for (const key in this._storage) {
      if (!this._storage.hasOwnProperty(key)) {
        continue;
      }
      if (this._storage[key].accessedAt < bestBefore) {
        delete this._storage[key];
      }
    }
  }
}
