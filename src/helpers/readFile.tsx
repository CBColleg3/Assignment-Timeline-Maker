import JSZip from "jszip";

/**
 * This function loads in the document via jsZip, it takes in a fileList and then loads it into jsZip to turn it into a readable string
 *
 * @param {File} file The file to read from
 * @returns {Promise<any>} Promise of zip decompress result
 */
export const readFile = async (file: File): Promise<string | undefined> => {
	if (file) {
		const jsZip = new JSZip();
		const loadResult = await jsZip
			.loadAsync(file)
			.then(async (zip: JSZip) => zip.files["word/document.xml"].async("string"));
		return loadResult;
	}
	return undefined;
};
