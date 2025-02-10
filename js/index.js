import "./processImage.js";

export const canvas = document.getElementById("previewCanvas");
export const storageCanvas = document.getElementById("storageCanvas");
export const ctx = canvas.getContext("2d");
export const storageCanvasCtx = storageCanvas.getContext("2d");
export const fileInput = document.getElementById("fileInput");
export const dropZone = document.getElementById("dropZone");
export let imgWidth = 0;
export let imgHeight = 0;

// Handle file selection
fileInput.addEventListener("change", function (e) {
	handleImage(e.target.files[0]);
});

// Prevent default drag behaviors
["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
	dropZone.addEventListener(eventName, preventDefaults, false);
	document.body.addEventListener(eventName, preventDefaults, false);
});

// Highlight drop zone when item is dragged over it
["dragenter", "dragover"].forEach((eventName) => {
	dropZone.addEventListener(eventName, highlight, false);
});

["dragleave", "drop"].forEach((eventName) => {
	dropZone.addEventListener(eventName, unhighlight, false);
});

// Handle dropped files
dropZone.addEventListener("drop", handleDrop, false);

function preventDefaults(e) {
	e.preventDefault();
	e.stopPropagation();
}

function highlight(e) {
	dropZone.classList.add("dragover");
}

function unhighlight(e) {
	dropZone.classList.remove("dragover");
}

function handleDrop(e) {
	const dt = e.dataTransfer;
	const files = dt.files;
	handleImage(files[0]);
}

function handleImage(file) {
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

			imgWidth = width;
			imgHeight = height;
			canvas.width = width;
			canvas.height = height;
			storageCanvas.width = width;
			storageCanvas.height = height;

			ctx.drawImage(img, 0, 0, width, height);
			storageCanvasCtx.drawImage(img, 0, 0, width, height);
		};
		img.src = event.target.result;
	};
	reader.readAsDataURL(file);
}

// Initialize WASM
const go = new Go();
WebAssembly.instantiateStreaming(fetch("main.wasm"), go.importObject)
	.then((result) => {
		go.run(result.instance);
	})
	.catch((err) => console.error(err));
