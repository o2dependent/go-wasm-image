/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare function goProcessImage(...args): Uint8ClampedArray;
declare class Go {
	importObject: WebAssembly.Imports;
	run(arg: WebAssembly.Instance): void;
}
