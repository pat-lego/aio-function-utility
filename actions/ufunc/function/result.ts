export default interface Result<T = unknown> {
    /**
     * An error if any
     */
    error: string | undefined;

    /**
     * The result from the computation
     */
    result: T;
}