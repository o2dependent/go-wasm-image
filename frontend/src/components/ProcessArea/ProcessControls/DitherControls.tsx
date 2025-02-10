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
	type DitherProcess,
} from "../../../stores/imageProcess";
import { useState } from "react";
import { defaultDitherColorRanges } from "./ditherDefaults";
import { RemoveProcessButton } from "./RemoveProcessButton";

interface DitherControlsProps {
	id: string;
	process: DitherProcess;
}

type KeyValue = keyof typeof defaultDitherColorRanges | "Custom";

const DEFAULT_VALUE = "Pale Sweets" as KeyValue;

export const DitherControls: React.FC<DitherControlsProps> = ({
	id,
	process,
}) => {
	const [colorRangeKey, setColorRangeKey] = useState(DEFAULT_VALUE);

	const commitColorRange = (key: KeyValue) => {
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
		$graphicProcesses.setKey(id, { ...process, data: newColorRange });
	};

	return (
		<Card>
			<Flex direction="column">
				<Flex direction="row" align="center" justify="between">
					<Heading size="3">Dither</Heading>
					<RemoveProcessButton id={id} />
				</Flex>
				<DataList.Root>
					<DataList.Item align="center">
						<DataList.Label minWidth="88px">Colors</DataList.Label>
						<DataList.Value>
							<Select.Root
								onValueChange={commitColorRange}
								value={colorRangeKey}
								defaultValue={"Pale Sweets"}
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
