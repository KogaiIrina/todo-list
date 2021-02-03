import SessionStorage from '../SessionStorage';
import {jest} from '@jest/globals';

jest.useFakeTimers();

describe('SessionStorage', () => {
    const sessionStorage = new SessionStorage();
    let key;

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
    test('waits 7 days before deleting session', () => {
        key = sessionStorage.createSession('important data');
        expect(typeof key).toBe('string');
        expect(sessionStorage.getSession(key)).toBe('important data');
        // expect(sessionStorage.deleteSession).toHaveBeenCalledTimes(14);
        expect(sessionStorage.deleteSession).toHaveBeenLastCalledWith(1612362826827);
        expect(sessionStorage.deleteSession).toBeUndefined();

    });
});

