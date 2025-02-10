import { CaretDownIcon, CaretUpIcon } from "@radix-ui/react-icons";
import { Flex, IconButton } from "@radix-ui/themes";
import {
	$graphicProcesses,
	type GraphicsProcess,
} from "../../../stores/imageProcess";

interface SortProcessButtonsProps {
	id: string;
	index: number;
}

export const SortProcessButtons: React.FC<SortProcessButtonsProps> = ({
	id,
	index,
}) => {
	const changeIndex = (by: number) => {
		const graphicsProcesses = $graphicProcesses.get();
		let swapGp: GraphicsProcess | null = null;
		let swapGpKey = "";
		for (let key in graphicsProcesses) {
			const gp = graphicsProcesses[key];
			if (gp.index === index + by) {
				swapGp = gp;
				swapGpKey = key;
				break;
			}
		}
		if (!swapGp) return;
		const curGp = graphicsProcesses[id];
		$graphicProcesses.setKey(id, { ...curGp, index: index + by });
		$graphicProcesses.setKey(swapGpKey, {
			...swapGp,
			index: swapGp.index - by,
		});
	};

	return (
		<Flex gap="2">
			<IconButton onClick={() => changeIndex(-1)} variant="ghost">
				<CaretUpIcon width={20} height={20} />
			</IconButton>
			<IconButton onClick={() => changeIndex(1)} variant="ghost">
				<CaretDownIcon width={20} height={20} />
			</IconButton>
		</Flex>
	);
};
