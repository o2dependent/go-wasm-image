import { atom, map } from "nanostores";

// TODO: add process types
export interface DitherProcess {
	type: "dither";
	data: number[][];
}

export interface MaskProcess {
	type: "mask";
	data: number; // maskThresh
}
export interface SortPixelsProcess {
	type: "sortPixels";
	data: number; // maskThresh
}

export type GraphicsProcess = DitherProcess | MaskProcess | SortPixelsProcess;

export const graphicProcessTypes: GraphicsProcess["type"][] = [
	"dither",
	"sortPixels",
	"mask",
];

export const $graphicProcesses = map({} as Record<string, GraphicsProcess>);
