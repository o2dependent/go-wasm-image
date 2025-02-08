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
	colorRangeJS := args[3]

	// Convert the Uint8ClampedArray to a Go slice
	length := uint8Array.Length()
	imageData := make([]uint8, length)
	js.CopyBytesToGo(imageData, uint8Array)

	colorRangeLength := colorRangeJS.Length()
	colorRangeFull := make([]uint8, colorRangeLength)
	js.CopyBytesToGo(colorRangeFull, colorRangeJS)

	colorRange := [][]uint8{}
	for i := 0; i < len(colorRangeFull)/3; i++ {
		colors := []uint8{}
		for j := 0; j < 3; j++ {
			colors = append(colors, colorRangeFull[(i*3)+j])
		}
		colorRange = append(colorRange, colors)
	}

	// Handle pixels
	// colorRange := [][]int{
	// 	{155, 86, 116},
	// 	{203, 179, 255},
	// 	{216, 191, 216},
	// 	{174, 255, 247},
	// 	{199, 251, 150},
	// }
	// colorRange := [][]int{
	// 	{5, 31, 57},
	// 	{74, 36, 128},
	// 	{197, 58, 157},
	// 	{255, 142, 128},
	// 	{255, 255, 255},
	// }
	// colorRange := [][]int{
	// 	{13, 16, 27},
	// 	{40, 26, 45},
	// 	{107, 35, 65},
	// 	{175, 39, 71},
	// 	{238, 36, 61},
	// }
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

func ditherImage(imageData []uint8, colorRange [][]uint8, width int, height int) []uint8 {
	bayerMatrix4x4 := [][]uint8{
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

			bayerValue := bayerMatrix4x4[x%bayerN][y%bayerN] / uint8(bayerN^2)
			outputColor := (grayValue) + (float64(bayerR) * float64(bayerValue))
			outputIndex := min(
				len(colorRange)-1,
				int(math.Floor(outputColor/255*(float64(len(colorRange)-1)))),
			)
			colorResult = colorRange[outputIndex]
			imageData[imgDataIdx] = colorResult[0]
			imageData[imgDataIdx+1] = colorResult[1]
			imageData[imgDataIdx+2] = colorResult[2]
			// imageData[imgDataIdx+3] = 0
		}
	}

	return imageData
}
