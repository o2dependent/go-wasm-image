import { useStore } from "@nanostores/react";
import React from "react";
import {
	$graphicProcesses,
	graphicProcessTypes,
	type GraphicsProcess,
} from "../../stores/imageProcess";
import { ProcessButton } from "./ProcessButton";
import { Card, Flex, Grid, Heading } from "@radix-ui/themes";

export const ProcessArea = () => {
	const graphicProcesses = useStore($graphicProcesses);

	return (
		<Flex width={{ initial: "100%", md: "600px" }} gap="2" direction="column">
			<Heading size="4">Graphics Processes</Heading>
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
				{graphicProcesses?.map((gp) => {
					if (gp.type === "dither") {
						return <p key={gp.id}>dither</p>;
					} else if (gp.type === "mask") {
						return <p key={gp.id}>mask</p>;
					} else if (gp.type === "sortPixels") {
						return <p key={gp.id}>sortPixels</p>;
					}
					return null;
				})}
			</Flex>
		</Flex>
	);
};
