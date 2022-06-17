import React, { useState } from "react";
import JSZip from "jszip";
import { Button, Col, Row, Form, Container } from "react-bootstrap";
import { Timeline } from "./Timeline";

//axios for xml request
import axios from "axios";
import { updateFunctionTypeNode } from "typescript";
//xml file reader
//import XMLParser from 'react-xml-parser';

export function FileImport(): JSX.Element {
  //State
  const [content, setContent] = useState<string>("No file data uploaded");
  const [importVisible, setImportVisible] = useState<boolean>(false);
  const [timelineVisible, setTimelineVisible] = useState<boolean>(false);
  const [ptsArray, setPtsArray] = useState<string[]>([]);
 // let ptArray: string[] = [];

  //Control
  function uploadFile(event: React.ChangeEvent<HTMLInputElement>) {
    // Might have removed the file, need to check that the files exist
    if (event.target.files && event.target.files.length) {
      // Get the first filename
      const filename = event.target.files[0];
      // Create a reader
      const reader = new FileReader();
      // Create lambda callback to handle when we read the file
      reader.onload = (loadEvent) => {
        // Target might be null, so provide default error value
        const newContent = loadEvent.target?.result || "Data was not loaded";
        // FileReader provides string or ArrayBuffer, force it to be string
        setContent(newContent as string);
      };
      // Actually read the file
      reader.readAsText(filename);
    }
  }

  function handleFileInput(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files.length) {
      if (!event.target.files) return;
      const points = findPoints(findParts(readFile(event.target.files)));
      console.log(points);
    }
  }

  function readFile(fileList: HTMLInputElement["files"]): Promise<any> {
    // accepts list of files from event
    // returns string of word/document.xml file
    const myFile: File = fileList![0];
    const jsZip = new JSZip();
    const stringText = "";
    console.log(fileList);
    return jsZip.loadAsync(myFile).then((zip) => {
      return zip.files["word/document.xml"].async("string");
    });
  }

  function findParts(fileText: Promise<any>): Promise<any> {
    // accepts string of document.xml and locates 'w:t' tags containing text
    // returns string of text contained in document.xml
    return fileText.then((txt) => {
      const parser = new DOMParser();
      const textDoc = parser.parseFromString(txt, "text/xml");
      const textArray = textDoc.getElementsByTagName("w:t");
      let total = "";
      for (let i = 0; i < textArray.length; i++) {
        total += textArray[i].childNodes[0].nodeValue;
      }
      console.log(total);
      setContent(total as string);
      return total;
    });
  }
  function findPoints(cleanedText: Promise<any>): Promise<any> {
    // accepts string of text from document.xml
    // returns array of point values found in document
    let tempArray;
    let ptsArrayClone: string[] = [];
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
        ptsArrayClone.push(reNum.exec(elem)![0]);
      }
      console.log("resultsArray", resultsArray);
      setPtsArray(ptsArrayClone);
      console.log(ptsArray);
      console.log(ptsArray.length);
      return ptsArray;
    });
  }

  function readDocument({ content }: { content: string }) {
    setTimelineVisible(true);
  }

  //View
  return (
    <div>
      <Button
        onClick={() => setImportVisible(!importVisible)}
        style={{ marginRight: "5px", marginTop: "5px" }}
        data-testId="show-hide-import-button"
      >
        Import CSV
      </Button>
      {importVisible && (
        <div>
          <Form.Group controlId="exampleForm">
            <Form.Label>Upload a file</Form.Label>
            <Form.Control type="file" onChange={handleFileInput} />
          </Form.Group>
          <Button
            data-testId="import-button"
            onClick={() => readDocument({ content })}
            style={{
              marginTop: "5px",
            }}
          >
            Import
          </Button>
          {/*<div>{/*content}</div> */}
        </div>
      )}
      {timelineVisible && (
        <div>
          {" "}
          <Timeline
            ptsArray={ptsArray}
            setPtsArray={setPtsArray}
          ></Timeline>{" "}
        </div>
      )}
    </div>
  );
}
