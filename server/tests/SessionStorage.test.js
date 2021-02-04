import { jest } from '@jest/globals';

import SessionStorage from '../SessionStorage';

describe('SessionStorage', () => {
    const sessionStorage = new SessionStorage();
    let key;

    afterEach(() => {
        jest.resetAllMocks();
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
});

