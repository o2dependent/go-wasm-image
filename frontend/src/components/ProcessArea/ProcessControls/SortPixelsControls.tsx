import {
	Box,
	Card,
	Checkbox,
	DataList,
	Flex,
	Heading,
	Slider,
	Text,
} from "@radix-ui/themes";
import {
	$graphicProcesses,
	type SortPixelsProcess,
} from "../../../stores/imageProcess";
import { useState } from "react";
import { RemoveProcessButton } from "./RemoveProcessButton";
import { SortProcessButtons } from "./SortProcessButtons";

interface SortPixelsControlsProps {
	id: string;
	process: SortPixelsProcess;
}

export const SortPixelsControls: React.FC<SortPixelsControlsProps> = ({
	id,
	process,
}) => {
	const [maskThreshDisplay, setMaskThreshDisplay] = useState(
		process.data.maskThresh,
	);

	const commitMaskThresh = (v: number[]) => {
		const newMaskThresh = v[0];
		$graphicProcesses.setKey(id, {
			...process,
			data: { ...process.data, maskThresh: newMaskThresh },
		});
	};

	const commitInvert = (newInvert: boolean) => {
		$graphicProcesses.setKey(id, {
			...process,
			data: { ...process.data, invert: newInvert },
		});
	};

	return (
		<Card>
			<Flex direction="column">
				<Flex direction="row" align="center" justify="between">
					<Heading size="3">Sort Pixels</Heading>
					<Flex gap="2">
						<SortProcessButtons id={id} index={process.index} />
						<RemoveProcessButton id={id} />
					</Flex>
				</Flex>
				<DataList.Root>
					<DataList.Item align="center">
						<DataList.Label minWidth="88px">
							Thresh ({maskThreshDisplay})
						</DataList.Label>
						<DataList.Value>
							<Flex width="100%" align="center">
								<Slider
									defaultValue={[process.data.maskThresh]}
									min={0}
									max={255}
									step={1}
									onValueChange={(e) => setMaskThreshDisplay(e[0])}
									onValueCommit={commitMaskThresh}
								/>
							</Flex>
						</DataList.Value>
					</DataList.Item>
					<DataList.Item align="center">
						<DataList.Label minWidth="88px">Invert Mask</DataList.Label>
						<DataList.Value>
							<Flex width="100%" align="center">
								<Checkbox
									onCheckedChange={commitInvert}
									defaultChecked={process.data.invert}
								/>
							</Flex>
						</DataList.Value>
					</DataList.Item>
				</DataList.Root>
			</Flex>
		</Card>
	);
};
