import { beforeAll, beforeEach, describe, test, expect } from '@jest/globals';
import FunctionManager from './function-manager';
import Function from './function';
import Result from './result';

let fxMgr;
let f1;
let f2;
let f3;

beforeEach(() => {
    fxMgr = new FunctionManager();

    f1 = {
        name() {
            return "F1";
        },
        invoke(input) {
            return <Result<string>> {
                error: undefined,
                result: 'Hello'
            }
        },
    }

    f2 = {
        name() {
            return "F1";
        },
        invoke(input) {
            return <Result<string>> {
                error: undefined,
                result: 'Hello'
            }
        },
    }

    f3 = {
        name() {
            return "F3";
        },
        invoke(input) {
            return <Result<string>> {
                error: undefined,
                result: 'Hello'
            }
        },
    }
})

describe('validate only a unique function is added to function manager', () => {
    test('push function in function manager', () => {
        fxMgr.register(f1);
        expect(fxMgr.num()).toBe(1);
    })

    test('push same function in function manager', () => {
        fxMgr.register(f1);
        fxMgr.register(f2);
        expect(fxMgr.num()).toBe(1);
    })

    test('push different functions in function manager', () => {
        fxMgr.register(f1);
        fxMgr.register(f3);
        expect(fxMgr.num()).toBe(2);
    })

}) 

describe('validate removing a function from function manager', () => {
    test('push function in function manager', () => {
        fxMgr.register(f1);
        expect(fxMgr.num()).toBe(1);
    })

    test('push different functions in function manager', () => {
        fxMgr.register(f1);
        fxMgr.register(f3);
        expect(fxMgr.num()).toBe(2);

        fxMgr.unregister(f1);
        expect(fxMgr.num()).toBe(1);
    })

}) 