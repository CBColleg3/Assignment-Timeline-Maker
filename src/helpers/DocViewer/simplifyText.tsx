/**
 * Generates a border style for the component
 *
 * @param url The color to generate the border for
 * @param controllerRef The color to generate the border for
 * @param body The color to generate the border for
 * @param headers The color to generate the border for
 * @returns The generated border style
 */
export const simplifyText = async (
	url: string,
	controllerRef: AbortController,
	body: { [key: string]: unknown },
	headers: { [key: string]: string } = {
		"Content-type": "application/json",
	},
): Promise<string[]> => {
	const params = {
		body: JSON.stringify(body),
		headers: headers ?? {},
		method: "POST",
		signal: controllerRef.signal,
	};
	const response: Response = await fetch(`${url}`, params);
	const result = await response.json();
	return result.body;
};
