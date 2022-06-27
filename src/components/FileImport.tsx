import React, { useState } from "react";
import JSZip from "jszip";
import { Form } from "react-bootstrap";
import { Timeline } from "./Timeline";
import { Task } from '../templates/task';

/**
 * Used for importing .xml files into the website. also updates taskArray.
 */
export function FileImport({
  startDate,
  setStartDate,
  endDate,
  setEndDate
}:{
  startDate: Date;
  setStartDate: (startDate: Date) => void;
  endDate: Date;
  setEndDate: (endDate: Date) => void;

}): JSX.Element {
  //State
  //const [content, setContent] = useState<string>("No file data uploaded");
  const [timelineVisible, setTimelineVisible] = useState<boolean>(false);
  const [taskArray, setTaskArray] = useState<Task[]>([]);

  /**
   * This function finds the amount of points, and parts of a document that it reads via the readFile function
   * @param event react event
   */
  function handleFileInput(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files.length) {
      //if (!event.target.files) return;
      const points = findPoints(findParts(readFile(event.target.files)));
      setTimelineVisible(true);
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
      const parser = new DOMParser();
      const textDoc = parser.parseFromString(txt, "text/xml");
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
   * this function uses regex to find all of the words that say "points, pt, pts, or point" and gets the numerical number infront of them
   * to make an array of pointValues, this is then put into a taskObject to make an array of tasks.
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
    const re = new RegExp("\\d\\d?\\s?(points?|pts?)", "g");
    const reNum = new RegExp("\\d*");
    return cleanedText.then((txt) => {
      tempArray = re.exec(txt);
      //  console.log("re",re);
      // console.log("txt:",txt);
      while (tempArray !== null) {
        resultsArray.push(tempArray[0]);
        tempArray = re.exec(txt);
      }
      for (const elem of resultsArray) {
        tasks.push(
          {
            name: "Swag",
            document: "Hi",
            points: reNum.exec(elem)![0],
            color: parseInt(reNum.exec(elem)![0]) * 5
          }
        );
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
            <h2>            <Form.Label>Upload a document</Form.Label></h2>

            <p><Form.Control type="file" onChange={handleFileInput} /> </p>
          </Form.Group>
          {/*<div>{/*content}</div> */}

          </p>

        </div>
      {timelineVisible && (
        <div>
          {" "}
          <Timeline
            taskArray={taskArray}
            setTaskArray={setTaskArray}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
          ></Timeline>{" "}
        </div>
      )}
    </div>
  );
}
