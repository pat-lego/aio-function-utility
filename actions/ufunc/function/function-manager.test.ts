import { beforeAll, beforeEach, describe, test, expect } from '@jest/globals';
import FunctionManager from './function-manager';
import Function from './function';
import Result from './result';

let fxMgr: FunctionManager;
let f1: Function;
let f2: Function;
let f3: Function;

beforeEach(() => {
    fxMgr = new FunctionManager();

    f1 = {
        name() {
            return "F1";
        },
        invoke(input) {
            return Promise.resolve(<Result<string>>{
                error: undefined,
                result: 'Hello'
            })
        },
    }

    f2 = {
        name() {
            return "F1";
        },
        invoke(input) {
            return Promise.resolve(<Result<string>>{
                error: undefined,
                result: 'Hello'
            })
        },
    }

    f3 = {
        name() {
            return "F3";
        },
        invoke(input) {
            return Promise.resolve(<Result<string>>{
                error: undefined,
                result: 'Hello'
            })
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

    test('push same function in function manager via constructor', () => {
        const fx: Function[] = [f1, f2];
        const fxMgr2: FunctionManager = new FunctionManager({fx: fx});
        expect(fxMgr2.num()).toBe(1);
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

describe('invoke function from operation', () => {
    test('invoke fx with operation', async () => {
        fxMgr.register(f1);
        expect(fxMgr.num()).toBe(1);

        const result = await fxMgr.execute(f1.name(), {input: {'name': 'Pat'}});
        expect(result.result).toBe('Hello');
    })

    test('invoke fx with operation that does not exist', async () => {
        fxMgr.register(f1);
        expect(fxMgr.num()).toBe(1);

        const result = await fxMgr.execute(f3.name(), {input: {'name': 'Pat'}});
        expect(result).toBe(undefined);
    })
})