import React, { useState } from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { start } from 'repl';

export function Timeline({
    ptsArray,
    setPtsArray,
    startDate,
    setStartDate,
    endDate,
    setEndDate

}: {
    ptsArray: string[];
    setPtsArray: (ptsArray: string[]) => void;
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


    function calcTotalPoints(pts: string[]): number {
        // calculates total points in assignment given
        let total = 0;
        for (let i = 0; i < pts.length; i++) {
            total += parseInt(pts[i], 10);
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

    function calcDays(pts: string[], index: number, totalDays:number, totalPoints:number): string {
        let dayCount: number = 1;  
        let daySum: number = 0;
        let pointsperDay: number = Math.ceil(totalPoints / totalDays);
        let dayArray: number[] = [...pts].map(Number);
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



    //Return
    return (
        <>
            <div>
                <VerticalTimeline>
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

                    {[...Array(ptsArray.length)].map((elementInArray, index) => (
                        <div className="vertical-timeline-element--work" key={index}>  
                        <VerticalTimelineElement 
                        iconStyle={{ background: 'rgb(16, 204, 82)', color: '#fff'  }} 
                        >   

                            <h3 className="vertical-timeline-element-title">Finish Part {index + 1}</h3>
                            <h4>{ptsArray[index]} Points</h4> 
                            <p>{calcDays(ptsArray, index, dateDiffInDays(startDate, endDate), calcTotalPoints(ptsArray))}</p>
                        
                        </VerticalTimelineElement>
                     
                        </div>
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
                {ptsArray.length}

                
            </div>
        </>
       
    );
}