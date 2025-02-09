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
import { Box, Flex } from "@radix-ui/themes";

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
		<Flex
			width="100%"
			align="center"
			justify="center"
			className="relative"
			style={{
				borderRadius: "var(--radius-2)",
				overflow: "hidden",
				border: "1px dashed var(--gray-a5)",
				backgroundImage: `url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fill-opacity='0.2' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E")`,
			}}
		>
			<div
				className={`w-full flex items-center justify-center row-start-1 row-end-1 col-start-1 col-end-1 ${
					isPhoto ? "absolute top-0 left-0 opacity-50 h-full" : "h-96"
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
		</Flex>
	);
};
