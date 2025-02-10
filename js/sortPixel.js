const sortPixelThreshContainer = document.getElementById(
	"sort-pixel-thresh-container",
);
const sortPixelThreshRange =
	sortPixelThreshContainer.querySelector(`input[type="range"]`);
const sortPixelThreshDisplay =
	sortPixelThreshContainer.querySelector(`.display`);
export let sortPixelThresh = parseInt(sortPixelThreshRange.value);
sortPixelThreshRange.addEventListener("input", (e) => {
	sortPixelThresh = parseInt(e.target.value);
	sortPixelThreshDisplay.innerHTML = sortPixelThresh;
});
