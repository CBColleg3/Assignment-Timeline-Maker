import React from "react";
import "../../App.css";
import { extractParagraphs, convertXML2HTML } from "./docUtils";

export function DocViewer({
  docXML,
  fileImported,
}: {
  docXML: Document | undefined;
  fileImported: boolean;
}): JSX.Element {
  if (fileImported && docXML !== undefined) {
    // get the paragraphs from the XML content of the uploaded file
    const paragraphs = extractParagraphs(docXML);

    return (
      // map each xml paragraph to html and display it
      <div className="doc-viewer-page">
        <div className="doc-viewer-content">
          {paragraphs.map((par: Element): JSX.Element => convertXML2HTML(par))}
        </div>
      </div>
    );
  } else {
    return <div>Import a file to start!</div>;
  }
}
