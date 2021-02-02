const SessionStorage = require('../session');

const sessionStorage = new SessionStorage();

console.log(sessionStorage.getSession('non-existent key') === undefined); // should be true

const newKey = sessionStorage.createSession('important data');
console.log(sessionStorage.getSession(newKey) === 'important data'); // should be true

const anotherSessionStorage = new SessionStorage();
console.log(anotherSessionStorage.getSession(newKey) === undefined); // should be true

const oneMoreKey = sessionStorage.createSession('another data');
console.log(sessionStorage.getSession(oneMoreKey) === 'another data'); // should be true
console.log(sessionStorage.getSession(newKey) === 'important data'); // should be true