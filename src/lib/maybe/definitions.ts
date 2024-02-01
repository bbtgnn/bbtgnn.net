export type Maybe<T> = T | undefined;

// TODO - unify in just one function
/**
 * R => Maybe<R>
 * Maybe<R> => Maybe<R>
 * Promise<R> => Promise<Maybe<R>>
 * Promise<Maybe<R>> => ...
 */

export function run<T, R>(maybe: Maybe<T>, fn: (value: T) => R | Maybe<R>): Maybe<R> {
	if (maybe) return fn(maybe);
	else return undefined;
}

export async function runAsync<T, R>(
	maybe: Maybe<T>,
	fn: (value: T) => Promise<R | Maybe<R>>
): Promise<Maybe<R>> {
	if (maybe) return fn(maybe);
	else return undefined;
}
