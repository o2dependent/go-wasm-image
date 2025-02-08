package graphicsUtils

import (
	"math"
	"syscall/js"

	"github.com/o2dependent/go-wasm-image/colorUtils"
)

func DitherImage(imageData []uint8, width int, height int, arg js.Value) []uint8 {
	colorRangeJS := arg
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
			colorResult := colorRange[outputIndex]
			imageData[imgDataIdx] = colorResult[0]
			imageData[imgDataIdx+1] = colorResult[1]
			imageData[imgDataIdx+2] = colorResult[2]
			// imageData[imgDataIdx+3] = 0
		}
	}

	return imageData
}
