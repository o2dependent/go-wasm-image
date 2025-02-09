import { Button } from "@radix-ui/themes";
import {
	$graphicProcesses,
	type GraphicsProcess,
} from "../../stores/imageProcess";

interface ProcessButtonProps {
	type: GraphicsProcess["type"];
}

export const ProcessButton: React.FC<ProcessButtonProps> = ({ type }) => {
	const addGraphicProcess = (type: GraphicsProcess["type"]) => {
		const process: GraphicsProcess = {
			id: crypto.randomUUID(),
			type: type,
			data: {},
		};
		const graphicProcesses = $graphicProcesses.get();
		$graphicProcesses.set([...graphicProcesses, process]);
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
