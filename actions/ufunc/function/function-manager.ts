import Function from '@fx/function';
import { Core } from '@adobe/aio-sdk';

export default class FunctionManager {
    #functions: Array<Function>;
    #logger = Core.Logger('fxmgr', {level: 'info'});

    constructor() {
        this.#functions = new Array<Function>();
    }

    register(f: Function): void {
        if (typeof f === 'undefined') {
            return;
        }

        const r: Function = this.get(f.name());
        if (typeof r === 'undefined') {
            this.#logger.info(`Registered ${f.name()}`);
            this.#functions.push(r);
        }
    }

    registers(fx: Function[]): void {
        if (typeof fx === 'undefined') {
            return;
        }
        for (const f of fx) {
            const r: Function = this.get(f.name());
            if (typeof r === 'undefined') {
                this.#logger.info(`Registered ${f.name()}`);
                this.#functions.push(r);
            }
        }

    }

    get(fn: string): Function | undefined {
        return this.#functions.find(i => i.name() === fn);
    }
}