package main

import (
	"syscall/js"
	"time"
)

const (
	width  = 150
	height = 150
)

var (
	currentGrid [width][height]uint8
	nextGrid    [width][height]uint8
	running     bool
	updateSpeed = 50 * time.Millisecond
)

func processImage(this js.Value, args []js.Value) interface{} {
	// Get the Uint8ClampedArray from JavaScript
	uint8Array := args[0]

	// Convert the Uint8ClampedArray to a Go slice
	length := uint8Array.Length()
	imageData := make([]uint8, length)
	js.CopyBytesToGo(imageData, uint8Array)

	// Process the image data (example: log the first 10 pixels)
	for i := 0; i < length; i += 4 {
		// r := imageData[i]
		// g := imageData[i+1]
		// b := imageData[i+2]
		// a := imageData[i+3]
		if i%10 == 0 {
			imageData[i] = 0
			imageData[i+1] = 0
			imageData[i+2] = 0
			// imageData[i+3] = 0
		}
	}

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
