const FILE_SIZE_CONSTANTS: Record<string, number> = {
	b: 1,
	gb: 1000000000,
	kb: 1000,
	mb: 1000000,
	pb: 1000000000000000,
	tb: 1000000000000,
};

export type FileSizeSpec = "b" | "gb" | "kb" | "mb" | "pd" | "tb";

/**
 * Helper function allowing for files to be stringified and also have size accounted for as well
 *
 * @param file The file to stringify with the size specified
 * @param sizeSpec The size of the file to specify the size in
 * @returns The file stringified to the specified size
 */
export const displayFileWithSize = (file: File, sizeSpec: FileSizeSpec): string =>
	`${file.name} ${file.size * FILE_SIZE_CONSTANTS[sizeSpec]}${sizeSpec}`;
