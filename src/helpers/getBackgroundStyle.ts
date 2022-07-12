/* eslint-disable @typescript-eslint/no-magic-numbers -- no outstanding magic numbers to report */
/**
 *
 * @param globalStyleChunks Array of elements to parse styling from
 * @returns the background style to apply to the elements
 */
export const getBackgroundStyle = (globalStyleChunks: Element[]): Record<string, string> => {
	const backgroundStyle: Record<string, string> = {};

	if (globalStyleChunks.length === 0) {
		return backgroundStyle;
	}

	const parentTag = globalStyleChunks[0].parentElement?.tagName;

	if (parentTag !== undefined) {
		if (globalStyleChunks[0].getElementsByTagName("w:shd").length !== 0) {
			const color = globalStyleChunks[0].getElementsByTagName("w:shd")[0].getAttribute("w:fill");

			if (color !== null) {
				backgroundStyle["background-color"] = `#${color}`;
			}
		}
	}

	return backgroundStyle;
};
