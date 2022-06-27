import { Task } from '../../../templates/task';

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

function editTask(action: string, index: number, setTaskArray: (taskArr: Task[]) => void) {
    //TODO: Finish this method and use it!
    switch(action) {
        case "up":
        case "down":
        case "add":
        case "remove":
        default: return;
    }
}

function MoveUp(index: number, setTaskArray: (taskArr: Task[]) => void) {
    const modifiedPtsArr = [...taskArray];
    if(index > 0) {
        const tmpPts = modifiedPtsArr[index];
        modifiedPtsArr[index] = modifiedPtsArr[index - 1];
        modifiedPtsArr[index - 1] = tmpPts;
    }
    setTaskArray(modifiedPtsArr);
}

function MoveDown(index: number, setTaskArray: (taskArr: Task[]) => void) {
    const modifiedPtsArr = [...taskArray];
    if(index < modifiedPtsArr.length - 1) {
        const tmpPts = modifiedPtsArr[index];
        modifiedPtsArr[index] = modifiedPtsArr[index + 1];
        modifiedPtsArr[index + 1] = tmpPts;
    }
    setTaskArray(modifiedPtsArr);
}

function AddPart(index: number, setTaskArray: (taskArr: Task[]) => void) {
    const modifiedTaskArr = [...taskArray];
    modifiedTaskArr.splice(index + 1, 0,{ name: "Swag", document: "Uh Oh", points: "0", color: 0});
    setTaskArray(modifiedTaskArr);
}

function RemovePart(index: number, setTaskArray: (taskArr: Task[]) => void) {
    const modifiedPtsArr = [...taskArray];
    modifiedPtsArr.splice(index, 1);
    setTaskArray(modifiedPtsArr);
}

//TODO: Finish exports
export {dateDiffInDays, calcTotalPoints}