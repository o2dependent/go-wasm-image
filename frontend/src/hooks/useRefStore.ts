import type { PreinitializedWritableAtom } from "nanostores";
import { useEffect, useRef } from "react";

export const useRefStore = <T>(store: PreinitializedWritableAtom<T>) => {
	const ref = useRef<null | T>(null);

	useEffect(() => {
		if (ref.current) store.set(ref.current);
	}, [ref]);

	return ref;
};
