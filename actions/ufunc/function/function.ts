import Result from "./result";

export default interface Function<T = unknown> {
    name(): string;

    invoke(input: {[key: string]: string}): Promise<Result<T>>;
}