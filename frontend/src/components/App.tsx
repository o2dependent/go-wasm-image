import { Container, Flex, Theme } from "@radix-ui/themes";
import { PhotoCanvas } from "./PhotoCanvas/PhotoCanvas";
import { ProcessArea } from "./ProcessArea/ProcessArea";

export const App = () => {
	return (
		<Theme appearance="dark">
			<Container>
				<Flex
					mt="9"
					px={{ initial: "2", md: "4" }}
					gap="2"
					width="100%"
					direction={{ md: "row", initial: "column" }}
				>
					<PhotoCanvas />
					<ProcessArea />
				</Flex>
			</Container>
		</Theme>
	);
};
