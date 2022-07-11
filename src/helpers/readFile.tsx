import JSZip from "jszip";

/**
 * This function loads in the document via jsZip, it takes in a fileList and then loads it into jsZip to turn it into a readable string
 *
 * @param {HTMLInputElement} fileList fileList to read from
 * @returns {Promise<any>} Promise of zip decompress result
 */
export const readFile = async (fileList: HTMLInputElement["files"]): Promise<string | undefined> => {
	const MY_FILE_INDEX = 0;
	if (fileList) {
		const myFile: File = fileList[MY_FILE_INDEX];
		const jsZip = new JSZip();
		const loadResult = await jsZip
			.loadAsync(myFile)
			.then(async (zip: JSZip) => zip.files["word/document.xml"].async("string"));
		return loadResult;
	}
	return undefined;
};
