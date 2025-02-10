import {
	Box,
	Card,
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

interface SortPixelsControlsProps {
	id: string;
	process: SortPixelsProcess;
}

const DEFAULT_VALUE = 75;

export const SortPixelsControls: React.FC<SortPixelsControlsProps> = ({
	id,
	process,
}) => {
	const [maskThreshDisplay, setMaskThreshDisplay] = useState(process.data);

	const commitMaskThresh = (v: number[]) => {
		const newThreshMask = v[0];
		$graphicProcesses.setKey(id, { ...process, data: newThreshMask });
	};

	return (
		<Card>
			<Flex direction="column">
				<Flex direction="row" align="center" justify="between">
					<Heading size="3">Sort Pixels</Heading>
					<RemoveProcessButton id={id} />
				</Flex>
				<DataList.Root>
					<DataList.Item align="center">
						<DataList.Label minWidth="88px">
							Mask ({maskThreshDisplay})
						</DataList.Label>
						<DataList.Value>
							<Flex width="100%" align="center">
								<Slider
									defaultValue={[DEFAULT_VALUE]}
									min={0}
									max={255}
									step={1}
									onValueChange={(e) => setMaskThreshDisplay(e[0])}
									onValueCommit={commitMaskThresh}
								/>
							</Flex>
						</DataList.Value>
					</DataList.Item>
				</DataList.Root>
			</Flex>
		</Card>
	);
};
