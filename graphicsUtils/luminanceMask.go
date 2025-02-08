package graphicsUtils

import "github.com/o2dependent/go-wasm-image/colorUtils"

func MakeLuminanceMask(image []uint8, thresh int, width int, height int) []uint8 {
	mask := make([]uint8, len(image))

	for y := 0; y < height; y++ {
		for x := 0; x < width; x++ {
			imgIndex := (y * width * 4) + (x * 4)
			r := image[imgIndex]
			g := image[imgIndex+1]
			b := image[imgIndex+2]
			// a := imageData[imgIndex+3]
			value := uint8(0)
			grayValue := colorUtils.RGBtoGrayscale(r, g, b)
			if int(grayValue) > thresh {
				value = 255
			}
			mask[imgIndex] = value
			mask[imgIndex+1] = value
			mask[imgIndex+2] = value
			mask[imgIndex+3] = 255
		}
	}

	return mask
}
