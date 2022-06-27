import React, { useState } from 'react';
//import { Button } from 'react-bootstrap';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import { Task } from '../templates/task';
import 'react-vertical-timeline-component/style.min.css';
import { AddRemoveTask } from './AddRemoveTask';
//import { start } from 'repl';


/**
 * Generates vertical timeline with tasks and calculates days to complete tasks
 */
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

    //Milliseconds per day
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;

    /**
     *This function calculates the numerical difference between date 1 and date 2 
     * @param date1 first day, usually the Start Date
     * @param date2 second day, usually the End Date
     * @returns 
     */
    function dateDiffInDays(date1: Date, date2: Date): number {
        // Discard the time and time-zone information.
        const utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
        const utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());
        console.log("days:" + Math.floor((utc2 - utc1) / _MS_PER_DAY));
        return Math.floor((utc2 - utc1) / _MS_PER_DAY);
    }


    /**
     * This function calculates the tota; amount of points in the document
     * @param tasks array of tasks state
     * @returns 
     */
    function calcTotalPoints(tasks: Task[]): number {
        // calculates total points in assignment given
        let total = 0;
        for (let i = 0; i < tasks.length; i++) {
            total += parseInt(tasks[i].points, 10);
        }
        console.log("totalPoints:", total);
        return total;
    }


    /**
     * This function calculates the day that a task should be completed on and returns a string
     * It calculates it by counting up until the index number given, and adding the sum for each arrayValue
     * and if the sum ever exceeds the pointsperDay, then the Day goes up, rinse and repeat for all tasks.
     * @param tasks array of tasks
     * @param index current task function is on
     * @param totalDays totalDays given
     * @param totalPoints totalPoints calculated
     * @returns 
     */
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
        return "Day " + dayCount.toString();
    }


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

                    {[...Array(taskArray.length)].map((elementInArray, index) => (

                        <VerticalTimelineElement 
                        className='vertical-timeline-element--work'
                        date={calcDays(taskArray, index, dateDiffInDays(startDate, endDate), calcTotalPoints(taskArray))}
                        iconStyle={{ background: `rgb(${taskArray[index].color + 100},100,150)`, color: '#fff'  }} 
                        >   
                            <h3 className="vertical-timeline-element-title">Finish Task {index + 1}</h3>
                            <h5>{taskArray[index].document}</h5>
                            <h4>{taskArray[index].points} Points</h4> 
                            <AddRemoveTask taskArray={taskArray} setTaskArray={setTaskArray} index={index}></AddRemoveTask>
                        
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