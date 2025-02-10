import { Button } from "@radix-ui/themes";
import { processImage } from "./processImage";

export const ProcessButton = () => {
	return <Button onClick={processImage}>Process Image</Button>;
};
