import { atom } from "nanostores";

export const $ctx = atom({} as CanvasRenderingContext2D);
export const $storageCtx = atom({} as CanvasRenderingContext2D);
export const $canvasWidth = atom(0);
export const $canvasHeight = atom(0);
export const $imgWidth = atom(0);
export const $imgHeight = atom(0);
export const $isPhoto = atom(false);
export const $canvas = atom({} as HTMLCanvasElement);
export const $storageCanvas = atom({} as HTMLCanvasElement);
