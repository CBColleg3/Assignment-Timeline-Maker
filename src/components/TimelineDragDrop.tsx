import React from 'react';
import { AddRemoveTask } from "./AddRemoveTask";
import { EditTask } from "./EditTask";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import { Task } from '../templates/task';
import {
    VerticalTimelineElement,
  } from "react-vertical-timeline-component";
import { calcDays, calcTotalPoints, dateDiffInDays } from './utils/timelineUtils';

export function TimelineDragDrop({
    taskArray,
    setTaskArray,
    startDate,
    setStartDate,
    endDate,
    setEndDate
    }:
    {
        taskArray: Task[],
        setTaskArray: (taskArray: Task[]) => void;
        startDate: Date;
        setStartDate: (startDate: Date) => void;
        endDate: Date;
        setEndDate: (endDate: Date) => void;

    }): JSX.Element {

    const OnDragEnd = (result: DropResult) => {
        const {source,destination} = result;
        if(!destination) return;
    
        const movedTasks = [...taskArray].map((task:Task)=>{return {...task}});
        const [newOrder] = movedTasks.splice(source.index,1);
        movedTasks.splice(destination.index, 0, newOrder);
        setTaskArray(movedTasks);
      }

    return(              
    <DragDropContext
        onDragEnd={OnDragEnd}
      >
        <Droppable droppableId="vertical-timeline-element--work">
          {(provided) => (
            <div
              className="vertical-timeline-element--work"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {taskArray.map((task, index) => {
                return (
                  <span className="vertical-timeline-element--work">
                  <Draggable key={task.name} draggableId={task.name} index={index}>

                    {(provided, snapshot) => (
                      <div ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                         <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        date={calcDays(
                          taskArray,
                          index,
                          dateDiffInDays(startDate, endDate),
                          calcTotalPoints(taskArray)
                        )}
                        iconStyle={{
                          background: `rgb(${task.color + 100},100,150)`,
                          color: "#fff",
                        }}
                      >
                        <h3 className="vertical-timeline-element-title">
                          {task.name}
                        </h3>
                        <h5>{task.document}</h5>
                        <h4>{task.points} Points</h4>
                        <AddRemoveTask
                          taskArray={taskArray}
                          setTaskArray={setTaskArray}
                          index={index}
                        ></AddRemoveTask>
                        <EditTask
                          taskArray={taskArray}
                          setTaskArray={setTaskArray}
                          index={index} />
                      </VerticalTimelineElement>

                      </div>

                    )}
                  </Draggable>
                </span>
                );
              })}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      );
}