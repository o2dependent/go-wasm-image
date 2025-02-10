const colorRangeListContainer = document.getElementById("colorRangeList");
const defaultColorRanges = {
	"Pale Sweets": [
		[155, 86, 116],
		[203, 179, 255],
		[216, 191, 216],
		[174, 255, 247],
		[199, 251, 150],
	],

	"Pink Candy": [
		[5, 31, 57],
		[74, 36, 128],
		[197, 58, 157],
		[255, 142, 128],
		[255, 255, 255],
	],

	"Sunset Red": [
		[13, 16, 27],
		[40, 26, 45],
		[107, 35, 65],
		[175, 39, 71],
		[238, 36, 61],
	],

	"RGB Pixels": [
		[0, 0, 0],
		[0, 0, 255],
		[0, 255, 0],
		[255, 0, 0],
		[255, 255, 255],
	],
};

export let colorRange = defaultColorRanges["Sunset Red"];

const makeColorRangeButton = (colors, name) => {
	return `<button data-name="${name}" class="px-2 py-1 border border-black border-purple-500" onclick="setColorRange('${name}')">${name}</button>`;
};
let colorRangeHtml = "";
for (let name in defaultColorRanges) {
	const colors = defaultColorRanges[name];
	colorRangeHtml += makeColorRangeButton(colors, name);
}
colorRangeListContainer.innerHTML = colorRangeHtml;

export const setColorRange = (name) => {
	if (!(name in defaultColorRanges)) return;
	const active = colorRangeListContainer.querySelector("button[data-active]");
	if (active) {
		active.removeAttribute("data-active");
		active.classList.remove("bg-blue-500", "text-white");
	}
	colorRange = defaultColorRanges[name];
	const newActive = colorRangeListContainer.querySelector(
		`button[data-name="${name}"]`,
	);
	newActive.toggleAttribute("data-active");
	newActive.classList.add("bg-blue-500", "text-white");
};

setColorRange("Sunset Red");
