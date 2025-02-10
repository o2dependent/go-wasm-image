import { useStore } from "@nanostores/react";
import React from "react";
import {
	$graphicProcesses,
	graphicProcessTypes,
	type GraphicsProcess,
} from "../../stores/imageProcess";
import { ProcessButton } from "./ProcessButton";
import { Card, Flex, Grid, Heading } from "@radix-ui/themes";
import { DitherControls } from "./ProcessControls/DitherControls";
import { MaskControls } from "./ProcessControls/MaskControls";
import { SortPixelsControls } from "./ProcessControls/SortPixelsControls";

export const ProcessArea = () => {
	const graphicProcesses = useStore($graphicProcesses);

	return (
		<Flex width={{ initial: "100%", md: "600px" }} gap="2" direction="column">
			<Heading size="6">Graphics Processes</Heading>
			<Card>
				<Heading size="3" mb="2">
					Add Process
				</Heading>
				<Grid gap="1" columns="2">
					{graphicProcessTypes?.map((type) => (
						<ProcessButton key={type} type={type} />
					))}
				</Grid>
			</Card>
			<Flex gap="1" direction="column">
				{Object.keys(graphicProcesses)?.map((id) => {
					const gp = graphicProcesses[id];
					if (gp.type === "dither") {
						return <DitherControls id={id} process={gp} key={id} />;
					} else if (gp.type === "mask") {
						return <MaskControls id={id} process={gp} key={id} />;
					} else if (gp.type === "sortPixels") {
						return <SortPixelsControls id={id} process={gp} key={id} />;
					}
					return null;
				})}
			</Flex>
		</Flex>
	);
};
