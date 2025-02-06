package main

import (
	"math"
	"syscall/js"

	"github.com/o2dependent/go-wasm-image/colorUtils"
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

	// Handle pixels
	colorRange := [][]int{
		{155, 86, 116},
		{203, 179, 255},
		{216, 191, 216},
		{199, 251, 150},
		{174, 255, 247},
	}
	imageData = ditherImage(imageData, colorRange, width, height)

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

func ditherImage(imageData []uint8, colorRange [][]int, width int, height int) []uint8 {
	bayerMatrix4x4 := [][]int{
		{0, 8, 2, 10},
		{12, 4, 14, 6},
		{3, 11, 1, 9},
		{15, 7, 13, 5},
	}
	bayerN := 4
	bayerR := 75

	for y := 0; y < height; y++ {
		for x := 0; x < width; x++ {
			colorResult := colorRange[len(colorRange)-1]

			imgDataIdx := (y * width * 4) + (x * 4)
			r := imageData[imgDataIdx]
			g := imageData[imgDataIdx+1]
			b := imageData[imgDataIdx+2]
			// a := imageData[imgDataIdx+3]
			grayValue := colorUtils.RGBtoGrayscale(r, g, b)

			bayerValue := bayerMatrix4x4[y%bayerN][x%bayerN] / (bayerN ^ 2)
			outputColor := (grayValue) + (uint8(bayerR) * uint8(bayerValue))
			outputIndex := min(
				len(colorRange)-1,
				int(math.Floor(float64(outputColor)/255*(float64(len(colorRange)-1)))),
			)
			colorResult = colorRange[outputIndex]
			imageData[imgDataIdx] = uint8(colorResult[0])
			imageData[imgDataIdx+1] = uint8(colorResult[1])
			imageData[imgDataIdx+2] = uint8(colorResult[2])
			// imageData[imgDataIdx+3] = 0
		}
	}

	return imageData
}
