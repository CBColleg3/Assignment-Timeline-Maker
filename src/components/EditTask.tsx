import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Task } from "../templates/task";
import DatePicker from "react-datepicker";

type ChangeEvent = React.ChangeEvent<
  HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
>;

export function EditTask({
  taskArray,
  setTaskArray,
  index
}: {
  taskArray: Task[];
  setTaskArray: (taskArray: Task[]) => void;
  index: number;
}): JSX.Element {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [nameField, setNameField] = useState<string>(taskArray[index].name);
  const [documentField, setDocumentField] = useState<string>(taskArray[index].document);
  const [pointsField, setPointsField] = useState<string>(taskArray[index].points);
  const [dueDateMode, setDueDateMode] = useState<boolean>(false);
  const [dueDate, setDueDate] = useState<Date>(new Date());

  function updateTasks(index: number) {
    const modifiedTasks = [...taskArray].map((task:Task) => {return {...task}});
    modifiedTasks[index].name = nameField;
    modifiedTasks[index].document = documentField;
    modifiedTasks[index].points = pointsField; 
    setTaskArray(modifiedTasks);
  }

  function updateNameField(event: ChangeEvent) {
    setNameField(event.target.value);
  }

  function updateDocumentField(event: ChangeEvent) {
    setDocumentField(event.target.value);
  }

  function updatePointsField(event: ChangeEvent) {
    setPointsField(event.target.value);
  }

  function updateDueDateMode() {
    const modifiedTasks = [...taskArray].map((task:Task) => {return {...task}});
    modifiedTasks[index].autoDueDate = !dueDateMode;
    setDueDateMode(!dueDateMode);
    setTaskArray(modifiedTasks);
  }

  return (
    <div>
        <Button onClick={()=>{setEditMode(!editMode)}}> {!editMode? "Edit Task": "Close"} </Button>
      {editMode && (
        <div>
          <Form.Group as={Row}>
            <Col>
              <p style={{ marginBottom: "0px" }}>Task Name</p>
            </Col>
            <Col>
              <Form.Control
                data-testId="change-name-field-box"
                value={nameField}
                onChange={updateNameField}
              ></Form.Control>
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Col>
              <p style={{ marginBottom: "0px" }}>Task Document Part</p>
            </Col>
            <Col>
              <Form.Control
                data-testId="change-document-part-box"
                value={documentField}
                onChange={updateDocumentField}
              ></Form.Control>
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Col>
              <p style={{ marginBottom: "0px" }}>Task Points</p>
            </Col>
            <Col>
              <Form.Control
                data-testId="change-task-points-box"
                type="number"
                value={parseInt(pointsField)}
                onChange={updatePointsField}
              ></Form.Control>
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
              <Col>
                  <Form.Check
                  type="switch"
                  id="specify-due-date-switch"
                  label="Specify Due Date?"
                  checked={dueDateMode}
                  onChange={updateDueDateMode}
                />
            </Col>
          </Form.Group>
          {dueDateMode &&           
          <Form.Group as={Row}>
              <Col>
                  <DatePicker
                  showTimeSelect
                  dateFormat="Pp"
                  selected={dueDate}
                  onChange={(date: Date) => setDueDate(dueDate)}
                />
            </Col>
          </Form.Group>}

          <Button onClick= {()=> {updateTasks(index); setEditMode(!editMode);} }>Save Changes</Button>
        </div>
      )}
    </div>
  );
}
