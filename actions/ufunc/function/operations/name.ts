import Function from "@fx/function";
import Result from "@fx/result";

export default class Name implements Function<String> {

    #name: string = "name";

    name(): string {
        return this.#name;
    }
    invoke(input: {[key: string]: string}): Result<String> {
        if(input[this.#name]) {
            return {
                error: undefined,
                result: `Hello ${input[this.#name]}`,
            }
        }
    }


}