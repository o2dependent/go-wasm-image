import { useStore } from "@nanostores/react";
import React from "react";
import {
	$graphicProcesses,
	graphicProcessTypes,
	type GraphicsProcess,
} from "../../stores/imageProcess";
import { AddProcessButton } from "./AddProcessButton";
import { Box, Card, Flex, Grid, Heading, ScrollArea } from "@radix-ui/themes";
import { DitherControls } from "./ProcessControls/DitherControls";
import { MaskControls } from "./ProcessControls/MaskControls";
import { SortPixelsControls } from "./ProcessControls/SortPixelsControls";
import { ProcessButton } from "./ProcessButton";

export const ProcessArea = () => {
	const graphicProcesses = useStore($graphicProcesses);
	console.log(Object.values(graphicProcesses));
	return (
		<Box width={{ initial: "100%", md: "600px" }}>
			<Flex gap="2" direction="column">
				<Heading size="6">Graphics Processes</Heading>
				<ProcessButton />
				<ScrollArea
					scrollbars="vertical"
					style={{ height: 500, borderRadius: "var(--radius-2)" }}
				>
					<Card mb="1">
						<Heading size="3" mb="2">
							Add Process
						</Heading>
						<Grid gap="1" columns="2">
							{graphicProcessTypes?.map((type) => (
								<AddProcessButton key={type} type={type} />
							))}
						</Grid>
					</Card>
					<Flex gap="1" direction="column">
						{Object.keys(graphicProcesses)
							?.sort(
								(a, b) => graphicProcesses[a].index - graphicProcesses[b].index,
							)
							?.map((id) => {
								const gp = graphicProcesses[id];
								if (gp.type === "dither") {
									return (
										<DitherControls id={id} process={gp} key={id + gp.index} />
									);
								} else if (gp.type === "mask") {
									return (
										<MaskControls id={id} process={gp} key={id + gp.index} />
									);
								} else if (gp.type === "sortPixels") {
									return (
										<SortPixelsControls
											id={id}
											process={gp}
											key={id + gp.index}
										/>
									);
								}
								return null;
							})}
					</Flex>
				</ScrollArea>
			</Flex>
		</Box>
	);
};
