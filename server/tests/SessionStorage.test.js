import { jest } from '@jest/globals';

import SessionStorage from '../SessionStorage';

describe('SessionStorage', () => {
    const sessionStorage = new SessionStorage();
    let key;

    afterEach(() => {
        jest.restoreAllMocks();
        jest.clearAllTimers();
        sessionStorage.stopExpirationInterval();
    });

    test('should return undefined on non-existent key', () => {
        expect(sessionStorage.getSession('non-existent key')).toBeUndefined();
    });

    test('should create session and store data', () => {
        key = sessionStorage.createSession('important data');
        expect(typeof key).toBe('string');
        expect(sessionStorage.getSession(key)).toBe('important data');
    });

    test('should return undefined on key from another session storage', () => {
        const anotherSessionStorage = new SessionStorage();
        expect(anotherSessionStorage.getSession(key)).toBeUndefined();
    });

    test('should allow creation of more than one session', () => {
        const oneMoreKey = sessionStorage.createSession('another data');
        expect(typeof oneMoreKey).toBe('string');
        expect(oneMoreKey).not.toBe(key);
        expect(sessionStorage.getSession(oneMoreKey)).toBe('another data');
        expect(sessionStorage.getSession(key)).toBe('important data');
    });

    test('should create accessedAt on items in the storage', () => {
        expect(typeof sessionStorage._storage[key].accessedAt).toBe('number');
    });
    
    test('should update accessedAt on access', () => {
        jest.spyOn(Date, 'now').mockReturnValue(111222333);
        sessionStorage.getSession(key);
        expect(sessionStorage._storage[key].accessedAt).toBe(111222333);
    });

    test('.deleteExpired should delete expired sessions', () => {
        jest.spyOn(Date, 'now').mockReturnValue(1000);
        const keys1000 = [];
        for (let i = 0; i < 3; i++) {
            keys1000.push(sessionStorage.createSession('data'));
        }

        Date.now.mockReturnValue(2000);
        const keys2000 = [];
        for (let i = 0; i < 3; i++) {
            keys2000.push(sessionStorage.createSession('data'));
        }

        Date.now.mockReturnValue(2500);
        sessionStorage.deleteExpired(1000);

        for (const key of keys1000) {
            expect(sessionStorage.getSession(key)).toBeUndefined();
        }
        for (const key of keys2000) {
            expect(sessionStorage.getSession(key)).toBe('data');
        }
    });

    test('.startExpirationInterval should automatically expire items', () => {
        jest.useFakeTimers();
        const ONE_DAY_MS = 1000 * 60 * 60 * 24;

        sessionStorage.startExpirationInterval(ONE_DAY_MS * 7);

        const keys = [];
        for (let i = 0; i < 3; i++) {
            keys.push(sessionStorage.createSession('data'));
        }

        const now = Date.now();
        jest.spyOn(Date, 'now').mockReturnValue(now + ONE_DAY_MS * 3);
        const keysThreeDaysLater = [];
        for (let i = 0; i < 3; i++) {
            keysThreeDaysLater.push(sessionStorage.createSession('data'));
        }

        Date.now.mockReturnValue(now + ONE_DAY_MS * 8);
        jest.advanceTimersByTime(ONE_DAY_MS * 8);

        for (const key of keys) {
            expect(sessionStorage.getSession(key)).toBeUndefined();
        }
        for (const key of keysThreeDaysLater) {
            expect(sessionStorage.getSession(key)).toBe('data');
        }

        Date.now.mockReturnValue(now + ONE_DAY_MS * 16);
        jest.advanceTimersByTime(ONE_DAY_MS * 16);

        for (const key of keysThreeDaysLater) {
            expect(sessionStorage.getSession(key)).toBeUndefined();
        }
    });
});

