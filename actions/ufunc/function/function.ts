import Result from "@fx/result";

export default interface Function<T = unknown> {
    name(): string;
    invoke(input: {[key: string]: string}): Result<T>;
    
}