package colorUtils

func RGBtoGrayscale(r, g, b uint8) float64 {
	// Standard grayscale conversion using luminance formula
	gray := float64(0.299*float64(r) + 0.587*float64(g) + 0.114*float64(b))
	return gray
}
