import { IconButton } from "@radix-ui/themes";
import { $graphicProcesses } from "../../../stores/imageProcess";
import { Cross1Icon } from "@radix-ui/react-icons";

interface RemoveProcessButtonProps {
	id: string;
}

export const RemoveProcessButton: React.FC<RemoveProcessButtonProps> = ({
	id,
}) => {
	const removeProcess = () => {
		const graphicProcesses = $graphicProcesses.get();
		const index = graphicProcesses[id].index;
		for (let key in graphicProcesses) {
			const gp = graphicProcesses[key];
			if (key === id) continue;
			if (gp.index > index) {
				gp.index -= 1;
			}
		}
		$graphicProcesses.set(graphicProcesses);
		$graphicProcesses.setKey(id, undefined!);
	};
	return (
		<IconButton onClick={removeProcess} variant="ghost" color="red">
			<Cross1Icon />
		</IconButton>
	);
};
