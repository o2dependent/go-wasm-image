import {
	$canvas,
	$ctx,
	$storageCanvas,
	$storageCtx,
} from "../../stores/canvas";
import { $graphicProcesses } from "../../stores/imageProcess";

export const processImage = () => {
	const graphicsProcesses = $graphicProcesses.get();
	let data = [] as any[];
	for (let key in graphicsProcesses) {
		const process = graphicsProcesses[key];

		data.push(process.type);

		if (process.type === "dither") {
			data.push(new Uint8Array(process.data.flat()));
		} else if (process.type === "mask") {
			data.push(process.data.maskThresh);
			data.push(process.data.invert);
		} else if (process.type === "sortPixels") {
			data.push(process.data.maskThresh);
			data.push(process.data.invert);
		}
	}

	const ctx = $ctx.get();
	const canvas = $canvas.get();
	const storageCanvas = $storageCanvas.get();
	const storageCtx = $storageCtx.get();

	const imageData = storageCtx.getImageData(
		0,
		0,
		storageCanvas.width,
		storageCanvas.height,
	);
	const pixels = imageData.data;
	const width = canvas.width;
	const height = canvas.height;

	const processedData = goProcessImage(pixels, width, height, ...data);

	const newImageData = new ImageData(processedData, width, height);
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.putImageData(newImageData, 0, 0);
};
