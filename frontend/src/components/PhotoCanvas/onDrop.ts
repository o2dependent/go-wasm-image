import { useDropzone, type DropzoneOptions } from "react-dropzone";
import {
	$canvas,
	$canvasHeight,
	$canvasWidth,
	$ctx,
	$imgHeight,
	$imgWidth,
	$isPhoto,
	$storageCanvas,
	$storageCtx,
} from "../../stores/canvas";

export const onDrop: DropzoneOptions["onDrop"] = (
	acceptedFiles,
	fileRejections,
	event,
) => {
	const file = acceptedFiles[0];
	if (!file.type.startsWith("image/")) {
		alert("Please select an image file");
		return;
	}

	const reader = new FileReader();
	reader.onload = function (event) {
		const img = new Image();
		img.onload = function () {
			// Set canvas dimensions to match image (with scaling if needed)
			const maxWidth = 800;
			const maxHeight = 600;

			let width = img.width;
			let height = img.height;

			// Scale image if needed
			if (width > maxWidth || height > maxHeight) {
				const ratio = Math.min(maxWidth / width, maxHeight / height);
				width *= ratio;
				height *= ratio;
			}

			$imgWidth.set(width);
			$imgHeight.set(height);
			$canvasWidth.set(width);
			$canvasHeight.set(height);
			const canvas = $canvas.get();
			const storageCanvas = $storageCanvas.get();
			canvas.width = width;
			canvas.height = height;
			storageCanvas.width = width;
			storageCanvas.height = height;
			console.log(canvas, storageCanvas);
			console.log($ctx.get(), $storageCtx.get());
			$ctx.get().drawImage(img, 0, 0, width, height);
			$storageCtx.get().drawImage(img, 0, 0, width, height);
			$isPhoto.set(true);
		};
		img.src = event.target?.result as string;
	};
	reader.readAsDataURL(file);
};
