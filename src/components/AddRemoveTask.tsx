import React from 'react';
import { Button } from 'react-bootstrap';
import { Task } from '../templates/task';

/**
 * Functions for adding and removing tasks
 */
export function AddRemoveTask({
    taskArray,
    setTaskArray,
    index
}: {
    taskArray: Task[];
    setTaskArray: (taskArray: Task[]) => void;
    index: number;

}): JSX.Element {

    /**
     * this function adds a part right below the task you've selected.
     * @param index current task index in the array of tasks
     */
    function AddPart(index: number) {
        const modifiedTaskArr = [...taskArray];
        modifiedTaskArr.splice(index + 1, 0,{ name: "Swag", document: "Uh Oh", points: "0", color: 0});
        setTaskArray(modifiedTaskArr);
    }

    /**
     * this function removes the current task you're on.
     * @param index current task index in the array of tasks
     */
    function RemovePart(index: number) {
        const modifiedPtsArr = [...taskArray];
        modifiedPtsArr.splice(index, 1);
        setTaskArray(modifiedPtsArr);
    }

    return(
        <div>
            <Button onClick={()=>AddPart(index)}>Add Part</Button>
            <Button onClick={()=>RemovePart(index)}>Remove Part</Button>
        </div>
    )
}