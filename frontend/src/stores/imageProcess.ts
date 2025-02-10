import { atom, map } from "nanostores";
import type { defaultDitherColorRanges } from "../components/ProcessArea/ProcessControls/ditherDefaults";

export type DitherKeyValue = keyof typeof defaultDitherColorRanges | "Custom";

export interface DitherProcess {
	type: "dither";
	index: number;
	data: {
		colorRange: number[][];
		key: DitherKeyValue;
	};
}

export interface MaskProcess {
	type: "mask";
	index: number;
	data: {
		maskThresh: number;
		invert: boolean;
	};
}
export interface SortPixelsProcess {
	type: "sortPixels";
	index: number;
	data: {
		maskThresh: number;
		invert: boolean;
	};
}

export type GraphicsProcess = DitherProcess | MaskProcess | SortPixelsProcess;

export const graphicProcessTypes: GraphicsProcess["type"][] = [
	"dither",
	"sortPixels",
	"mask",
];

export const $graphicProcesses = map({} as Record<string, GraphicsProcess>);
