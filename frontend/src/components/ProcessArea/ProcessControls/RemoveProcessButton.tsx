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
		$graphicProcesses.setKey(id, undefined!);
	};
	return (
		<IconButton onClick={removeProcess} variant="ghost" color="red">
			<Cross1Icon />
		</IconButton>
	);
};
