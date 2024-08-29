import FunctionManager from "./function/function-manager";
import Name from "./function/operations/name";

export default class Initializer {
    static #fxMgr: FunctionManager;

    static initFxMgr(): FunctionManager {
        if (typeof this.#fxMgr !== 'undefined') {
            return this.#fxMgr;
        }

        this.#fxMgr = new FunctionManager({fx: [
            new Name()
        ]});
    }
}