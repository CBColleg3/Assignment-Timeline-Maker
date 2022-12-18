import fileSize from "filesize";

/**
 * Helper function allowing for files to be stringified and also have size accounted for as well
 *
 * @param file The file to stringify with the size specified
 * @returns The file stringified to the specified size
 */
export const displayFileWithSize = (file: File): string => `${file.name} ${fileSize(file.size)}`;
