import React from "react";
import JSZip, { file } from "jszip";
import { saveAs } from "file-saver";
import { Form } from "react-bootstrap";
import { Task } from "../templates/task";

/**
 * Used for importing .xml files into the website. also updates taskArray.
 */
export function FileImport({
  taskArray,
  setTaskArray,
  fileImported,
  setFileImported,
}: {
  taskArray: Task[];
  setTaskArray: (taskArray: Task[]) => void;
  fileImported: boolean;
  setFileImported: (timelineVisible: boolean) => void;
}): JSX.Element {
  /**
   * This function finds the amount of points, and parts of a document that it reads via the readFile function
   * @param event react event
   */
  function handleFileInput(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files.length) {
      //if (!event.target.files) return;
      const fileContent = readFile(event.target.files);
      // console.log(fileContent);
      const points = findPoints(findParts(fileContent));
      setFileImported(true);
      console.log(points);
    }
  }

  /**
   * This function loads in the focument via jsZip, it takes in a fileList and then loads it into jsZip to turn it into a readable string
   * @param fileList fileList to read from
   * @returns
   */
  function readFile(fileList: HTMLInputElement["files"]): Promise<any> {
    // accepts list of files from event
    // returns string of word/document.xml file
    const myFile: File = fileList![0];
    const jsZip = new JSZip();

    //const stringText = "";

    console.log(fileList);
    return jsZip.loadAsync(myFile).then((zip) => {
      console.log(zip);

      zip.generateAsync({ type: "blob" }).then(function (blob: string | Blob) {
        saveAs(blob, "dog.docx");
      });

      return zip.files["word/document.xml"].async("string");
    });
  }

  /**
   *accepts string of document.xml and locates 'w:t' tags containing text and returns string of text contained in document.xml
   * @param fileText documentText used for finding parts
   * @returns
   */
  function findParts(fileText: Promise<any>): Promise<any> {
    //
    return fileText.then((txt) => {
      console.log(txt);
      const parser = new DOMParser();
      const textDoc = parser.parseFromString(txt, "text/xml");
      console.log(textDoc);
      const textArray = textDoc.getElementsByTagName("w:t");
      let total = "";
      for (let i = 0; i < textArray.length; i++) {
        total += textArray[i].childNodes[0].nodeValue;
      }
      console.log(total);
      //setContent(total as string);
      return total;
    });
  }

  /**
   * this function uses regex to first find a sentence or phrase that starts and ends with a period, a comma, or a semicolon,
   * it then finds two or more numbers followed by the word point, pt, points, or pts shortly after the number and then ends with a
   * period, comma, or a semicolon to capture that part of the document. The full phrase is given via the document field of the
   * task object, and it's further parsed by finding the regex of the number followed by points to get the actual points of the task.
   * Once we find all of this we put it into a taskArray by adding each element of the captured document.
   * @param fileText documentText used for finding points
   * @returns
   */
  function findPoints(cleanedText: Promise<any>): Promise<any> {
    // accepts string of text from document.xml
    // returns array of point values found in document
    let tasks: Task[] = [];
    let tempArray;
    //let ptsArrayClone: string[] = [];
    const resultsArray: string[] = [];
    const re = new RegExp(
      "[^.,;]*\\d\\d?\\s?(points?|pts?)[^.,;]*(\\.|,|;)",
      "g"
    ); //(?!\\.|,|;).*\\d\\d?\\s?(points?|pts?)*?(?<!\\.|,|;)  (?!\.|,|;).*?(?<!\.|,|;)\d\d?\s?(points?|pts?)
    const reNum = new RegExp("\\d+\\s?(points?|pts?)");
    // const reDoc = new RegExp("[^.,;]*\\d\\d?\\s?(points?|pts?)[^.,;]*(\\.|,|;)", "g");
    return cleanedText.then((txt) => {
      tempArray = re.exec(txt);
      //  console.log(tempArray);
      while (tempArray !== null) {
        console.log(tempArray[0]);
        resultsArray.push(tempArray![0]);
        tempArray = re.exec(txt);
      }
      let taskIndex: number = 0;
      for (const elem of resultsArray) {
        if (elem != null) {
          const num = new RegExp("(points?|pts?)");
          console.log("elem:", elem);

          tasks.push({
            name: "Finish Task " + (taskIndex + 1),
            id: taskIndex + 1,
            document: elem.toString(),
            points: reNum.exec(elem)![0].replace(num, ""),
            color: parseInt(reNum.exec(elem)![0]) * 5,
          });
          // console.log(tasks);
          taskIndex++;
        }
      }
      console.log("resultsArray", resultsArray);
      setTaskArray(tasks);
      console.log(taskArray);
      console.log(taskArray.length);
      return taskArray;
    });
  }

  return (
    <div>
      <div>
        <p>
          <Form.Group controlId="exampleForm">
            <h2>
              {" "}
              <Form.Label>Upload a document</Form.Label>
            </h2>

            <p>
              <Form.Control type="file" onChange={handleFileInput} />{" "}
            </p>
          </Form.Group>
        </p>
      </div>
    </div>
  );
}
