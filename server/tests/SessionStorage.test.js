import SessionStorage from '../SessionStorage';

describe('SessionStorage', () => {
    const sessionStorage = new SessionStorage();
    let key;

    // test('should return undefined on non-existent key', () => {
    //     expect(sessionStorage.getSession('non-existent key')).toBeUndefined();
    // });

    // test('should create session and store data', () => {
    //     key = sessionStorage.createSession('important data');
    //     expect(typeof key).toBe('string');
    //     expect(sessionStorage.getSession(key)).toBe('important data');
    // });

    // test('should return undefined on key from another session storage', () => {
    //     const anotherSessionStorage = new SessionStorage();
    //     expect(anotherSessionStorage.getSession(key)).toBeUndefined();
    // });

    // test('should allow creation of more than one session', () => {
    //     const oneMoreKey = sessionStorage.createSession('another data');
    //     expect(typeof oneMoreKey).toBe('string');
    //     expect(oneMoreKey).not.toBe(key);
    //     expect(sessionStorage.getSession(oneMoreKey)).toBe('another data');
    //     expect(sessionStorage.getSession(key)).toBe('important data');
    // });
    jest.useFakeTimers();
    test('waits 7 days before deleting session', () => {
        key = sessionStorage.createSession('important data');
        expect(typeof key).toBe('string');
        expect(sessionStorage.getSession(key)).toBe('important data');
        expect(sessionStorage.deleteSession).toHaveBeenCalledTimes(1);
        expect(sessionStorage.deleteSession).toHaveBeenLastCalledWith(expect.any(Function), 1612897034346
        );
        expect(sessionStorage.deleteSession).toBeUndefined();

    });
});

