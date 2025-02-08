package graphicsUtils

import (
	"sort"
)

func SortPixels(image []uint8, mask []uint8, width int, height int) []uint8 {
	for y := 0; y < height; y++ {
		arr := [][4]uint8{}
		indexArr := []int{}
		for x := 0; x < width; x++ {
			imgIndex := (y * width * 4) + (x * 4)

			if mask[imgIndex] == 255 {
				pixels := [4]uint8{
					image[imgIndex],
					image[imgIndex+1],
					image[imgIndex+2],
					image[imgIndex+3],
				}
				arr = append(arr, pixels)
				indexArr = append(indexArr, x)
			}
		}
		sort.Slice(arr, func(i, j int) bool {
			return arr[i][0] > arr[j][0]
		})

		for i, x := range indexArr {
			imgIndex := (y * width * 4) + (x * 4)
			color := arr[i]
			for i := 0; i < 4; i++ {
				image[imgIndex+i] = color[i]
			}
		}
	}

	return image
}
