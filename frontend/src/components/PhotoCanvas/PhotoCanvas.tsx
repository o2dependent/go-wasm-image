import { useEffect, useRef, useState } from "react";
import { useDropzone, type DropzoneOptions } from "react-dropzone";
import { useStore } from "@nanostores/react";
import {
	$canvas,
	$canvasHeight,
	$canvasWidth,
	$ctx,
	$isPhoto,
	$storageCanvas,
	$storageCtx,
} from "../../stores/canvas";
import { onDrop } from "./onDrop";
import { useRefStore } from "../../hooks/useRefStore";

export const PhotoCanvas = () => {
	const canvasRef = useRefStore($canvas);
	const storageCanvasRef = useRefStore($storageCanvas);

	const isPhoto = useStore($isPhoto);
	const ctx = useStore($ctx);
	const canvasWidth = useStore($canvasWidth);
	const canvasHeight = useStore($canvasHeight);
	const storageCtx = useStore($storageCtx);

	useEffect(() => {
		if (canvasRef?.current) {
			$ctx.set(canvasRef?.current?.getContext("2d")! ?? {});
		}
		if (storageCanvasRef?.current) {
			$storageCtx.set(storageCanvasRef?.current?.getContext("2d")! ?? {});
		}
	}, [canvasRef, storageCanvasRef]);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

	return (
		<div className="px-4 py-2 grid grid-cols-1 grid-rows-1 place-items-center">
			<div
				className={`flex items-center justify-center w-full rounded row-start-1 row-end-1 col-start-1 col-end-1 ${
					isPhoto
						? "opacity-50 h-full border border-dashed"
						: "h-96 outline-dashed"
				}`}
				{...getRootProps()}
			>
				<input className="" {...getInputProps({ accept: "image/*" })} />
				<p className={isPhoto ? "hidden" : ""}>
					Drag 'n' drop some files here, or click to select files
				</p>
			</div>
			<canvas className="hidden" ref={storageCanvasRef}></canvas>
			<canvas
				className={
					isPhoto ? "row-start-1 row-end-1 col-start-1 col-end-1" : "hidden"
				}
				ref={canvasRef}
			></canvas>
		</div>
	);
};
