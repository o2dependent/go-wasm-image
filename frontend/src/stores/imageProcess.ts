import { atom } from "nanostores";

// TODO: add process types
export interface GraphicsProcess {
	id: string;
	type: "dither" | "mask" | "sortPixels";
	data: any;
}

export const graphicProcessTypes: GraphicsProcess["type"][] = [
	"dither",
	"sortPixels",
	"mask",
];

export const $graphicProcesses = atom([] as GraphicsProcess[]);
