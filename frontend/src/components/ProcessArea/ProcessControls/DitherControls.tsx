import {
	Card,
	DataList,
	Flex,
	Heading,
	IconButton,
	Select,
} from "@radix-ui/themes";
import {
	$graphicProcesses,
	type DitherKeyValue,
	type DitherProcess,
} from "../../../stores/imageProcess";
import { useState } from "react";
import { defaultDitherColorRanges } from "./ditherDefaults";
import { RemoveProcessButton } from "./RemoveProcessButton";
import { SortProcessButtons } from "./SortProcessButtons";

interface DitherControlsProps {
	id: string;
	process: DitherProcess;
}

export const DitherControls: React.FC<DitherControlsProps> = ({
	id,
	process,
}) => {
	const [colorRangeKey, setColorRangeKey] = useState(process.data.key);

	const commitColorRange = (key: DitherKeyValue) => {
		let newColorRange: number[][];
		if (key in defaultDitherColorRanges) {
			newColorRange =
				defaultDitherColorRanges[key as keyof typeof defaultDitherColorRanges];
		} else if (key === "Custom") {
			newColorRange = [
				[255, 0, 0],
				[255, 0, 255],
				[255, 255, 255],
			];
		} else return;

		setColorRangeKey(key);
		$graphicProcesses.setKey(id, {
			...process,
			data: { colorRange: newColorRange, key },
		});
	};

	return (
		<Card>
			<Flex direction="column">
				<Flex direction="row" align="center" justify="between">
					<Heading size="3">Dither</Heading>
					<Flex gap="2">
						<SortProcessButtons id={id} index={process.index} />
						<RemoveProcessButton id={id} />
					</Flex>
				</Flex>
				<DataList.Root>
					<DataList.Item align="center">
						<DataList.Label minWidth="88px">Colors</DataList.Label>
						<DataList.Value>
							<Select.Root
								onValueChange={commitColorRange}
								value={colorRangeKey}
								defaultValue={process.data.key}
							>
								<Select.Trigger />
								<Select.Content>
									{Object.keys(defaultDitherColorRanges).map((key) => (
										<Select.Item key={key} value={key}>
											{key}
										</Select.Item>
									))}
									<Select.Item value="Custom">Custom</Select.Item>
								</Select.Content>
							</Select.Root>
						</DataList.Value>
					</DataList.Item>
				</DataList.Root>
			</Flex>
		</Card>
	);
};
