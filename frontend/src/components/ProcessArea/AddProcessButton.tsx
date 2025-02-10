import { Button } from "@radix-ui/themes";
import {
	$graphicProcesses,
	type GraphicsProcess,
	type MaskProcess,
	type SortPixelsProcess,
} from "../../stores/imageProcess";
import { defaultDitherColorRanges } from "./ProcessControls/ditherDefaults";

interface ProcessButtonProps {
	type: GraphicsProcess["type"];
}

export const AddProcessButton: React.FC<ProcessButtonProps> = ({ type }) => {
	const addGraphicProcess = (type: GraphicsProcess["type"]) => {
		const id = crypto.randomUUID();
		const process: Partial<GraphicsProcess> = {
			type: type,
		};
		if (type === "dither") {
			process.data = defaultDitherColorRanges["Pale Sweets"];
		} else if (type === "mask") {
			const data: MaskProcess["data"] = {
				maskThresh: 75,
				invert: false,
			};
			process.data = data;
		} else if (type === "sortPixels") {
			const data: SortPixelsProcess["data"] = {
				maskThresh: 75,
				invert: false,
			};
			process.data = data;
		}
		const graphicProcesses = $graphicProcesses.get();
		$graphicProcesses.setKey(id, process as GraphicsProcess);
	};

	return (
		<Button
			variant="soft"
			key={type}
			type="button"
			onClick={() => addGraphicProcess(type)}
		>
			{type}
		</Button>
	);
};
