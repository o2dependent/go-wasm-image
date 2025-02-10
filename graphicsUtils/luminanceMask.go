package graphicsUtils

import "github.com/o2dependent/go-wasm-image/colorUtils"

func MakeLuminanceMask(image []uint8, thresh int, width int, height int, invert bool) []uint8 {
	mask := make([]uint8, len(image))
	overThreshVal := uint8(255)
	underThreshVal := uint8(0)
	if invert {
		overThreshVal = 0
		underThreshVal = 255

	}

	for y := 0; y < height; y++ {
		for x := 0; x < width; x++ {
			imgIndex := (y * width * 4) + (x * 4)
			r := image[imgIndex]
			g := image[imgIndex+1]
			b := image[imgIndex+2]
			// a := imageData[imgIndex+3]
			value := uint8(underThreshVal)
			grayValue := colorUtils.RGBtoGrayscale(r, g, b)
			if int(grayValue) > thresh {
				value = overThreshVal
			}
			mask[imgIndex] = value
			mask[imgIndex+1] = value
			mask[imgIndex+2] = value
			mask[imgIndex+3] = 255
		}
	}

	return mask
}
