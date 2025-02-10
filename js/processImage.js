import { colorRange } from "./colorRange.js";
import { canvas, ctx, imgHeight, imgWidth, storageCanvasCtx } from "./index.js";
import { sortPixelThresh } from "./sortPixel.js";

const processImage = () => {
	const imageData = storageCanvasCtx.getImageData(
		0,
		0,
		canvas.width,
		canvas.height,
	);
	const pixels = imageData.data;

	const width = canvas.width;
	const height = canvas.height;

	// const data = goProcessImage(pixels, imgWidth, imgHeight, "dither", new Uint8Array(colorRange.flat()));
	const data = goProcessImage(
		pixels,
		imgWidth,
		imgHeight,
		"sortPixels",
		sortPixelThresh,
	);
	const newImageData = new ImageData(data, width, height);
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.putImageData(newImageData, 0, 0);
};
const processImageButton = document.querySelector("button#process-button");
processImageButton.addEventListener("click", processImage);
