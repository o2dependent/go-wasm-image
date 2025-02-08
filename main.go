package main

import (
	"syscall/js"

	"github.com/o2dependent/go-wasm-image/graphicsUtils"
)

func processImage(this js.Value, args []js.Value) interface{} {
	// Get the Uint8ClampedArray from JavaScript
	uint8Array := args[0]
	width := args[1].Int()
	height := args[2].Int()

	// Convert the Uint8ClampedArray to a Go slice
	length := uint8Array.Length()
	imageData := make([]uint8, length)
	js.CopyBytesToGo(imageData, uint8Array)

	// Handle graphics processing
	processLen := len(args) - 3
	for i := 0; i < processLen; i++ {
		// Process via name
		// inc i if you are using additional args
		name := args[3+i].String()
		if name == "dither" {
			imageData = graphicsUtils.DitherImage(imageData, width, height, args[3+i+1])
			i += 1
		} else if name == "mask" {
			maskThresh := args[3+i+1].Int()
			imageData = graphicsUtils.MakeLuminanceMask(imageData, maskThresh, width, height)
			i += 1
		} else if name == "sortPixels" {
			maskThresh := args[3+i+1].Int()
			mask := graphicsUtils.MakeLuminanceMask(imageData, maskThresh, width, height)
			imageData = graphicsUtils.SortPixels(imageData, mask, width, height)
			i += 1
		}
	}

	// Get image ready for JS
	array := js.Global().Get("Uint8ClampedArray").New(length)
	for i, p := range imageData {
		array.SetIndex(i, p)
	}

	// Return a response (optional)
	return array
}

func main() {
	// Expose the Go function to JavaScript
	js.Global().Set("goProcessImage", js.FuncOf(processImage))

	// Keep the Go program running
	select {}
}
