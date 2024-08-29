import Function from './function';
import { Core } from '@adobe/aio-sdk';
import Result from './result';

export default class FunctionManager {
    #functions: Array<Function>;
    #logger = Core.Logger('fxmgr', {level: 'info'});

    constructor(ops?: {fx?: Array<Function>}) {
        if (ops?.fx) {
            this.#functions = ops.fx.filter((f, i) => {
                const _value = f.name()
                return i === ops.fx.findIndex(f => f.name() === _value)
            });
        } else {
            this.#functions = new Array<Function>();
        }
    }

    register(f: Function): void {
        if (typeof f === 'undefined') {
            return;
        }

        const r: Function = this.get(f.name());
        if (typeof r === 'undefined') {
            this.#logger.info(`Registered Function with name ${f.name()}`);
            this.#functions.push(f);
        }
    }

    registers(fx: Function[]): void {
        if (typeof fx === 'undefined') {
            return;
        }
        for (const f of fx) {
            this.register(f);
        }

    }

    unregister(fx: Function): void {
        if (typeof fx === 'undefined') {
            return;
        }
        this.#functions = this.#functions.filter(i => i.name() !== fx.name());
    }

    get(fn: string): Function | undefined {
        if (this.#functions.length === 0) {
            return undefined;
        } 
       return this.#functions.find(i => i.name() === fn);
    }

    num(): number {
        return this.#functions.length;
    }

    execute(operation: string, ops: {input: {[key: string]: string}}): Promise<Result> {
        if (typeof operation === 'undefined') {
            return undefined;
        }
        if (typeof this.get(operation) === 'undefined') {
            return undefined;
        }
        
        const fx = this.get(operation);

        return fx.invoke(ops.input);
    }
}