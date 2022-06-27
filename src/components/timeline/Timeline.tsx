import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import { Task } from '../../templates/task';
import 'react-vertical-timeline-component/style.min.css';
//import { start } from 'repl';

export function Timeline({
    taskArray,
    setTaskArray,
    startDate,
    setStartDate,
    endDate,
    setEndDate

}: {
    taskArray: Task[];
    setTaskArray: (taskArray: Task[]) => void;
    startDate: Date;
    setStartDate: (startDate: Date) => void;
    endDate: Date;
    setEndDate: (endDate: Date) => void;

}): JSX.Element {

    //State
    //const [completeDay, setCompleteDay] = useState<number>(1);

    const _MS_PER_DAY = 1000 * 60 * 60 * 24;

    // a and b are javascript Date objects
    function dateDiffInDays(date1: Date, date2: Date): number {
        // Discard the time and time-zone information.
        const utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
        const utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());
        console.log("days:" + Math.floor((utc2 - utc1) / _MS_PER_DAY));
        return Math.floor((utc2 - utc1) / _MS_PER_DAY);
    }


    function calcTotalPoints(tasks: Task[]): number {
        // calculates total points in assignment given
        let total = 0;
        for (let i = 0; i < tasks.length; i++) {
            total += parseInt(tasks[i].points, 10);
        }
        console.log("totalPoints:", total);
        return total;
    }
    function calcWeight(pts: number[], days: number, total: number): number[] {
        // calculates number of days to spend on each part of timeline
        let weightedPoints: number[] = [...pts];
        for (let i = 0; i < weightedPoints.length; i++) {
            weightedPoints[i] = (weightedPoints[i] / total) * days
        }
        return weightedPoints;

    }

    function calcDays(tasks: Task[], index: number, totalDays:number, totalPoints:number): string {
        let dayCount: number = 1;  
        let daySum: number = 0;
        let pointsperDay: number = Math.ceil(totalPoints / totalDays);
        let dayArray: number[] = [...tasks].map(task => task.points).map(Number);
        for(let i = 0; i <= index; i++) {
            daySum += dayArray[i];
            if(daySum >= pointsperDay) {
                dayCount++;
                daySum = 0;
            }
        }
        console.log("taskPerDay:" + pointsperDay);
        console.log("Day" + dayCount.toString());
        return "Day " + dayCount.toString();
    }

    function MoveUp(index: number) {
        const modifiedPtsArr = [...taskArray];
        if(index > 0) {
            const tmpPts = modifiedPtsArr[index];
            modifiedPtsArr[index] = modifiedPtsArr[index - 1];
            modifiedPtsArr[index - 1] = tmpPts;
        }
        setTaskArray(modifiedPtsArr);
    }

    function MoveDown(index: number) {
        const modifiedPtsArr = [...taskArray];
        if(index < modifiedPtsArr.length - 1) {
            const tmpPts = modifiedPtsArr[index];
            modifiedPtsArr[index] = modifiedPtsArr[index + 1];
            modifiedPtsArr[index + 1] = tmpPts;
        }
        setTaskArray(modifiedPtsArr);
    }

    function AddPart(index: number) {
        const modifiedTaskArr = [...taskArray];
        modifiedTaskArr.splice(index + 1, 0,{ name: "Swag", document: "Uh Oh", points: "0", color: 0});
        setTaskArray(modifiedTaskArr);
    }

    function RemovePart(index: number) {
        const modifiedPtsArr = [...taskArray];
        modifiedPtsArr.splice(index, 1);
        setTaskArray(modifiedPtsArr);
    }



    //TODO: Make this return statement smaller by making sub components! Really difficult to read, modify, and understand whats going on
    return (
        <>
            <div>
                <VerticalTimeline layout="2-columns">
                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        contentStyle={{ background: 'rgb(160, 16, 82)', color: '#fff' }}
                        contentArrowStyle={{ borderRight: '7px solid  rgb(160, 16, 82)' }}
                        date="Due Date: 2011 - present"
                        iconStyle={{ background: 'rgb(160, 16, 82)', color: '#fff' }}
                    >
                        <h3 className="vertical-timeline-element-title">Lets start the Assignment!</h3>
                        <h4 className="vertical-timeline-element-title">Due Date: {endDate.toLocaleDateString()}{" "}{endDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} </h4>
                    </VerticalTimelineElement>

                    //TODO: Please look at how I changed this mapping... what you did was completely unnecessary...
                    {taskArray.map((task:Task, index:number) => (

                        <VerticalTimelineElement 
                        className='vertical-timeline-element--work'
                        date={calcDays(taskArray, index, dateDiffInDays(startDate, endDate), calcTotalPoints(taskArray))}
                        iconStyle={{ background: `rgb(${task.color + 100},100,150)`, color: '#fff'  }} 
                        >   
                            <h3 className="vertical-timeline-element-title">Finish Task {index + 1}</h3>
                            <h5>{task.document}</h5>
                            <h4>{task.points} Points</h4> 
                            <Button onClick={() => AddPart(index)}>Add Task</Button>
                            <Button onClick={() => RemovePart(index)}>RemoveTask</Button>
                            <Button onClick={() => MoveUp(index)}>▲</Button>
                            <Button onClick={() => MoveDown(index)}>▼</Button>
                        
                        </VerticalTimelineElement>
                    )
                    )}
                    <VerticalTimelineElement                       
                        iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                        contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                        contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}>
                        <h3>Assignment Completed!</h3>
                    </VerticalTimelineElement>
                </VerticalTimeline>

            </div>
            <div>
                {taskArray.length}

                
            </div>
        </>
       
    );
}